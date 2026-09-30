import { ValidationError } from '../../../shared/errors/AppError.js';

export class MenuItem {
  constructor({
    id,
    name,
    category,
    price,
    type = 'Veg',
    imageUrl = null,
    description = '',
    isPopular = false,
    isSignature = false,
    isAvailable = true,
    createdAt = null,
    updatedAt = null,
  }) {
    this.validate(name, price, type);

    this.id = id;
    this.name = name.trim();
    this.category = (category || 'Other').trim();
    this.price = parseFloat(price);
    this.type = type;
    this.imageUrl = imageUrl;
    this.description = description ? description.trim() : '';
    this.isPopular = Boolean(isPopular);
    this.isSignature = Boolean(isSignature);
    this.isAvailable = Boolean(isAvailable);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate(name, price, type) {
    if (!name || name.trim().length === 0) {
      throw new ValidationError('Menu item name is required');
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new ValidationError('Menu item price must be a non-negative number');
    }
    if (!['Veg', 'Non-Veg'].includes(type)) {
      throw new ValidationError("Menu item type must be either 'Veg' or 'Non-Veg'");
    }
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      type: this.type,
      imageUrl: this.imageUrl,
      description: this.description,
      isPopular: this.isPopular,
      isSignature: this.isSignature,
      isAvailable: this.isAvailable,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
