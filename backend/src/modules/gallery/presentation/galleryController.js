import { query } from '../../../config/database.js';
import { ApiResponse } from '../../../shared/utils/apiResponse.js';

/**
 * Get all gallery items from PostgreSQL database
 * Optionally merges with dishes having images
 */
export const getGalleryItems = async (req, res, next) => {
  try {
    const { category } = req.query;

    let sql = 'SELECT * FROM gallery_items';
    const params = [];

    if (category && category !== 'All') {
      sql += ' WHERE LOWER(category) = LOWER($1)';
      params.push(category);
    }

    sql += ' ORDER BY id DESC';

    const result = await query(sql, params);

    // Also fetch menu items that have valid images so newly added products are in the gallery!
    const dishesSql = 'SELECT id, name, category, image_url FROM menu_items WHERE image_url IS NOT NULL AND is_available = true ORDER BY id DESC';
    const dishesResult = await query(dishesSql);

    const dishesAsGallery = dishesResult.rows.map((dish) => ({
      id: `dish-${dish.id}`,
      title: dish.name,
      category: dish.category || 'Dishes',
      image_url: dish.image_url,
      src: dish.image_url,
      isDish: true,
    }));

    const galleryData = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      image_url: row.image_url,
      src: row.image_url,
      created_at: row.created_at,
    }));

    return ApiResponse.success(res, {
      gallery: galleryData,
      dishes: dishesAsGallery,
      all: [...galleryData, ...dishesAsGallery],
    }, 'Gallery items retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Add a new image to the gallery
 */
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return ApiResponse.error(res, 'Title and Image URL are required', 400);
    }

    const sql = `
      INSERT INTO gallery_items (title, category, image_url)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await query(sql, [title.trim(), (category || 'Kitchen').trim(), imageUrl.trim()]);

    return ApiResponse.created(res, result.rows[0], 'Gallery image added successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a gallery image
 */
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM gallery_items WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return ApiResponse.error(res, 'Gallery item not found', 404);
    }

    return ApiResponse.success(res, result.rows[0], 'Gallery image deleted successfully');
  } catch (err) {
    next(err);
  }
};
