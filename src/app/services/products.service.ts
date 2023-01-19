import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Product, CreateProductDTO } from "../models/product.model";
import { retry, catchError, map } from "rxjs/operators";
import { throwError, zip } from "rxjs";
import { environment } from "../../environments/environment";
import { checkTime } from "../interceptors/time.interceptor";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getByCategory (categoyId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if ( limit !== undefined && offset !== undefined ){
      params = params.append('limit', limit);
      params = params.append("offset", offset);
    }
    return this.http.get<Product[]>(`${this.apiURL}/categories/${categoyId}/products`,
      {
        params
      })
  }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if ( limit !== undefined && offset !== undefined ){
      params = params.set("limit", limit);
      params = params.set("offset", offset);
    }
    return this.http.get<Product[]>(`${this.apiURL}/products`, {params, context: checkTime()})
    .pipe(
      retry(3),
      map( products => products.map( item => {
        return {
          ...item,
          taxes: .19 * item.price,
        }
      }))
    );
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiURL}/products`,
    {
      params:{ limit, offset },
      context: checkTime()
    })
    .pipe(
      retry(3),
      map( products => products.map( item => {
        return {
          ...item,
          taxes: .19 * item.price,
        }
      }))
    );
  }

  fetchReadAndUpdate(id: string, dto: Partial<CreateProductDTO>){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiURL}/products/${id}`)
    .pipe(
      catchError( (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict){
          return throwError( () => new Error("Algo salio mal con el servidor") );
        }
        if (error.status === HttpStatusCode.NotFound){
          return throwError( () => new Error("Producto no encontrado") );
        }
        if (error.status === HttpStatusCode.Unauthorized){
          return throwError( () => new Error("No estas autorizado") );
        }
        return throwError( () => new Error("Algo salio mal") );
      })
    );
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiURL}/products`, dto);
  }

  update(id: string, dto: Partial<CreateProductDTO>){
    return this.http.put<Product>(`${this.apiURL}/products/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiURL}/products/${id}`);
  }
}
