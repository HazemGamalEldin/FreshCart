import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { productdetails } from 'src/app/core/shared/interfaces/productdetails';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService){}
  productdetails:productdetails = {} as productdetails;
  productImgSlider: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let productId:any = params.get('id')

        this._EcomdataService.getProduct(productId).subscribe({
          next:(response)=>{
            console.log(response.data)

            this.productdetails=response.data;


          },
          error:()=>{}
        })


      }
    })
      
  }
  addcart(productID:string):void{
    this._CartService.addproduct(productID).subscribe({
      next:(respons)=>{console.log(respons) ; this._ToastrService.success(`${respons.message}` , 'Fresh Cart')}
      ,error:(err)=>{console.log(err)}
    })
  }
}
