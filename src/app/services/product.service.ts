import { Injectable } from '@angular/core';
import { Service } from './service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service{

  constructor(public http: HttpClient) { 
    super(http);
  }

  public getProduct(id:Number){
    return this.http.get(this.URL+"/api/product/"+id, this.httpOptionsAuth);
  }

  public getProducts(queries:String){
    return this.http.get(this.URL+"/api/product?"+queries, this.httpOptionsAuth);
  }

  public createProduct(body:any){
    return this.http.post(this.URL+"/api/product/create", body, this.httpOptionsAuth);
  }

  public editProduct(body:any){
    return this.http.put(this.URL+"/api/product/update", body, this.httpOptionsAuth);
  }
  
  public deleteProduct(id:Number){
    return this.http.delete(this.URL+"/api/product/"+id, this.httpOptionsAuth);
  }

  public uploadImageProduct(id:Number, body:any){
    return this.http.post(this.URL+"/api/product/"+id+"/image", body, this.httpOptionsAuth);
  }

  public deleteImageProduct(id:Number, idimage:Number){
    return this.http.delete(this.URL+"/api/product/"+id+"/image/"+idimage, this.httpOptionsAuth);
  }

  public setImagePrincipal(id:Number, body:any){
    return this.http.post(this.URL+"/api/product/"+id+"/imageprincipal", body, this.httpOptionsAuth);
  }
}
