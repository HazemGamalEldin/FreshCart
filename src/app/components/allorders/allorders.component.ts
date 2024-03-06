import { Component, OnInit } from '@angular/core';
 import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  cartproducts: any =  {} ;

constructor(private _CartService:CartService){}
ngOnInit(): void {
  this._CartService.getUserOrder().subscribe({
    next:(respons)=>{
      console.log(respons)  ;

      this.cartproducts = respons ;
    },
    error:(err)=>{}
  })
}
getallorders(){

}
}
