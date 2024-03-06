import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService ,private _ToastrService:ToastrService ,private _Router: Router){}

  resetpasswordform:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]],

    newPassword:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  handelform():void{
    this._AuthService.resetPassword(this.resetpasswordform.value).subscribe({

      next:(respons)=>{
        console.log(respons)

        this._ToastrService.success(`Password reseted` , `success`)
        
        localStorage.removeItem('usertoken')
        
        localStorage.setItem('usertoken', respons.token)

        this._AuthService.saveUserData()

        this._Router.navigate(['/home'])

        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err.error)

        this._ToastrService.warning( `${err.error.message}`,`${err.error.statusMsg}` )

      }
    })
  }

}
