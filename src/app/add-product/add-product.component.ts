import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { productmodel } from '../interfaces/productmodel';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  public product:productmodel = {} as productmodel;

  constructor(private api: ApiService, private route:Router) {

  }

  addProduct(){
    if(
      this.product.name, this.product.price, this.product.category
    ){
      this.product.instock = true;
    this.api.postProduct(this.product).subscribe((res=>{
      console.log(this.product)
      alert("altoque")
      location.reload();
    }))}
    else{
      alert("Completa precio y nombre lagarto")
    }
  }

}
