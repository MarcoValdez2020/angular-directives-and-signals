import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  // Inyeccion  de dependencias
  private fb = inject( FormBuilder);

  // Inyección de dependencias clasica
  // constructor(
  //   private fb:FormBuilder
  // ){}

  // color hexadecimal aleatorio
  public color:string = 'red';

  // formulario reactivo
  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(6),Validators.email ] ],

  })


  changeColor():void{
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

  }
}
