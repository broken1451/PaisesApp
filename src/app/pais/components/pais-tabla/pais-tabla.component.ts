import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaisResponse } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styleUrls: ['./pais-tabla.component.scss'],
})
export class PaisTablaComponent implements OnInit {
  @Input() paises: PaisResponse[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(path: string, pais: PaisResponse): void {
    this.router.navigate([path, pais.alpha2Code]);
  }
}
