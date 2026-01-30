const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function to build category tree
const buildCategoryTree = (categories) => {
  const categoryMap = new Map();
  const rootCategories = [];

  // First pass: create map of all categories
  categories.forEach(category => {
    categoryMap.set(category.id, {
      ...category,
      subcategories: []
    });
  });

  // Second pass: build hierarchy
  categories.forEach(category => {
    if (category.parentId) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.subcategories.push(categoryMap.get(category.id));
      }
    } else {
      rootCategories.push(categoryMap.get(category.id));
    }
  });

  return rootCategories;
};

// Get all categories with hierarchy
const getAllCategories = async (req, res) => {
  try {
    const { 
      search, 
      status, 
      parentId, 
      includeSubcategories = 'true',
      sortBy = 'sortOrder',
      sortOrder = 'asc'
    } = req.query;

    // Build where clause
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }
    
    if (parentId) {
      where.parentId = parentId;
    } else if (includeSubcategories === 'false') {
      where.parentId = null; // Only root categories
    }

    // Build orderBy
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    const categories = await prisma.category.findMany({
      where,
      orderBy,
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        subcategories: includeSubcategories === 'true' ? {
          orderBy: { sortOrder: 'asc' },
          include: {
            subcategories: {
              orderBy: { sortOrder: 'asc' }
            }
          }
        } : false,
        _count: {
          select: {
            subcategories: true
          }
        }
      }
    });

    // Add product count (mock for now - will be real when Product model exists)
    const categoriesWithStats = categories.map(category => ({
      ...category,
      productCount: Math.floor(Math.random() * 100), // Mock data
      subcategoryCount: category._count.subcategories
    }));

    // If building tree structure
    if (includeSubcategories === 'true' && !parentId) {
      const categoryTree = buildCategoryTree(categoriesWithStats);
      return res.json({
        success: true,
        data: categoryTree,
        total: categories.length
      });
    }

    res.json({
      success: true,
      data: categoriesWithStats,
      total: categories.length
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
};

// Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        subcategories: {
          orderBy: { sortOrder: 'asc' },
          include: {
            subcategories: {
              orderBy: { sortOrder: 'asc' }
            }
          }
        },
        _count: {
          select: {
            subcategories: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Add mock product count
    const categoryWithStats = {
      ...category,
      productCount: Math.floor(Math.random() * 100), // Mock data
      subcategoryCount: category._count.subcategories
    };

    res.json({
      success: true,
      data: categoryWithStats
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category'
    });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      slug: customSlug,
      parentId,
      status = 'ACTIVE',
      image,
      metaTitle,
      metaDescription,
      sortOrder = 0,
      subcategories = []
    } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        error: 'Name and description are required'
      });
    }

    // Generate slug if not provided
    const slug = customSlug || generateSlug(name);

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'A category with this slug already exists'
      });
    }

    // Validate parent category if provided
    if (parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: parentId }
      });

      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          error: 'Parent category not found'
        });
      }
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug,
        parentId: parentId || null,
        status: status.toUpperCase(),
        image,
        metaTitle,
        metaDescription,
        sortOrder: parseInt(sortOrder),
        createdBy: req.user?.id
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    // Create subcategories if provided
    if (subcategories && subcategories.length > 0) {
      const subcategoryData = subcategories.map((sub, index) => ({
        name: sub.name,
        description: sub.description,
        slug: sub.slug || generateSlug(sub.name),
        parentId: category.id,
        status: (sub.status || 'ACTIVE').toUpperCase(),
        image: sub.image || null,
        sortOrder: sub.sortOrder !== undefined ? sub.sortOrder : index + 1,
        createdBy: req.user?.id
      }));

      await prisma.category.createMany({
        data: subcategoryData
      });
    }

    // Fetch complete category with subcategories
    const completeCategory = await prisma.category.findUnique({
      where: { id: category.id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        subcategories: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: completeCategory
    });
  } catch (error) {
    console.error('Create category error:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A category with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create category'
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      slug: customSlug,
      parentId,
      status,
      image,
      metaTitle,
      metaDescription,
      sortOrder,
      subcategories = []
    } = req.body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        subcategories: true
      }
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Generate slug if name changed
    const slug = customSlug || (name ? generateSlug(name) : existingCategory.slug);

    // Check if new slug conflicts with other categories
    if (slug !== existingCategory.slug) {
      const slugConflict = await prisma.category.findUnique({
        where: { slug }
      });

      if (slugConflict) {
        return res.status(400).json({
          success: false,
          error: 'A category with this slug already exists'
        });
      }
    }

    // Validate parent category if provided
    if (parentId && parentId !== existingCategory.parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: parentId }
      });

      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          error: 'Parent category not found'
        });
      }

      // Prevent circular reference
      if (parentId === id) {
        return res.status(400).json({
          success: false,
          error: 'Category cannot be its own parent'
        });
      }
    }

    // Update category
    const updateData = {
      updatedBy: req.user?.id
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (slug !== existingCategory.slug) updateData.slug = slug;
    if (parentId !== undefined) updateData.parentId = parentId || null;
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (image !== undefined) updateData.image = image;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder);

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    // Handle subcategories update
    if (subcategories.length >= 0) { // Allow empty array to clear subcategories
      // Get existing subcategory IDs
      const existingSubIds = existingCategory.subcategories.map(sub => sub.id);
      const providedSubIds = subcategories.filter(sub => sub.id).map(sub => sub.id);

      // Delete removed subcategories
      const toDelete = existingSubIds.filter(subId => !providedSubIds.includes(subId));
      if (toDelete.length > 0) {
        await prisma.category.deleteMany({
          where: {
            id: { in: toDelete }
          }
        });
      }

      // Update or create subcategories
      for (const [index, sub] of subcategories.entries()) {
        const subData = {
          name: sub.name,
          description: sub.description,
          slug: sub.slug || generateSlug(sub.name),
          parentId: id,
          status: (sub.status || 'ACTIVE').toUpperCase(),
          image: sub.image || null,
          sortOrder: sub.sortOrder !== undefined ? sub.sortOrder : index + 1,
          updatedBy: req.user?.id
        };

        if (sub.id && existingSubIds.includes(sub.id)) {
          // Update existing subcategory
          await prisma.category.update({
            where: { id: sub.id },
            data: subData
          });
        } else {
          // Create new subcategory
          await prisma.category.create({
            data: {
              ...subData,
              createdBy: req.user?.id
            }
          });
        }
      }
    }

    // Fetch complete updated category
    const completeCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        subcategories: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: completeCategory
    });
  } catch (error) {
    console.error('Update category error:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A category with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update category'
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        subcategories: true
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Check if category has subcategories
    if (category.subcategories.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete category with subcategories. Please delete subcategories first.'
      });
    }

    // TODO: Check if category has products when Product model exists
    // const productCount = await prisma.product.count({
    //   where: { categoryId: id }
    // });
    // if (productCount > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Cannot delete category with associated products'
    //   });
    // }

    // Delete category
    await prisma.category.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete category'
    });
  }
};

