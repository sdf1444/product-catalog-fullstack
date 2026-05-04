import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Inject AppService to delegate business logic
  constructor(private readonly appService: AppService) {}

  // Simple health-style endpoint used by the frontend to display the store name
  @Get('store-name')
  getStoreName() {
    return this.appService.getStoreName();
  }

  // Return all products, with optional filtering by type via query param (?type=Books)
  @Get('products')
  getProducts(@Query('type') type?: string) {
    return this.appService.getProducts(type);
  }

  // Return the current wishlist as full product objects
  @Get('wishlist')
  getWishlist() {
    return this.appService.getWishlist();
  }

  // Add a product to the wishlist by ID
  // Note: convert to number to avoid issues if the client sends a string
  @Post('wishlist')
  addToWishlist(@Body() body: { productId: number }) {
    return this.appService.addToWishlist(Number(body.productId));
  }
}