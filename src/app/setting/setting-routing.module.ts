import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {path:'' , redirectTo:'update' , pathMatch:'full'},
  {path:'update' , component:UpdatepasswordComponent},
  {path:'forgot' , component:ForgotpasswordComponent},
  {path:'verify' , component:VerifycodeComponent},
  {path:'resetpassword' , component:ResetpasswordComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
