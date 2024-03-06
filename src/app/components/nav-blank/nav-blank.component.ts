import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/services/auth.service';
import { EcomdataService } from 'src/app/core/shared/services/ecomdata.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {

  constructor(private _AuthService:AuthService,private _EcomdataService:EcomdataService,private _Router:Router){}
  cartItemNumber: number = 0;
  whishItemNumber: number = 0;
  userName: string = '';

  ngOnInit(): void {


    if (!this._Router.url.includes('cart')) {
      this._EcomdataService.getCartData().subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this._EcomdataService.cartNumber.next(response.numOfCartItems);
          }
        },
        error: (err) => {
          console.log('Error Cart Nav', err.error.message);
        },
      });
    }

    this._EcomdataService.cartNumber.subscribe({
      next: (data) => {
        this.cartItemNumber = data;
      },
    });

    if (!this._Router.url.includes('whishlist')) {
      this._EcomdataService.getWishlist().subscribe({
        next: (response) => {
          if (response.status === 'success') {
            const whishList = response.data.map((item: any) => item._id);
            this._EcomdataService.whishList.next(whishList);
            this._EcomdataService.whishNumber.next(response.data.length);
            this.whishItemNumber = response.data.length;
          }
        },
      });
    }
    

    this._EcomdataService.whishNumber.subscribe({
      next: (data) => {
        this.whishItemNumber = data;
      },
    });
  }
  logoutuser(){

    this._AuthService.logOut();

    console.log(localStorage.getItem('usertoken'))

  }
}
