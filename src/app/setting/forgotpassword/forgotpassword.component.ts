import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService ,private _ToastrService:ToastrService ,private _Router: Router){}

  forgetform:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]]
  })

  handelform():void{
    console.log(this.forgetform.value)
    this._AuthService.forgetpassword(this.forgetform.value).subscribe({

      next:(respons)=>{

        this._ToastrService.success(`${respons.message}` , `${respons.statusMsg}`)
        this._Router.navigate(['setting/verify'])

        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)

        this._ToastrService.warning( `${err.error.message}`,`${err.error.statusMsg}` )

      }
    })
  }

}
