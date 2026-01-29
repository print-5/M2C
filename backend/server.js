const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('./config/passport');
require('dotenv').config();

const { connectDB } = require('./config/database');
const { authenticateToken, requireRole, optionalAuth } = require('./middleware/auth');
const { initializeAdmin } = require('./utils/auth/initializeAdmin');
const sessionManager = require('./utils/auth/sessionManager');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Import routes
const vendorRoutes = require('./routes/vendorRoutes');
const vendorSettingsRoutes = require('./routes/vendorSettingsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/vendor-settings', vendorSettingsRoutes);
app.use('/api/categories', categoryRoutes);

// AUTH ROUTES
// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role = 'USER' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: 'local'
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Add session to tracking
    await sessionManager.addSession(user.id, token);

    res.status(201).json({
      message: 'User created successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check in User model first
    let user = await prisma.user.findUnique({
      where: { email }
    });
    let userType = 'user';

    // If not found in users, check in Admin model
    if (!user) {
      user = await prisma.admin.findUnique({
        where: { email }
      });
      userType = 'admin';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Add session to tracking
    await sessionManager.addSession(user.id, token);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: userType === 'admin' ? 'admin' : 'user'
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Google OAuth routes
app.get('/api/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Add session to tracking
      await sessionManager.addSession(user.id, token);

      // Redirect to frontend with token
      const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }))}`;
      
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/login?error=oauth_failed`);
    }
  }
);

// Logout endpoint
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];
    
    if (token) {
      // Remove session from tracking
      await sessionManager.removeSession(req.user.id, token);
    }
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// USER ROUTES
// Get profile
app.get('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    // Check if user is in User model first
    let user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // If not found in User model, check Admin model
    if (!user) {
      user = await prisma.admin.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true
        }
      });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  
  // Initialize database connection
  try {
    await connectDB();
    
    // Initialize admin user
    const adminResult = await initializeAdmin();
    if (adminResult.success) {
      console.log('✅ Admin initialization completed');
    } else {
      console.log('⚠️ Admin initialization skipped:', adminResult.message);
    }
    
    // Clean expired sessions on startup
    await sessionManager.cleanExpiredSessions();
  } catch (error) {
    console.error('❌ Startup error:', error);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
  await prisma.$disconnect();
});

module.exports = app;