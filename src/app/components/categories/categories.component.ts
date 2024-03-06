import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/core/shared/interfaces/categories';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {



  constructor(private _EcomdataService:EcomdataService){}

  categories:Categories[] = [];


  ngOnInit(): void {

    this._EcomdataService.getCategories().subscribe({
      next:(respons)=>{
        this.categories = respons.data

      },
      error:()=>{}
    })
      

  }

}
