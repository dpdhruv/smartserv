import { Component } from '@angular/core';
import { ProductsService } from './service/products.service'
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartserv';

  products = [];

  filtered = [];

  search = '';

  searching = false;

  loading = true;
  constructor(private service: ProductsService) {
    this.getData();
  }


  searchProduct() {


    if (this.search === '') {
      this.searching = false;
    } else {
      this.searching = true;
      var words = this.search.split(" ");
      console.log("Words Array" + words);

      var indexOfOperatorAnd = words.indexOf("and");
      var indexOfOperatorOr = words.indexOf("or");

      this.filtered = this.products.filter(product => {
        if (indexOfOperatorAnd == -1 && indexOfOperatorOr == -1 ) {
          for (let i = 0; i < words.length; i++) {
            if (product.title.toLowerCase().search(this.search.toLowerCase()) != -1) {
              console.log(product.title + " " + "matched with" + " " + this.search.toLowerCase())
              return product
            } else {
              console.log(product.title + " " + "not matched" + " " + this.search.toLowerCase())
              console.log("None");
            }
          }
        } else if(indexOfOperatorOr > -1){
          var orWords = this.search.split("or");
          var indexOr = 0;
        /*************** FOR OR OPERATOR STARTS *******************************/
          if (product.title.toLowerCase().match(orWords[indexOr])) {
            if (indexOr < orWords.length) {
              indexOr++;
            }
            return product;
          } else if (product.title.toLowerCase().match(orWords[indexOr+1])){
            if (indexOr < orWords.length) {
              indexOr++;
            }
            return product;
          } else {
            if (indexOr < orWords.length) {
              indexOr++;
            }
            console.log("none matched")
          }
        /*************** FOR OR OPERATOR STARTS *******************************/
        } else {
          var newWords = this.search.split("and");
          console.log(newWords.length);
          var index = 0;
          /*************** FOR AND OPERATOR STARTS *******************************/
            if (product.title.toLowerCase().match(newWords[index])
              && product.title.toLowerCase().match(newWords[index+1])) {
              if (index < newWords.length) {
                index++;
              }
                return product;
            } else {
              if (index < newWords.length) {
                index++;
              }
              console.log("none matched")
            }
        /*************** FOR AND OPERATOR EndsS *******************************/
        }
      })
      if (this.filtered.length == 0) {
        if (indexOfOperatorAnd == -1 && indexOfOperatorOr == -1) {
          this.filtered = this.products.filter(product => {
            for (let i = 0; i < words.length; i++) {
              if (product.title.toLowerCase().search(words[i].toLowerCase()) != -1) {
                console.log(product.title + " " + "matched with" + " " + this.search.toLowerCase())
                return product
              } else {
                console.log(product.title + " " + "not matched" + " " + this.search.toLowerCase())
                console.log("None");
              }
            }
          })
        }
      }
    }
    console.log(this.filtered);
  }







  getData() {
    this.service.getProducts().subscribe(res => {
      this.products = _.values(res.products);
      this.products.sort(function (a, b) {
        return a.popularity - b.popularity
      }).reverse()
      this.loading = false;
    }, err => {
      alert("Opps , Something went wrong.");
      this.loading = false;
    })
  }
}


