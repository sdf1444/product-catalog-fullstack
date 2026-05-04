import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    // Create a testing module with the service
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStoreName', () => {
    it('should return the store name', () => {
      expect(service.getStoreName()).toEqual({
        name: 'The Tech Library',
      });
    });
  });

  describe('getProducts', () => {
    it('should return all products when no type is provided', () => {
      const result = service.getProducts();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter products by type', () => {
      const result = service.getProducts('Books');

      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.type === 'Books')).toBe(true);
    });
  });

  describe('wishlist functionality', () => {
    it('should return an empty wishlist initially', () => {
      expect(service.getWishlist()).toEqual([]);
    });

    it('should add a product to the wishlist', () => {
      const product = service.addToWishlist(1);

      expect(product).toHaveProperty('id', 1);

      const wishlist = service.getWishlist();
      expect(wishlist).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: 1 })]),
      );
    });

    it('should prevent duplicate wishlist items', () => {
      service.addToWishlist(1);

      expect(() => service.addToWishlist(1)).toThrow();
    });

    it('should throw if product does not exist', () => {
      expect(() => service.addToWishlist(999)).toThrow();
    });
  });
});