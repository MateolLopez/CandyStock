import {Component} from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { productmodel } from '../interfaces/productmodel';

@Component({
  selector: 'app-view-leave',
  styleUrls: ['view-leave.component.css'],
  templateUrl: 'view-leave.component.html',
})

export class ViewLeaveComponent {
  displayedColumns: string[] = ['category','name', 'price','stock'];
  dataSource! :MatTableDataSource<any>;
  dataStocked: productmodel[] = [];
  dataStockedSource!:MatTableDataSource<any>;
  dataOutstocked: productmodel[] =[];
  dataOutstockedSource!:MatTableDataSource<any>;
  dataId:number = 0;
  editable: boolean = false;
  actualObj:productmodel = {} as productmodel
  editedObj:productmodel = {} as productmodel

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.displayProducts();
  }

  displayProducts(){
    this.api.viewProduct().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource)
        this.showData();
      }
    })
  }

  deleteProduct(id:number){
    this.api.delete(id).subscribe(res=>{
      alert("Delitooo")
      this.displayProducts();
    })
  }

  inOutStock(id:number){
    //edit product instock
  }

  editProduct(element: productmodel){
    console.log(element);
    this.dataId = element.id;
    element.edit = !element.edit;
    //this.editable = !this.editable
    this.api.fetchProduct(element.id).subscribe(res=>{
      this.editedObj = res;
      console.log(this.editedObj);
    })
  }

  editDone(){
    let updtObj:productmodel
    updtObj = this.editedObj;
    console.log(this.editedObj)
    if(!updtObj.name || !updtObj.price || !updtObj.category){
      alert('pone valor lagarto')
      location.reload()
    }else{
    this.api.updateProduct(updtObj, this.dataId).subscribe((data:any)=>{
      console.log(updtObj);
      alert('Data actulaished perro')
      location.reload();
    })
  }
  }

  showData(){
    console.log(this.dataSource.filteredData)
    let filtrin:productmodel[] = this.dataSource.filteredData
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      if(filtrin[i].instock === true){
        this.dataStocked.push(filtrin[i])
      }else{
        this.dataOutstocked.push(filtrin[i])
      }
    }
    console.log(this.dataStocked)
    this.dataStockedSource = new MatTableDataSource(this.dataStocked);
    this.dataOutstockedSource = new MatTableDataSource(this.dataOutstocked);
  }
}
