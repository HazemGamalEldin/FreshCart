import { product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  productId:string = '';
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  whishNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  whishList: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>
  {
    
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
    
  }
  getProduct(productId:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  }

  getCategories():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  getAllBrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  getUserWishList():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }

  addtoWishList(productId:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:productId})
  }

  removeFromWishlist(productId:string):Observable<any>{   
     return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
}

getCartData(): Observable<any> {
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
}
getWishlist(): Observable<any> {
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
}
}
