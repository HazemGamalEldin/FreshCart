import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit {
  
  cartID:any = ''

  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
        this.cartID=parms.get('id')  ;
      }
    })
  }

  checkout:FormGroup = this._FormBuilder.group({
    details:[],
    phone:[],
    city:[]
  })

  handelForm():void{
    this._CartService.checkOut(this.cartID,this.checkout.value).subscribe({
      next:(respons)=>{
        console.log(respons)
        if(respons.status =="success"){
          window.open(respons.session.url,'_self')

        }

      }
    })

    console.log(this.checkout.value)



  }



}
