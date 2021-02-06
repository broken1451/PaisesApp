import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PaisResponse } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.scss'],
})
export class VerPaisComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  public pais!: PaisResponse; // ts confia en mi yo se lo q estoy haciendo, pais puede ser nulo pero tratalo como si tuviera data pero puede ser null

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    // otra manera
    this.activatedRoute.params
      .pipe(
        switchMap(({ codPais }: Params) => {
          return this.getPaisByCode(codPais);
        }),
        tap(console.log)
      ).subscribe((pais:  PaisResponse) => {
        this.pais = pais;
      });

    // una manera
    // this.activatedRoute.params.subscribe(({ codPais }: Params) => {
    //   console.log(codPais);
    //   this.getPaisByCode(codPais).subscribe((pais) => {
    //     console.log(pais);
    //   });
    // });
  }

  getPaisByCode(cod: string): Observable<PaisResponse> {
    return this.paisService.buscarPaisByCod(cod);
  }
}
