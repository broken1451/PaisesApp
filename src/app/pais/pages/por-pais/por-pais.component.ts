import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public paisesSugeridos: PaisResponse[] = [];
  public mostrarSugerencia: boolean = false;

  constructor(private paisService: PaisService, private router: Router) {
    this.termino = '';
    this.error = false;
    this.porPais = 'Buscar pais...';
  }

  ngOnInit(): void {}

  catchTermino(event: string): void {
    this.termino = event;
    this.error = false;
    this.mostrarSugerencia = false;
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
    this.termino = event;
    this.mostrarSugerencia = true;
    this.paisService.buscarPais(event).subscribe((paises) => {
      this.paisesSugeridos = paises.splice(0, 5);
    }, (err) => {
      this.error = true;
      this.paisesSugeridos = [];
    });
  }

  buscarSugerido(termino: string): void{
    this.catchTermino(termino);
  }

  navigate(path: string, code: string): void{
    this.router.navigate([path, code]);
  }
}
