import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private url:string = "/assets/data/product.json";

  getProducts(){
    return this.http.get<any>(this.url);
  }
}
