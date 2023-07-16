import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewLeaveComponent } from './view-leave/view-leave.component';

const routes: Routes = [
  {path:'', component: AddProductComponent},
  {path:'view', component: ViewLeaveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
