import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PaisResponse } from '../interfaces/pais.interface';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  get httpParams(): HttpParams {
    const params = new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population');
    return  params;
  }

  constructor(private httpClient: HttpClient) { }

  // url:'https://restcountries.eu/rest/v2/name/united'
  buscarPais(termino: string): Observable<PaisResponse[]>{
    return this.httpClient.get<PaisResponse[]>(`${environment.url}/name/${termino}`, {params: this.httpParams});
    // .pipe(
    //   catchError(err => of([]))
    // );
  }

  // https://restcountries.eu/rest/v2/capital/{capital}
  buscarPaisByCapital(capital: string): Observable<PaisResponse[]>{
    return this.httpClient.get<PaisResponse[]>(`${environment.url}/capital/${capital}`,{params: this.httpParams});
  }

  // https://restcountries.eu/rest/v2/alpha/col
  buscarPaisByCod(cod: string): Observable<PaisResponse>{
    return this.httpClient.get<PaisResponse>(`${environment.url}/alpha/${cod}`);
  }

  // https://restcountries.eu/rest/v2/region/europe
  buscarPaisByRegion(region: string): Observable<PaisResponse[]>{
    // const params = new HttpParams().set('fields', 'name;capital;alpha2code;flag;population');
    return this.httpClient.get<PaisResponse[]>(`${environment.url}/region/${region}`, {params: this.httpParams})
    .pipe(tap(console.log));
  }

}
