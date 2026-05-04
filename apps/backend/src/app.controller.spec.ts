import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    // Create a testing module with controller + service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStoreName', () => {
    it('should return the store name', () => {
      const result = controller.getStoreName();

      expect(result).toEqual({ name: 'The Tech Library' });
    });
  });

  describe('getProducts', () => {
    it('should return a list of products', () => {
      const result = controller.getProducts();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });

    it('should filter products by type', () => {
      const result = controller.getProducts('Books');

      expect(result.every((p) => p.type === 'Books')).toBe(true);
    });
  });

  describe('getWishlist', () => {
    it('should return an empty wishlist initially', () => {
      const result = controller.getWishlist();

      expect(result).toEqual([]);
    });
  });

  describe('addToWishlist', () => {
    it('should add a product to the wishlist', () => {
      controller.addToWishlist({ productId: 1 });

      const wishlist = controller.getWishlist();
      expect(wishlist).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: 1 })]),
      );
    });

    it('should not allow duplicate wishlist items', () => {
      controller.addToWishlist({ productId: 1 });

      expect(() =>
        controller.addToWishlist({ productId: 1 }),
      ).toThrow();
    });
  });
});