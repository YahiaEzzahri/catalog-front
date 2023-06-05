import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../Model/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Array<Product> = [] ;
  currentPage : number = 0 ;
  pageSize:number=5;
  totalPages:number=0;
  errormessage!: string;
  searchFormGroup! : FormGroup;
  currentAction : string= "All";

  //OR//products! : Array<any>
 constructor(private productService:ProductService,private fb : FormBuilder,
  public authService:AuthentificationService
  ){
  }
  ngOnInit(): void {
      this.searchFormGroup=this.fb.group({
        Keyword : this.fb.control(null)
      });
      this.handelGetPageProducts();
     // this.handelGetAllProducts;
    // this.products = this.productService.getAllProducts();
   
  }

  handelGetPageProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
         
      next:(data)=>{
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error : (err)=>{
        this.errormessage=err;
      }
  
     });
   }

 handelGetAllProducts(){
  this.productService.getAllProducts().subscribe({
       
    next:(data)=>{
      this.products=data;
    },
    error : (err)=>{
      this.errormessage=err;
    }

   });
 }

  handleDeleteProduct(p: Product){
    
    let conf=confirm("Are you sure?");
    if(conf==false) return;


    this.productService.deleteProduct(p.id).subscribe({
      next:(data)=>{
        //this.handelGetAllProducts();
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    });
// this.products = this.products.filter((item) => item.id !== p.id)
   
  }
  /*handleDeleteProduct(p: any) {
    const index = this.products?.indexOf(p);
    
    if (index !== undefined && index >= 0) {
      this.products?.splice(index, 1);
    }
  }*/
  
  handlSetPromotion(p:Product){
   
    let promo = p.promotion;
    this.productService.SetPromotion(p.id).subscribe({
        next :  (data)=>{
         
          p.promotion=!promo; 
        },
        error:err=>{
          this.errormessage = err;
        }
      });

    }

    handlSearchProducts(){  
     // console.log("hello");
     this.currentAction="search"; 
     this.currentPage=0; 
      let Keyword = this.searchFormGroup.value.Keyword;
      this.productService.SearchProduct(Keyword,this.currentPage,this.pageSize).subscribe({
        next : (data) =>{
          this.products = data.products;
          this.totalPages=data.totalPages;
        }
      });
    }

    gotoPage(i:number){
      this.currentPage = i;
      if(this.currentAction==='All'){
        this.handelGetPageProducts();
      }else{
        this.handlSearchProducts();
      }
      

    }


}
