import { Data } from './../../core/shared/interfaces/usercartproducts';
import { Categories } from './../../core/shared/interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/core/shared/interfaces/product';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  
  searchInput:string="";
  products:product[]=[];
  categories:Categories[] = [];
 
  

  categoriesSliderOption: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSlider: OwlOptions = {
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

  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService,private _ToastrService:ToastrService){}

  ngOnInit(): void {
   
   


    this._EcomdataService.getCategories().subscribe({
      next:(respons)=>{
        this.categories = respons.data

      },
      error:()=>{}
    })

    this._EcomdataService.getUserWishList().subscribe({
      next:(respons)=>{
        console.log(respons.data)
        this.products = respons.data

      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)
      }
    })
  }

  addcart(productID:string):void{
    this._CartService.addproduct(productID).subscribe({
      next:(respons)=>{  
        this._ToastrService.success(`${respons.message}` , 'Fresh Cart')}
      ,error:(err)=>{console.log(err)}
    })
  }

  removeFromWishlist(productId:string){
    this._EcomdataService.removeFromWishlist(productId).subscribe({
      next:(respons)=>{
        
        this._ToastrService.success(`${respons.message}` , 'Fresh Cart')

        this._EcomdataService.getUserWishList().subscribe({
          next:(respons)=>{
            console.log(respons.data)
            this.products = respons.data
    
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err)
          }
        })
      },
      error:(err)=>{console.log(err)}
    })
  }

  showSuccess() {
    this._ToastrService.success('Hello world!', 'Toastr fun!');
  }


}
