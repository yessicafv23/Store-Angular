import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL= 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  //Creamos un método para obtener todos los productos desde nuestra API
  getProducts(): Observable <Product[]> {
    return this.http.get<Product[]>(this.apiURL)
  }

  // Update del sctok
  updateStock(productId: number, stock: number):Observable<any>{
    const body = {"stock": stock}
    return this.http.patch<any>(`$(this.apiURL)/${productId}`, body);
  }
}
