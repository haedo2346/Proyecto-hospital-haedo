import { Component, OnInit } from '@angular/core';

import { ClientesService } from "../../services/clientes.service";
import { EspecialidadesService } from "../../services/especialidades.service";
import { EspecialistasService } from "../../services/especialistas.service";
import { TurnoService } from 'src/app/services/turno.service';

import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { CobrosService } from 'src/app/services/cobros.service';
import { ITurno } from 'src/app/models/Turno';

@Component({
  selector: 'agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  
  constructor(
    public formBuilder: FormBuilder,
    private servicioTurno: TurnoService,
    private servicioCobro: CobrosService,
    private router:Router,
    private toastr: ToastrService){}

    ngOnInit(): void {
      this.servicioTurno.obtenerTurno().subscribe((response) => {
        this.turnos = response;

        this.turnos.forEach(element => {
          console.log(element)
        });

        

       for (let i = 0; i < 7; i++) {
        this.todasCeldasPosibles.push(
          [ 0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0
          ])
       }

       console.log(this.todasCeldasPosibles)
       
       for (let i = 0; i < document.getElementsByClassName("hora1").length; i++) {
         this.todasHorasPosibles.push(document.getElementsByClassName("hora1")[i].innerHTML);
       }
       

       // --------------- TURNOS DE LOS LUNES  ---------------------------        
        this.turnos.forEach(element => {
           if (element.diaSemana == "Lunes") { this.turnosLunes.push(element) };
           if (element.diaSemana == "Martes") { this.turnosMartes.push(element) };
           if (element.diaSemana == "Miercoles") { this.turnosMiercoles.push(element) };
           if (element.diaSemana == "Jueves") { this.turnosJueves.push(element) };
           if (element.diaSemana == "Viernes") { this.turnosViernes.push(element) };
           if (element.diaSemana == "Sabado") { this.turnosSabado.push(element) };
           if (element.diaSemana == "Domingo") { this.turnosDomingo.push(element) };
          });
         
 
         for (let i = 0; i < this.turnosLunes.length; i++) {
           this.horario = this.turnosLunes[i].horario;
           this.horarioInicial = this.horario[0].toString();
           this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
           this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
           this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
 
           this.horarioFinal = this.horario[1].toString();
           this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
           this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
           this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
 
           this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
           
 
           for (let j = 0; j < this.todasHorasPosibles.length; j++) {
             if (this.todasHorasPosibles[j] == this.tiempo) {
               this.todasCeldasPosibles[0][j] += 1;
               
             }}
           }

           for (let i = 0; i < this.turnosMartes.length; i++) {
            this.horario = this.turnosMartes[i].horario;
            this.horarioInicial = this.horario[0].toString();
            this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
            this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
            this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
  
            this.horarioFinal = this.horario[1].toString();
            this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
            this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
            this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
  
            this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
  
            for (let j = 0; j < this.todasHorasPosibles.length; j++) {
              if (this.todasHorasPosibles[j] == this.tiempo) {
                this.todasCeldasPosibles[1][j] += 1;
                
              }}
            }

            for (let i = 0; i < this.turnosMiercoles.length; i++) {
              this.horario = this.turnosMiercoles[i].horario;
              this.horarioInicial = this.horario[0].toString();
              this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
              this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
              this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
    
              this.horarioFinal = this.horario[1].toString();
              this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
              this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
              this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
    
              this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
    
              for (let j = 0; j < this.todasHorasPosibles.length; j++) {
                if (this.todasHorasPosibles[j] == this.tiempo) {
                  this.todasCeldasPosibles[2][j] += 1;
                  
                }}
              }

            for (let i = 0; i < this.turnosJueves.length; i++) {
              this.horario = this.turnosJueves[i].horario;
              this.horarioInicial = this.horario[0].toString();
              this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
              this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
              this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
    
              this.horarioFinal = this.horario[1].toString();
              this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
              this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
              this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
    
              this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
    
              for (let j = 0; j < this.todasHorasPosibles.length; j++) {
                if (this.todasHorasPosibles[j] == this.tiempo) {
                  this.todasCeldasPosibles[3][j] += 1;
                  
                }}
              }

            for (let i = 0; i < this.turnosViernes.length; i++) {
              this.horario = this.turnosViernes[i].horario;
              this.horarioInicial = this.horario[0].toString();
              this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
              this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
              this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
    
              this.horarioFinal = this.horario[1].toString();
              this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
              this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
              this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
    
              this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
    
              for (let j = 0; j < this.todasHorasPosibles.length; j++) {
                if (this.todasHorasPosibles[j] == this.tiempo) {
                  this.todasCeldasPosibles[4][j] += 1;
                  
                }}
              }

            for (let i = 0; i < this.turnosSabado.length; i++) {
              this.horario = this.turnosSabado[i].horario;
              this.horarioInicial = this.horario[0].toString();
              this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
              this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
              this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
    
              this.horarioFinal = this.horario[1].toString();
              this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
              this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
              this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
    
              this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
    
              for (let j = 0; j < this.todasHorasPosibles.length; j++) {
                if (this.todasHorasPosibles[j] == this.tiempo) {
                  this.todasCeldasPosibles[5][j] += 1;
                  
                }}
              }
              
              for (let i = 0; i < this.turnosDomingo.length; i++) {
              this.horario = this.turnosDomingo[i].horario;
              this.horarioInicial = this.horario[0].toString();
              this.horaInicio = this.horarioInicial[0] + this.horarioInicial[1];
              this.minutoInicio = this.horarioInicial[3] + this.horarioInicial[4];
              this.tiempoInicio = this.horaInicio + ":" +  this.minutoInicio
    
              this.horarioFinal = this.horario[1].toString();
              this.horaFin = this.horarioFinal[0] + this.horarioFinal[1];
              this.minutoFin = this.horarioFinal[3] + this.horarioFinal[4];
              this.tiempoFin = this.horaFin + ":" +  this.minutoFin;
    
              this.tiempo = this.tiempoInicio + " - " + this.tiempoFin;
    
              for (let j = 0; j < this.todasHorasPosibles.length; j++) {
                if (this.todasHorasPosibles[j] == this.tiempo) {
                  this.todasCeldasPosibles[6][j] += 1;
                  
                }
              
              
              }
              }
      }
      )
     
    }

  turnos = [];

  horario = undefined;
  horarioInicial = undefined;
  horarioFinal = undefined;
  horaInicio = undefined;
  minutoInicio = undefined
  horaFin = undefined;
  minutoFin = undefined;
  tiempoInicio = undefined;
  tiempoFin = undefined;
  tiempo = undefined;


  turnosLunes = [];
  turnosMartes = [];
  turnosMiercoles = [];
  turnosJueves = [];
  turnosViernes = [];
  turnosSabado = [];
  turnosDomingo = [];

  
  // Grillita
  todasCeldasPosibles = [];
  todasHorasPosibles = [];
  
  volver(){
    this.router.navigate(["/menuPrincipal"])
  }

  visTurno = false;
  turnosAVisualizar = [];
  cantTurnos = 0;

  visualizarTurnos(columna, fila){
    let dia;
    this.visTurno = true;

    switch (columna) {
      case 0:
        dia = "Lunes"
        break;
      case 1:
        dia = "Martes"
        break;

      case 2:
        dia = "Miercoles"
        break;

      case 3:
        dia = "Jueves"
        break;
    
      case 4:
        dia = "Viernes"
        break;

      case 5:
        dia = "Sabado"
        break;
      
      case 6:
        dia = "Domingo"
        break;

      default:
        dia = ""
        break;
    }
    
    let hora = this.todasHorasPosibles[fila];
    
    //-----------------------------------------

    this.turnos.forEach(turno => {
      let horaTurno = turno.horario[0] + " - " + turno.horario[1]
      if (horaTurno == hora && dia == turno.diaSemana) {
        this.turnosAVisualizar.push(turno)
      }
    });
      
  }

  atras(){
    this.visTurno = false;
  }
    


  turnoSeleccionado:ITurno;
  seleccionoTarjetaTurno = false;
  seleccionoFP = false;
  formaPago = "";
  monto = 0;

  seleccionoTurno(turno){
    this.seleccionoTarjetaTurno = true;
    this.turnoSeleccionado = turno;
    console.log(turno)
  }

  seleccionoFormaPago(formaPago){
    this.seleccionoFP = true
    this.formaPago = formaPago;
    console.log(formaPago)
  }

  seleccionoMonto(monto){
    this.monto = monto;
    console.log(monto)
    if(monto.length == 0){
      alert("Por Favor, ingrese un monto")
      return;
    }
    let date = new Date();
    let horario = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    let cobro = {
      fecha: horario,
      especialidad: this.turnoSeleccionado.especialista.especialidad,
      paciente: this.turnoSeleccionado.paciente.nombre + " " + this.turnoSeleccionado.paciente.apellido,
      formaPago: this.formaPago,
      monto: monto
    }
    console.log(cobro)

     this.servicioCobro.registrar(cobro)
      .then((response) => {
        console.log(response);
        this.toastr.success("El Cobro ha sido registrado con exito", "Cobro Registrado");
      }
    )
      .catch((error) => {
        console.log(error);
        this.toastr.error("El Cobro no ha sido registrado con exito", "Error")
      })
  }

}
    