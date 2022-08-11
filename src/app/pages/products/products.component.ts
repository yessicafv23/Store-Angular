import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import {tap} from 'rxjs/operators';
import { Product } from './interface/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(private productSvc: ProductService, private shoppingCartSvc: ShoppingCartService) { }

  // Llamamos el método del service para poder consumirlo
  ngOnInit(): void {
    this.productSvc.getProducts().pipe(
      //tap(res => console.log(res))
      tap((products: Product[]) => this.products = products)
    ).subscribe();
  }

  // En este servicio tenemos el producto
  addToCart(product:Product): void{
    console.log('Add to cart', product);
    this.shoppingCartSvc.updateCart(product);
  }

  

}
