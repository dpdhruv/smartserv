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

  filtered=[];

  search='';

  searching=false;

  loading=true;
  constructor(private service:ProductsService){
    this.getData();
  }


  searchProduct(){

     if(this.search===''){
       this.searching = false;
     } else{
       this.searching = true;
        var words = this.search.split(" ");
       this.filtered = this.products.filter(product=>{
         for(let i=0;i<words.length;i++){
           if (product.title.toLowerCase().match(words[i].toLowerCase())) {
             console.log(product.title + " " + "matched with" + " " + this.search.toLowerCase())
             return product
           } else {
             console.log(product.title + " " + "not matched" + " " + this.search.toLowerCase())
             console.log("None");
           }
         }
     })
   }
     console.log(this.filtered);
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


