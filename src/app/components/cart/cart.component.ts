import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usercartproducts } from 'src/app/core/shared/interfaces/usercartproducts';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartproducts:Usercartproducts =  {} as Usercartproducts;

  constructor(private _CartService:CartService,private _ToastrService:ToastrService){}
  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next:(respons)=>{
        console.log(respons)

        this.cartproducts = respons ;

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeCartProduct(productID:string){
    this._CartService.removeCartProduct(productID).subscribe({
      next:(respons)=>{
        console.log(respons)
        this.cartproducts = respons ;
        this._ToastrService.success(`${respons.status}` , 'Fresh Cart');
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  changeQuantity(productID:string,newQuantity:number):void{
      if(newQuantity >0)
      {
        this._CartService.updateCartProductQuantity(productID,newQuantity).subscribe({
          next:(respons)=>{
            this.cartproducts = respons ;
            this._ToastrService.success(`${respons.status}` , 'Fresh Cart');

          }
          ,error:(err)=>{
            console.log(err)
          }
        })
      }
  }
}
