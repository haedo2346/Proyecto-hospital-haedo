import { Component, OnInit } from '@angular/core';
import { ClientesService } from "../../services/clientes.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent {
  constructor(
    private servicio: ClientesService, 
    public formBuilder: FormBuilder,
    private router:Router,
    private toastr: ToastrService){}
  
  formRegistrar: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.formRegistrar = this.formBuilder.group({
      nombre: [null, [Validators.minLength(1), Validators.required]], 
      apellido: [null, [Validators.minLength(1), Validators.required]],
      nroDoc: [0, [Validators.minLength(8), Validators.required]],
      email: [null, [Validators.minLength(11), Validators.required]],
      tel: [0, [Validators.minLength(10), Validators.required]],
    })
  }
  

  registrar(){
    const fR = this.formRegistrar.value;
    const fRV = this.formRegistrar;
    console.log(fR);
    const error = document.getElementsByClassName("is-invalid")

    if (error.length > 0 || 
        fRV.controls.nombre.untouched ||
        fRV.controls.apellido.untouched ||
        fRV.controls.nroDoc.untouched ||
        fRV.controls.email.untouched ||
        fRV.controls.tel.untouched) 
        {
      alert("Por favor, ingrese los datos...")
      return
    }
    this.servicio.registrar(fR)
    .then((response) => {
      console.log(response);
      this.submitted = true
      this.toastr.success("El Paciente ha sido registrado con exito", "Paciente Registrado")
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("El Paciente no ha sido registrado con exito", "Error")
    })
  }

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }

}
