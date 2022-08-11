import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interface/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService{
    products: Product[] = [];
    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }

    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }

    updateCart(product:Product): void{
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();

    }
    // Método para calcular el total de la orden
    private calcTotal(): void{
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.quantity), 0);
        this.totalSubject.next(total);
    }

    // Método para saber la cantida de productos añadidos al carrito
    private quantityProducts(): void{
        const quantity = this.products.reduce((acc, prod) => acc += prod.quantity, 0);
        this.quantitySubject.next(quantity);
    }

    // Método para añadir al carrito
    private addToCart(product:Product):void{
        const isProductInCart = this.products.find(({id}) => id == product.id);

        if(isProductInCart){
            isProductInCart.quantity += 1;
        }else{
            this.products.push({...product, quantity:1})
        }
        this.cartSubject.next(this.products);
    }

    resetCart():void{
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
        this.products = [];
    }
}
