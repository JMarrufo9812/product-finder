import type { IProduct } from '@/entities/interfaces/product';

export class Product {
  constructor(options: IProduct) {
    this.brandId = options.brand_id;
    this.brandName = options.brand_name;
    this.colorName = options.color_name;
    this.image = options.images[0];
    this.price = options.price;
    this.priceWithDiscount = options.price_with_discount;
    this.categoryID = options.product_category_id;
    this.categoryName = options.product_category_name;
    this.description = options.product_description;
    this.productID = options.product_id;
    this.productName = options.product_name;
  }
}
