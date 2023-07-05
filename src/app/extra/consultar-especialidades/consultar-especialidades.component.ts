import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { IEspecialidad } from 'src/app/models/Especialidad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'consultar-especialidades',
  templateUrl: './consultar-especialidades.component.html',
  styleUrls: ['./consultar-especialidades.component.css']
})
export class ConsultarEspecialidadesComponent {

  constructor(
    private servicio: EspecialidadesService, 
    private toastr: ToastrService,
    private router:Router){}

  ngOnInit(): void {
    this.servicio.obtenerEspecialidad().subscribe((response) => {
      this.tarjetasEspecialidades = response;
      console.log(this.tarjetasEspecialidades)
    })
    
  }

  tarjetasEspecialidades;

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }


}
