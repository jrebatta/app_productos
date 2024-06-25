import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_SERVICES = 'http://localhost:8080';
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlBase + '/productosTotal');
  }

  details(codigo: number): Observable<Product> {
    return this.http.get<Product>(this.urlBase + "/productos/" + codigo);
  }

  createProducto(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlBase + "/producto", product, {headers: this.httpHeaders})
      .pipe(
        catchError(error => {
          if (error.status === 400) {
            return throwError({ message: error.error.message });
          } else {
            return throwError({ message: "Error al registrar producto. Intente nuevamente." });
          }
        })
      );
  }

  updateProducto(codigo: number, producto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlBase}/producto/${codigo}`, producto, {headers: this.httpHeaders});
  }

  deleteProducto(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/borrarProducto/${codigo}`, {headers: this.httpHeaders});
  }
}
