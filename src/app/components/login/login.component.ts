import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private _AuthService:AuthService, private _Router:Router,private _FormBuilder:FormBuilder){}

isLoading:boolean=false;
msgerror:string='';

 

loginform:FormGroup = this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password :[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
})

handelform(){

  if(this.loginform.valid){

    this.isLoading =true;

    this._AuthService.setlogin(this.loginform.value).subscribe({
    next:(respons)=>{
      if(respons.message=='success'){
        this.isLoading =false;
        localStorage.setItem('usertoken', respons.token)

        this._AuthService.saveUserData()

        this._Router.navigate(['/home'])
 
      }
    }, 
    error:(err:HttpErrorResponse)=>{
      this.isLoading=false;

      this.msgerror = err.error.message;
       
    }
  
  });

  
}
else{
  this.loginform.markAllAsTouched()

}

}


}
