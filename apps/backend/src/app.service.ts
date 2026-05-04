import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import products from './data/products.json';

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
};

@Injectable()
export class AppService {
  // Store only product IDs to avoid duplicating product data
  private wishlist = new Set<number>();

  getStoreName(): { name: string } {
    return { name: 'The Tech Library' };
  }

  getProducts(type?: string): Product[] {
    // If no filter is provided, return all products
    if (!type) return products;

    // Filter products by type (e.g. Books, Electronics)
    return products.filter((p) => p.type === type);
  }

  getWishlist(): Product[] {
    // Map stored IDs back to full product objects
    return products.filter((p) => this.wishlist.has(p.id));
  }

  addToWishlist(productId: number): Product {
    const product = products.find((p) => p.id === productId);

    // Ensure product exists before adding
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Prevent duplicate wishlist entries
    if (this.wishlist.has(productId)) {
      throw new BadRequestException('Product already in wishlist');
    }

    this.wishlist.add(productId);

    return product;
  }
}