import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = 'green';

  private _errors?: ValidationErrors | null;

  // recibimos el color y lo asignamos a la propiedad
  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  // recibimos los errores y los asignamos a la propiedad
  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    // llamamos el metodo con cada cambio del error
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    // console.log('constructor de la directiva');
    // console.log(el);
    this.htmlElement = el;
  }

  ngOnInit(): void {
    // console.log('Directiva - OnInit');
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = ''
      // para terminar la funcion una vez que se ejecuto
      return;
    }

    const errors = Object.keys(this._errors)

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Campo requerido'
      return;
    }
    if (errors.includes('minlength')) {
      const req = this._errors!['minlength']['requiredLength'];
      const actual = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `El campo tiene ${actual} caracteres y debe tener al menos ${req} caracteres`
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Ingrese una direccion de correo válida'
      return;
    }
  }


}
