const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryStats,
  bulkUpdateStatus,
  getSubcategories,
  createSubcategory
} = require('../controllers/categoryController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/', getAllCategories); // Get all categories (for frontend display)
router.get('/stats', getCategoryStats); // Get category statistics
router.get('/:id', getCategoryById); // Get single category
router.get('/:parentId/subcategories', getSubcategories); // Get subcategories of a category

// Protected routes (admin only)
router.use(authenticateToken); // All routes below require authentication

// Admin-only routes for category management
router.post('/', requireRole('admin'), createCategory); // Create category
router.put('/:id', requireRole('admin'), updateCategory); // Update category
router.delete('/:id', requireRole('admin'), deleteCategory); // Delete category
router.patch('/bulk-status', requireRole('admin'), bulkUpdateStatus); // Bulk update status

// Subcategory management routes
router.post('/:parentId/subcategories', requireRole('admin'), createSubcategory); // Create subcategory

module.exports = router;