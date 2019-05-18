import { Component } from '@angular/core';
import {ProductsService} from './service/products.service'
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartserv';

  products=[];
  loading=true;
  constructor(private service:ProductsService){
    this.getData();
  }

  getData(){
    this.service.getProducts().subscribe(res=>{
      this.products = _.values(res.products);
      this.products.sort(function(a,b){
        return a.popularity-b.popularity
      }).reverse()
      this.loading = false;
    },err=>{
      alert("Opps , Something went wrong.");
      this.loading = false;
    })
  }
}


