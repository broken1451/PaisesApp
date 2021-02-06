import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaisResponse } from '../interfaces/pais.interface';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private httpClient: HttpClient) { }

  // url:'https://restcountries.eu/rest/v2/name/united'

  buscarPais(termino: string): Observable<PaisResponse[]>{
    return this.httpClient.get<PaisResponse[]>(`${environment.url}/name/${termino}`);
    // .pipe(
    //   catchError(err => of([]))
    // );
  }

  // https://restcountries.eu/rest/v2/capital/{capital}
  buscarPaisByCapital(capital: string): Observable<PaisResponse[]>{
    return this.httpClient.get<PaisResponse[]>(`${environment.url}/capital/${capital}`);
    // .pipe(
    //   catchError(err => of([]))
    // );
  }

  // https://restcountries.eu/rest/v2/alpha/col
  buscarPaisByCod(cod: string): Observable<PaisResponse>{
    return this.httpClient.get<PaisResponse>(`${environment.url}/alpha/${cod}`);
    // .pipe(
    //   catchError(err => of([]))
    // );
  }

}
