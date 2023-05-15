import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from "../../services/especialidades.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'registrar-especialidad',
  templateUrl: './registrar-especialidad.component.html',
  styleUrls: ['./registrar-especialidad.component.css']
})
export class RegistrarEspecialidadComponent implements OnInit {
  constructor(
    private servicio: EspecialidadesService, 
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router:Router){}

    ngOnInit(): void {
      this.formRegistrar = this.formBuilder.group({
        nombre: [null, [Validators.minLength(1), Validators.required]], 
        descripcion: [null, [Validators.minLength(3), Validators.required]],
      })
    }
  
  formRegistrar: FormGroup;
  submitted = false;

  registrar(){
    const fR = this.formRegistrar.value;
    const fRV = this.formRegistrar;
    console.log(fR);
    const error = document.getElementsByClassName("is-invalid");
    if (error.length > 0 ||
        fRV.controls.nombre.untouched ||
        fRV.controls.descripcion.untouched) {
      alert("Por favor, ingrese los datos...")
      return
    }
    this.servicio.registrar(fR)
    .then((response) => {
      console.log(response);
      this.submitted = true
      this.toastr.success("La especialidad ha sido registrada con exito", "Especialidad Registrado")
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("La Especialidad no ha sido registrado con exito", "Error")
    })
  }

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }

}
