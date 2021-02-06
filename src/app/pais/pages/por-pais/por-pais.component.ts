import { Component, OnInit } from '@angular/core';
import { PaisResponse } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.scss'],
})
export class PorPaisComponent implements OnInit {
  public termino: string;
  public porPais: string;
  public error: boolean;
  public paises: PaisResponse[] = [];

  constructor(private paisService: PaisService) {
    this.termino = '';
    this.error = false;
    this.porPais = 'Buscar pais...';
  }

  ngOnInit(): void {}

  catchTermino(event: string): void {
    this.termino = event;
    this.error = false;
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (err) => {
        console.log({ err });
        this.error = true;
        this.paises = [];
      }
    );
  }

  sugerencias(event: string): void {
    this.error = false;
    // this.termino = event;
  }
}
