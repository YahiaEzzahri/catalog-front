import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseURL ="http://localhost:8085/products";

  constructor(private httpClient :HttpClient) {}

  getAllProducts():Observable <Product[]>{
      return this.httpClient.get<Product[]>(`${this.baseURL}`);
  }

  deleteProduct(id : number){
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getProductsById(id : number){
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  updateProductData(id : number , products : Product ):Observable<Object>{
    return this.httpClient.put<Product>(`${this.baseURL}/${id}`, products); 
  }

}
