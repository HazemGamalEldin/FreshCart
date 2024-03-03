import { product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  productId:string = '';

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
}
