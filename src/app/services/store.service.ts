import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myCart: Product[] = [];

  private myCartObs = new BehaviorSubject<Product[]>([]);
  myCartObs$ = this.myCartObs.asObservable();

  addProduct(product: Product){
    this.myCart.push(product);
    this.myCartObs.next(this.myCart);
  }

  getMyCart(){
    return this.myCart;
  }

  getTotal(){
    return this.myCart.reduce( (sum, item) => sum + item.price, 0 );
  }
}
