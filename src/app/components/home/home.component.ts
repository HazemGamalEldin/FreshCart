import { Categories } from './../../core/shared/interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/core/shared/interfaces/product';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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

  constructor(private _EcomdataService:EcomdataService){}

  ngOnInit(): void {
   
    this._EcomdataService.getAllProducts().subscribe({
      next:(respons)=>{
        console.log(respons)

        this.products = respons.data

      },
      error:(err)=>{

      }
    })

    this._EcomdataService.getCategories().subscribe({
      next:(respons)=>{
        this.categories = respons.data

      },
      error:()=>{}
    })
  }

}
