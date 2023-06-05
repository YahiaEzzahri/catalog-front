import { Injectable } from '@angular/core';
import { Observable, observable, of, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { PageProduct, Product } from '../Model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;
  constructor() { 
    this.products=[
      {id:UUID.UUID(), name : "computer" , price : 6500,promotion:true},
      {id:UUID.UUID(), name : "Printer" , price : 500,promotion:true   },
      {id:UUID.UUID(), name : "Smart-Phone" , price : 5000,promotion:false   },
      {id:UUID.UUID(), name : "PS-5" , price : 8500 ,promotion:false  },
      
];
for (let i = 0; i < 10; i++) {
  this.products.push( {id:UUID.UUID(), name : "computer" , price : 6500,promotion:true},)
  this.products.push( {id:UUID.UUID(), name : "Television" , price : 6500,promotion:false},)
  this.products.push( {id:UUID.UUID(), name : "refrigirateur" , price : 6500,promotion:true},)
  this.products.push({id:UUID.UUID(), name : "PS-5" , price : 8500 ,promotion:false  },)
}
}


public getAllProducts() : Observable<Array<Product>>{
 //public getAllProducts() : Observable<Product[]>{ 
  let rdn = Math.random();
  if(rdn<0.1) return throwError(()=>new Error(" CONNEXION ERROR"));
  else return of(this.products);

} 


public getPageProducts(page : number , size: number) : Observable<PageProduct>{
  let index = page*size;
  let totalPages = ~~(this.products.length/size); 
  if(this.products.length % size!=0){
      totalPages++;   
  }
     let PageProducts = this.products.slice(index,index+size);
     return of({page:page, size:size, totalPages : totalPages, products : PageProducts});
 } 

public deleteProduct(id:string):Observable<boolean>{
  this.products = this.products.filter(p=>p.id!=id);
  return of(true);
}

public SetPromotion(id: string): Observable<boolean> {
  let product = this.products.find(p => p.id === id);
  if (product !== undefined) {
    product.promotion =!product.promotion;
    return of(true);
  } else {
    return throwError(() => new Error("Product Not Found"));
  }
}

public SearchProduct(Keyword :string,page : number,size:number) : Observable<PageProduct>{
      let result =  this.products.filter(p=>p.name.includes(Keyword)); 
      let index = page*size;
      let totalPages = ~~(result.length/size); 
      if(this.products.length % size!=0){
          totalPages++;   
      }
         let PageProducts = result.slice(index,index+size);
         return of({page:page, size:size, totalPages : totalPages, products : PageProducts});
}


}
