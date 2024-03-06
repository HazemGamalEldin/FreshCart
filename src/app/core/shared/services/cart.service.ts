import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient:HttpClient) { }

  addproduct (productID:string):Observable<any>
  {
    return  this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`
    ,{productId: productID}
    )
  }
  getCartProducts():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  removeCartProduct(productID:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`)
  }

  updateCartProductQuantity(productID:string,quantity:number):Observable<any>{
    return  this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{ count:quantity }
    
    )
  }

  checkOut(cartID:string,checkoutForm:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://hazemgamaleldin.github.io/FreshCart`,
    {
      shippingAddress:checkoutForm
    }
     )
  }
  
  userData:any;
  getUserOrder():Observable<any>{

    if (localStorage.getItem('usertoken') !=null)
    {
      let encodeUserData:any = localStorage.getItem('usertoken') ;
      let decodeUserData = jwtDecode(encodeUserData);
      this.userData = decodeUserData;
     }
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${this.userData.id}`)
  }
}
