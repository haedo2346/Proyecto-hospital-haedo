import { Component, OnInit } from '@angular/core';
import { ClientesService } from "../../services/clientes.service";

import { IEspecialista } from 'src/app/models/Especialista';
import { IPaciente } from "../../models/Paciente";
import { IHistorialMedico } from '../../models/historialMedico';

import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialMedicoService } from 'src/app/services/historial-medico.service';

@Component({
  selector: 'consultar-historial-medico',
  templateUrl: './consultar-historial-medico.component.html',
  styleUrls: ['./consultar-historial-medico.component.css']
})
export class ConsultarHistorialMedicoComponent implements OnInit{

  constructor(
    private servicePaciente: ClientesService,
    private serviceHM: HistorialMedicoService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.servicePaciente.obtenerPacientes().subscribe((response) => {
      this.tarjetasPacientes = response;
    })
    this.serviceHM.obtenerHistoriaMedica().subscribe((response) => {
      this.tarjetasHM = response;
    })
  }

  tarjetasPacientes;
  tarjetasHM;

  pacienteSelect;
  HMSelect;

  seleccionoTarj1 = false;

  selectTarjeta1(tarjeta){
    this.seleccionoTarj1 = true;
    this.pacienteSelect = tarjeta;
    
    this.tarjetasHM.forEach(element => {
      if (element.paciente.nombre == tarjeta.nombre 
        && element.paciente.apellido == tarjeta.apellido) {
          this.HMSelect = element        
      }

      
    });
  }

}
