import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  logueado = false;


  login(logueado: boolean){
    this.logueado = logueado
    console.log(this.logueado)
  };

// -------------------------------------------





}
