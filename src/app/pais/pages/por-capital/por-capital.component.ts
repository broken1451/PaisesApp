import { Component, OnInit } from '@angular/core';
import { PaisResponse } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.scss']
})
export class PorCapitalComponent implements OnInit {
  public termino: string;
  public error: boolean;
  public paises: PaisResponse[] = [];
  public porCapital: string;

  constructor(private paisService: PaisService) {
    this.termino = '';
    this.error = false;
    this.porCapital = 'Buscar por Capital';
  }

  ngOnInit(): void {
  }

  catchTermino(event: string): void {
    this.termino = event;
    this.error = false;
    this.paisService.buscarPaisByCapital(this.termino).subscribe(
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


}
