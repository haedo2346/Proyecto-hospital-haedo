import { Component, OnInit } from '@angular/core';
import { EspecialistasService } from "../../services/especialistas.service";
import { EspecialidadesService } from "../../services/especialidades.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";


import { ToastrService } from "ngx-toastr";
import { IEspecialidad } from 'src/app/models/Especialidad';
import { IEspecialista } from 'src/app/models/Especialista';


@Component({
  selector: 'registrar-especialista',
  templateUrl: './registrar-especialista.component.html',
  styleUrls: ['./registrar-especialista.component.css']
})
export class RegistrarEspecialistaComponent implements OnInit{
  
  constructor(
    private servicioEspecialista: EspecialistasService, 
    private servicioEspecialidades: EspecialidadesService,
    public formBuilder: FormBuilder,
    private router:Router,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.formRegistrar = this.formBuilder.group({
      nombre: [null, [Validators.minLength(1), Validators.required]], 
      apellido: [null, [Validators.minLength(1), Validators.required]],
      especialidad: [Validators.minLength(1), Validators.required],
      nroLegajo: [null, [Validators.minLength(1), Validators.required]],
      nroTel: [null, [Validators.minLength(10), Validators.required]],
      nroDoc: [null, [Validators.minLength(8), Validators.required]],
      dispHoraria: [0, 0],
      horarioInicio: [0],
      horarioFin: [0]
    })

    this.servicioEspecialidades.obtenerEspecialidad().subscribe((res) => {
      (res.forEach(element => {
        this.especialidades.push(element.nombre)
      }))
    })
    
    console.log(this.especialidades)
    
  }
  
  formRegistrar: FormGroup;
  submitted = false;
  especialidades = [""];
  formulario;
  disponibilidadHoraria = [];
  especialidad = "";

  // Especialidad
  onSelected(event:any){
    this.especialidad = event.target.value; 
  }


  registrar(){
    const formR = this.formRegistrar;
    const fR = this.formRegistrar.value;

    const Inicio = fR.horarioInicio;
    const Fin = fR.horarioFin;
    this.disponibilidadHoraria = [Inicio, Fin]


     this.formulario = {
      nombre: fR.nombre, 
      apellido: fR.apellido,
      especialidad: this.especialidad,
      nroDoc: fR.nroDoc,
      nroLegajo: fR.nroLegajo,
      nroTel: fR.nroTel,
      dispHoraria: this.disponibilidadHoraria}; 

    const formulario = this.formulario;

    console.log(formulario);

    const error = document.getElementsByClassName("is-invalid")
    if (error.length > 0 || 
        formR.controls.nombre.untouched ||
        formR.controls.apellido.untouched ||
        formR.controls.nroDoc.untouched ||
        formR.controls.nroLegajo.untouched ||
        formR.controls.nroTel.untouched) {
      alert("Por favor, ingrese los datos...")
      return
    }
    if (this.disponibilidadHoraria.includes(0)) {
      alert("Por favor, ingrese el horario laboral disponible ")
      return
    }
    this.servicioEspecialista.registrar(formulario)
    .then((response) => {
      console.log(response);
      this.submitted = true
      this.toastr.success("El Especialista ha sido registrado con exito", "Especialista Registrado")
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("El Especialista no ha sido registrado con exito", "Error")
    }) 

  } 

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }




}
