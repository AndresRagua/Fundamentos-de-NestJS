import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode,
        Res, /*ParseIntPipe*/} from '@nestjs/common';

import { Response } from 'express';
import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';
import {  CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

import { ProductsService } from '../services/products.service';


@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query('limit') limit: number = 100, @Query('offset') offset: number = 0, @Query('brand') brand: string) {
    //return {
    //  message: `productos: limit=> ${limit} offset=> ${offset} brand=> ${brand}`
    //}
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`
    };
  }

  @Get(':productId')
  getProduct(@Param() params: any) {
    return {
      message: `Product ${params.productId}`
    };
  }

  @Get('status/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    //response.status(200).send({
    //  message: `Product ${productId}`
    //});

    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    //return {
    //  message: 'Acccion de crear',
    //  payload,
    //};
    return this.productsService.create(payload);
  }

  @Put('edit/:id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }


}
