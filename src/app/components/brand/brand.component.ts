import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/core/shared/interfaces/brands';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
 
 brands:Brands = {} as Brands;
 
  constructor(private _EcomdataService:EcomdataService){}

  ngOnInit(): void {
    this._EcomdataService.getAllBrands().subscribe({
      next:(respons)=>{
        this.brands =  respons
      },
      error:()=>{}
    })
  }

}
