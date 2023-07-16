import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productmodel } from './interfaces/productmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/posts'


  constructor(private http:HttpClient) { }

  header = new HttpHeaders({
    'X-ACCESS-KEY':'$2b$10$3d575Zojx0oybWEHJnD83OO0aBIiJnS4NchjFbuWOHrA7jqGWe6FK',
    'X-Bin-Meta':'false'
  })

  postProduct(data:productmodel){
    return this.http.post<productmodel>(`${this.url}`,data)
  }

  viewProduct(){
    return this.http.get<productmodel[]>(`${this.url}`)
  }

  delete(id:number){
    return this.http.delete<productmodel>(`${this.url}/${id}`)
  }

  fetchProduct(id:number){
    return this.http.get<productmodel>(`${this.url}/${id}`)
  }

  updateProduct(data:productmodel, id:number){
    return this.http.put<productmodel>(`${this.url}/${id}`,data)
  }

}
