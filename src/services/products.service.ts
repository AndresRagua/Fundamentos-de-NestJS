import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';


@Injectable()
export class ProductsService {

  private counterId = 1;

  private products: Product[] = [{
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 50,
    stock: 30,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Fperfil-usuario&psig=AOvVaw0wf02tSTLcI3dfMBjEhCTW&ust=1709740730989000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCGpNm-3YQDFQAAAAAdAAAAABAE'
  }];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const productIndex = this.products.findIndex((p) => p.id === product.id);
      this.products[productIndex] = {
        ...product,
        ...payload,
        id, // Agregar esta línea
      };

      return product;
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }


}
