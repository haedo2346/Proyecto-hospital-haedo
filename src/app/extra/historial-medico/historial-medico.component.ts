import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from "../../services/clientes.service";
import { EspecialistasService } from 'src/app/services/especialistas.service';

import { IEspecialista } from 'src/app/models/Especialista';
import { IPaciente } from "../../models/Paciente";
import { IHistorialMedico } from '../../models/historialMedico';

import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialMedicoService } from 'src/app/services/historial-medico.service';



@Component({
  selector: 'historial-medico',
  templateUrl: './historial-medico.component.html',
  styleUrls: ['./historial-medico.component.css']
})
export class HistorialMedicoComponent implements OnInit{
  constructor(
    private servicePaciente: ClientesService,
    private serviceEspecialista: EspecialistasService,
    private serviceHM: HistorialMedicoService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.formRegistrar = this.formBuilder.group({
      especialista: [null, [Validators.minLength(1), Validators.required]], 
      fecha: [null, [Validators.minLength(1), Validators.required]], 
      hora: [null, [Validators.minLength(1), Validators.required]], 
      paciente: [null, [Validators.minLength(1), Validators.required]], 
      grupoSanguineo: [null, [Validators.minLength(1), Validators.required]], 
      genero: [null, [Validators.minLength(1), Validators.required]], 
      estadoCivil: [null, [Validators.minLength(1), Validators.required]], 
      ocupacion: [null, [Validators.minLength(1), Validators.required]], 
      domicilio: [null, [Validators.minLength(1), Validators.required]], 
      localidad: [null, [Validators.minLength(1), Validators.required]], 
      codigoPostal: [null, [Validators.minLength(1), Validators.required]], 
      heredoFamiliares: [null, [Validators.minLength(1), Validators.required]], 
      personales: [null, [Validators.minLength(1), Validators.required]], 
      alergicos: [null, [Validators.minLength(1), Validators.required]], 
      ginecoObstetricos: [null, [Validators.minLength(1), Validators.required]], 
      quirurgicos: [null, [Validators.minLength(1), Validators.required]], 
      motivo: [null, [Validators.minLength(1), Validators.required]], 
      diagnostico: [null, [Validators.minLength(1), Validators.required]], 
      examenFisico: [null, [Validators.minLength(1), Validators.required]], 
      tratamiento: [null, [Validators.minLength(1), Validators.required]], 

      
    })


    this.servicePaciente.obtenerPacientes().subscribe((response) => {
      this.tarjetasPacientes = response;
    })

    this.serviceEspecialista.obtenerEspecialistas().subscribe((response) => {
      this.tarjetasEspecialistas = response;      
    })

    
    


  }

  formRegistrar:FormGroup;
  formulario: IHistorialMedico;
  tarjetasPacientes;
  tarjetasEspecialistas;

  selectTarjetaPaciente;
  selectTarjetaEspecialista;

  seleccionoPaciente = false;
  seleccionoEspecialista = false;

  submitted = false;


  date = new Date();
  fecha = "";
  hora = "";
  


  selectTarjeta1(tarjetaPaciente){
    this.seleccionoPaciente = true;
    this.selectTarjetaPaciente = tarjetaPaciente;
    console.log(this.selectTarjetaPaciente)
  }
  selectTarjeta2(tarjetaEspecialista){
    this.seleccionoEspecialista = true;
    this.selectTarjetaEspecialista = tarjetaEspecialista;
    console.log(this.selectTarjetaEspecialista)

    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();

    let hour = this.date.getHours();
    let minute = this.date.getMinutes();

    let dia = "";
    let mes = "";
    
    let horas = "";
    let minutos = "";

    if (day.toString().length == 1) {
      dia = ("0" + day);
    }
    else{
      dia = day.toString();
    }
    if (month.toString().length == 1) {
      mes = ("0" + month);
    }
    else{
      mes = month.toString()
    }
    
    this.fecha = (dia + "/" + mes + "/" + year).toString();
    

    if (hour.toString().length == 1) {
      horas = ("0" + hour);
    }
    else{
      horas = hour.toString();
    }
    if (minute.toString().length == 1) {
      minutos = ("0" + minute);
    }
    else{
      minutos = minute.toString()
    }

    this.hora = (horas + ":" + minutos).toString();
  }

  registrar(){
    let f = this.formRegistrar;
    let fv = f.value;


    
    
    this.formulario = {
      especialista: this.selectTarjetaEspecialista,
      paciente: this.selectTarjetaPaciente,
      fecha: this.fecha,
      hora: this.hora,
      grupoSanguineo: fv.grupoSanguineo,
      genero: fv.genero,
      estadoCivil: fv.estadoCivil,
      ocupacion: fv.ocupacion,
      domicilio: fv.domicilio,
      localidad: fv.localidad,
      codigoPostal: fv.codigoPostal,
      heredoFamiliares: fv.heredoFamiliares,
      personales: fv.personales,
      alergicos: fv.alergicos,
      ginecoObstetricos: fv.ginecoObstetricos,
      quirurgicos: fv.quirurgicos,
      motivo: fv.motivo,
      diagnostico: fv.diagnostico,
      examenFisico: fv.examenFisico,
      tratamiento: fv.tratamiento
    }

    console.log(this.formulario)

    const error = document.getElementsByClassName("is-invalid")
    if (error.length > 0 || 
        f.controls.grupoSanguineo.untouched ||
        f.controls.genero.untouched ||
        f.controls.estadoCivil.untouched ||
        f.controls.ocupacion.untouched ||
        f.controls.domicilio.untouched ||
        f.controls.localidad.untouched ||
        f.controls.codigoPostal.untouched) 
        {
      alert("Por favor, ingrese los datos...")
      return
    }

    this.serviceHM.registrar(this.formulario)
    .then((response) => {
      console.log(response);
      this.submitted = true
      this.toastr.success("El historial medico ha sido registrado con exito", "Historial medico Registrado")
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("El historial medico no ha sido registrado con exito", "Error")
    }) 
    

  }

  volver(){
    this.seleccionoEspecialista = false;
    this.seleccionoPaciente = false;
  }

  atras(){
    this.router.navigate(["/menuPrincipal"])
  }

}