// Get category statistics
const getCategoryStats = async (req, res) => {
  try {
    const totalCategories = await prisma.category.count();
    const activeCategories = await prisma.category.count({
      where: { status: 'ACTIVE' }
    });
    const inactiveCategories = await prisma.category.count({
      where: { status: 'INACTIVE' }
    });
    const rootCategories = await prisma.category.count({
      where: { parentId: null }
    });
    const subcategories = await prisma.category.count({
      where: { parentId: { not: null } }
    });

    res.json({
      success: true,
      data: {
        total: totalCategories,
        active: activeCategories,
        inactive: inactiveCategories,
        rootCategories,
        subcategories
      }
    });
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category statistics'
    });
  }
};

// Bulk update category status
const bulkUpdateStatus = async (req, res) => {
  try {
    const { categoryIds, status } = req.body;

    if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Category IDs array is required'
      });
    }

    if (!status || !['ACTIVE', 'INACTIVE'].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Valid status is required (ACTIVE or INACTIVE)'
      });
    }

    const result = await prisma.category.updateMany({
      where: {
        id: { in: categoryIds }
      },
      data: {
        status: status.toUpperCase(),
        updatedBy: req.user?.id
      }
    });

    res.json({
      success: true,
      message: `${result.count} categories updated successfully`,
      data: { updatedCount: result.count }
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update categories'
    });
  }
};

// Get subcategories of a specific category
const getSubcategories = async (req, res) => {
  try {
    const { parentId } = req.params;

    // Verify parent category exists
    const parentCategory = await prisma.category.findUnique({
      where: { id: parentId }
    });

    if (!parentCategory) {
      return res.status(404).json({
        success: false,
        error: 'Parent category not found'
      });
    }

    const subcategories = await prisma.category.findMany({
      where: { parentId },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: {
            subcategories: true
          }
        }
      }
    });

    // Add mock product count
    const subcategoriesWithStats = subcategories.map(sub => ({
      ...sub,
      productCount: Math.floor(Math.random() * 50), // Mock data
      subcategoryCount: sub._count.subcategories
    }));

    res.json({
      success: true,
      data: subcategoriesWithStats,
      total: subcategories.length
    });
  } catch (error) {
    console.error('Get subcategories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subcategories'
    });
  }
};

// Create subcategory
const createSubcategory = async (req, res) => {
  try {
    const { parentId } = req.params;
    const {
      name,
      description,
      slug: customSlug,
      status = 'ACTIVE',
      image,
      sortOrder = 0
    } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        error: 'Name and description are required'
      });
    }

    // Verify parent category exists
    const parentCategory = await prisma.category.findUnique({
      where: { id: parentId }
    });

    if (!parentCategory) {
      return res.status(404).json({
        success: false,
        error: 'Parent category not found'
      });
    }

    // Generate slug if not provided
    const slug = customSlug || generateSlug(name);

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'A category with this slug already exists'
      });
    }

    // Create subcategory
    const subcategory = await prisma.category.create({
      data: {
        name,
        description,
        slug,
        parentId,
        status: status.toUpperCase(),
        image,
        sortOrder: parseInt(sortOrder),
        createdBy: req.user?.id
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Subcategory created successfully',
      data: subcategory
    });
  } catch (error) {
    console.error('Create subcategory error:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A category with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create subcategory'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryStats,
  bulkUpdateStatus,
  getSubcategories,
  createSubcategory
};