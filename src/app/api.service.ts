import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Route, RouterLink } from '@angular/router'
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"https://easyhms.com/"
    // "Authorization":"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
  }) 
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  HTTPProtocol: string = "https";
  COMPANY_URL = "";
  COMPANY_PORT = "";
  public url :string = environment.baseUrl;
  public progress = 0;
  constructor(private httpClient: HttpClient) { }
  loadings: number[] = [];


  Get(url: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + url, httpOptions)
      .pipe(
        map(res => res),
        tap((obj: any) => {
        }),
        catchError(this.handleError())
      );
  }

  Post(url: string, obj: object): Observable<any> {
    return this.httpClient.post<any>(environment.baseUrl + url, obj, httpOptions)
      .pipe(
        map(res => res),
        tap((obj: any) => {
        }),
        catchError(this.handleError())
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
