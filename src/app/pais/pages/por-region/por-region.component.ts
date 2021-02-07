import { Component, OnInit } from '@angular/core';
import { PaisResponse } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.scss'],
})
export class PorRegionComponent implements OnInit {
  public regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania', ];
  public regionActiva: string = '';
  public paises: PaisResponse[] = [];


  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  activarRegion(region: string): void{
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    this.paises = [];
    // hacer llamado al servicio
    this.paisService.buscarPaisByRegion(region).subscribe((paises) => {
      this.paises = paises;
    });
  }

  getClassesCss(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
    // if (region === this.regionActiva) {
    //   return 'btn btn-primary';
    // } else {
    //  return 'btn btn-outline-primary';
    // }
  }
}
