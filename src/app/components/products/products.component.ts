import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/core/shared/interfaces/product';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:product[] = []  ; 
  searchInput:string="";

  constructor( private _CartService:CartService,private _EcomdataService:EcomdataService,private _ToastrService:ToastrService){}

  ngOnInit(): void {

    this._EcomdataService.getAllProducts().subscribe({
      next:(respose)=>{
        this.products = respose.data

      },
      error:(err)=>{}
    })
      
  }


  addcart(productID:string):void{
    this._CartService.addproduct(productID).subscribe({
      next:(respons)=>{console.log(respons) ; this._ToastrService.success(`${respons.message}` , 'Fresh Cart')}
      ,error:(err)=>{console.log(err)}
    })

}
}