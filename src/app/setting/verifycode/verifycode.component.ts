import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css']
})
export class VerifycodeComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService ,private _ToastrService:ToastrService ,private _Router: Router){}

  resetCodeform:FormGroup = this._FormBuilder.group({
    resetCode:['',[Validators.required]]
  })

  handelform():void{
    this._AuthService.verifyRestCode(this.resetCodeform.value).subscribe({

      next:(respons)=>{
        console.log(respons)

        this._ToastrService.success(`${respons.status}` , `${respons.status}`)
        this._Router.navigate(['setting/resetpassword'])

        
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)

        this._ToastrService.warning( `${err.error.status}`,`${err.error.status}` )

      }
    })
  }

}
