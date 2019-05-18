import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url ="https://s3.ap-south-1.amazonaws.com/ss-local-files/products.json";

  getProducts(){
    return this.http.get<any>(this.url);
  }
}
