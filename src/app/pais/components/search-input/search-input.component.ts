import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Output() emitTermino: EventEmitter<string> = new EventEmitter<string>();
  @Output() debouce: EventEmitter<string> = new EventEmitter<string>(); // Esto se emitira cuando se deja de escribir
  @Input() porPlaceHolder: string = '';

  public debouncer$: Subject<string> = new Subject<string>();

  public termino: string = '';

  constructor() {}

  ngOnInit(): void {
    this.debouncer$.pipe(debounceTime(300)).subscribe((valor) => {
      // console.log('debouncer$ ', { valor });
      this.debouce.emit(valor);
    });
  }

  teclaPresionada(event: InputEvent | any): void {
    const valor = event.target.value;
    this.debouncer$.next(valor);
  }

  buscar(): void {
    this.emitTermino.emit(this.termino);
  }
}
