import { Component, OnInit } from '@angular/core';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { IEspecialista } from 'src/app/models/Especialista'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'consultar-especialistas',
  templateUrl: './consultar-especialistas.component.html',
  styleUrls: ['./consultar-especialistas.component.css']
})
export class ConsultarEspecialistasComponent {
  constructor(
    private servicio: EspecialistasService, 
    private toastr: ToastrService,
    private router:Router){}

  ngOnInit(): void {
    this.servicio.obtenerEspecialistas().subscribe((response) => {
      this.tarjetasEspecialistas = response;
      console.log(this.tarjetasEspecialistas)
    })
    
  }

  tarjetasEspecialistas;

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }


}
