import { Component, OnInit } from '@angular/core';
import { IPaciente } from "../../models/Paciente";

import { ClientesService } from "../../services/clientes.service";
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { ITurno } from 'src/app/models/Turno';
import { TurnoService } from 'src/app/services/turno.service';
import { DisponibilidadHorariaService } from 'src/app/services/disponibilidad-horaria.service';
import { IEspecialista } from 'src/app/models/Especialista';
import { IDisponibilidadHoraria } from 'src/app/models/disponibilidadHoraria';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit{

  constructor(
    private servicePaciente: ClientesService,
    private serviceEspecialista: EspecialistasService,
    private serviceDisponibilidad: DisponibilidadHorariaService,
    private serviceTurno: TurnoService,
    private router:Router,
    private toastr: ToastrService
  ){}

    ngOnInit(): void {
      
      this.servicePaciente.obtenerPacientes().subscribe((response) => {
        this.tarjetasPacientes = response;
        //console.log("Pacientes: " + this.tarjetasPacientes);
      })

      this.serviceEspecialista.obtenerEspecialistas().subscribe((response) => {
        this.tarjetasEspecialistas = response;
        console.log("Especialistas: ")
        console.log(this.tarjetasEspecialistas)
      })

      
      this.serviceDisponibilidad.obtenerDisponibilidad().subscribe((response) => {
        this.tarjetasHorasTurnosDisponibles = response;

        // ---------- Modificaciones ------------

        this.tarjetasHorasTurnosDisponibles.forEach(element => {
          if (element.diaSemana == this.diasSemana[0]) {
            this.disponibilidadLunes.push(element)
          }
          if (element.diaSemana == this.diasSemana[1]) {
            this.disponibilidadMartes.push(element)
          }
          if (element.diaSemana == this.diasSemana[2]) {
            this.disponibilidadMiercoles.push(element)
          }
          if (element.diaSemana == this.diasSemana[3]) {
            this.disponibilidadJueves.push(element)
          }
          if (element.diaSemana == this.diasSemana[4]) {
            this.disponibilidadViernes.push(element)
          }
          if (element.diaSemana == this.diasSemana[5]) {
            this.disponibilidadSabado.push(element)
          }
          if (element.diaSemana == this.diasSemana[6]) {
            this.disponibilidadDomingo.push(element)
          }
        });


        let j = 0
        for (let i = 0; i < this.disponibilidadLunes.length; i++) {
          // Si es 08:00
          if (this.disponibilidadLunes[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadLunes[i]);
            j += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadLunes.length; x++) {
            if (this.disponibilidadLunes[x].horario[0] == this.horarios[j].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadLunes[x]);
              break;
            }  
          }
          if(this.disponibilidadLunes[i].horario[0] != this.horarios[this.horarios.length]){
            j += 1;
          }
        }

        let a = 0
        for (let i = 0; i < this.disponibilidadMartes.length; i++) {
          // Si es 08:00
          if (this.disponibilidadMartes[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadMartes[i]);
            a += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadMartes.length; x++) {
            if (this.disponibilidadMartes[x].horario[0] == this.horarios[a].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadMartes[x]);
              break;
            }  
          }
          if(this.disponibilidadMartes[i].horario[0] != this.horarios[this.horarios.length]){
            a += 1;
          }
        }

        let b = 0
        for (let i = 0; i < this.disponibilidadMiercoles.length; i++) {
          // Si es 08:00
          if (this.disponibilidadMiercoles[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadMiercoles[i]);
            b += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadMiercoles.length; x++) {
            if (this.disponibilidadMiercoles[x].horario[0] == this.horarios[b].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadMiercoles[x]);
              break;
            }  
          }
          if(this.disponibilidadMiercoles[i].horario[0] != this.horarios[this.horarios.length]){
            b += 1;
          }
        }


        let c = 0
        for (let i = 0; i < this.disponibilidadJueves.length; i++) {
          // Si es 08:00
          if (this.disponibilidadJueves[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadJueves[i]);
            c += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadJueves.length; x++) {
            if (this.disponibilidadJueves[x].horario[0] == this.horarios[c].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadJueves[x]);
              break;
            }  
          }
          if(this.disponibilidadJueves[i].horario[0] != this.horarios[this.horarios.length]){
            c += 1;
          }
        }


        let d = 0
        for (let i = 0; i < this.disponibilidadViernes.length; i++) {
          // Si es 08:00
          if (this.disponibilidadViernes[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadViernes[i]);
            d += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadViernes.length; x++) {
            if (this.disponibilidadViernes[x].horario[0] == this.horarios[d].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadViernes[x]);
              break;
            }  
          }
          if(this.disponibilidadViernes[i].horario[0] != this.horarios[this.horarios.length]){
            d += 1;
          }
        }


        let e = 0
        for (let i = 0; i < this.disponibilidadSabado.length; i++) {
          // Si es 08:00
          if (this.disponibilidadSabado[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadSabado[i]);
            e += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadSabado.length; x++) {
            if (this.disponibilidadSabado[x].horario[0] == this.horarios[e].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadSabado[x]);
              break;
            }  
          }
          if(this.disponibilidadSabado[i].horario[0] != this.horarios[this.horarios.length]){
            e += 1;
          }
        }


        let f = 0
        for (let i = 0; i < this.disponibilidadDomingo.length; i++) {
          // Si es 08:00
          if (this.disponibilidadDomingo[i].horario[0] == this.horarios[0].horaInicio) {
            this.dispOrdenada.push(this.disponibilidadDomingo[i]);
            f += 1;
            continue
          }        
          for (let x = 0; x < this.disponibilidadDomingo.length; x++) {
            if (this.disponibilidadDomingo[x].horario[0] == this.horarios[f].horaInicio) {
              this.dispOrdenada.push(this.disponibilidadDomingo[x]);
              break;
            }  
          }
          if(this.disponibilidadDomingo[i].horario[0] != this.horarios[this.horarios.length]){
            f += 1;
          }
        }


        // Mostrar Disponbilidad ordenada:
        //console.log("DISPONIBILIDAD ORDENADA: ")
        //console.log(this.dispOrdenada)
        

        

        
        // ----------  ------------

        this.dispOrdenada.forEach(element => {
          //console.log(element)
          //console.log(element.horario);
          this.horaInicio = element.horario[0];
          this.horaFin = element.horario[1]
          const horaDisponible = this.horaInicio + " - " + this.horaFin;
          const diaSemana = element.diaSemana;
          let disponibilidadHoraria = {diaSemana: diaSemana, horaDisponible: horaDisponible}
          this.horarioDisponible.push(disponibilidadHoraria)
          //console.log(disponibilidadHoraria)
          
        });
      })

      
    }

  tarjetasPacientes: IPaciente[] = [];
  tarjetaPaciente = undefined;

  tarjetasEspecialistas: IEspecialista[] = [];
  tarjetaEspecialista = undefined;
  
  tarjetasHorasTurnosDisponibles : IDisponibilidadHoraria[];
  tarjetaHoraTurno = undefined;
  tarjetaHora = undefined;
  diaSemana = undefined;
  
  tarjetaFinal = {
    diaSemana: "",
    especialista: [],
    horario: [],
    paciente: []
  };
  
  seleccionoTarj1 = false;
  seleccionoTarj2 = false;
  seleccionoTarj3 = false;

  horaInicio = undefined
  horaFin = undefined;
  horarioDisponible = [];

  
  
  disponibilidadXEspecialista = [];
  diasSemana = ["Lunes", "Martes", "Miercoles", 
  "Jueves", "Viernes", "Sabado", "Domingo"];
  disponibilidadLunes = [];
  disponibilidadMartes = [];
  disponibilidadMiercoles = [];
  disponibilidadJueves = [];
  disponibilidadViernes = [];
  disponibilidadSabado = [];
  disponibilidadDomingo = [];
  horarios = [
    {horaInicio:"08:00", orden: 1},
    {horaInicio:"08:30", orden: 2},
    {horaInicio:"09:00", orden: 3},
    {horaInicio:"09:30", orden: 4},
    {horaInicio:"10:00", orden: 5},
    {horaInicio:"10:30", orden: 6},
    {horaInicio:"11:00", orden: 7},
    {horaInicio:"11:30", orden: 8},
    {horaInicio:"12:00", orden: 9},
    {horaInicio:"12:30", orden: 10},
    {horaInicio:"13:00", orden: 11},
    {horaInicio:"13:30", orden: 12},
    {horaInicio:"14:00", orden: 13},
    {horaInicio:"14:30", orden: 14},
    {horaInicio:"15:00", orden: 15},
    {horaInicio:"15:30", orden: 16},
    {horaInicio:"16:00", orden: 17},
    {horaInicio:"16:30", orden: 18},
    {horaInicio:"17:00", orden: 19},
    {horaInicio:"17:30", orden: 20},
    {horaInicio:"18:00", orden: 21},
    {horaInicio:"18:30", orden: 22},
    {horaInicio:"19:00", orden: 23},
    {horaInicio:"19:30", orden: 24},
    {horaInicio:"20:00", orden: 25},
    {horaInicio:"20:30", orden: 26},
    {horaInicio:"21:00", orden: 27},
    {horaInicio:"21:30", orden: 28},
    {horaInicio:"22:00", orden: 29},
    {horaInicio:"22:30", orden: 30},
    {horaInicio:"23:00", orden: 31},
    {horaInicio:"23:30", orden: 32},
    
    
  ]
  elementoAnterior;
  dispOrdenada = [];

  horarioEspecialista = [];
  disponibilidadOrdenadaEspecialista = [];



  selectTarjeta1(tarjetaPaciente){
    this.seleccionoTarj1 = true;
    this.tarjetaPaciente = tarjetaPaciente;
    //console.log(this.tarjetaPaciente)
  }

  selectTarjeta2(tarjetaEspecialista){
    this.seleccionoTarj2 = true;
    this.tarjetaEspecialista = tarjetaEspecialista;
    //console.log(this.tarjetaEspecialista)
    

    let inicio = tarjetaEspecialista.dispHoraria[0];
    let fin = tarjetaEspecialista.dispHoraria[1];
    console.log(inicio)
    console.log(fin)
    let horaInicio = "";
    let horaFin = "";
    

    if (inicio.toString().length < 2) {
      horaInicio = "0" + inicio.toString() + ":00"
    }
    else{
      horaInicio = inicio.toString() + ":00"
    }

    if (fin.toString().length < 2) {
      horaFin = "0" + fin.toString() + ":00"
    }
    else{
      horaFin = fin.toString() + ":00"
    }

    this.horarioEspecialista = [horaInicio, horaFin];
    console.log(this.horarioEspecialista);
    

    for (let i = 0; i < this.dispOrdenada.length; i++) {
      if(this.dispOrdenada[i].horario[0] >= this.horarioEspecialista[0] &&
        this.dispOrdenada[i].horario[1] <= this.horarioEspecialista[1]){
          this.disponibilidadOrdenadaEspecialista.push(this.dispOrdenada[i])
        }
    }
    console.log(this.disponibilidadOrdenadaEspecialista)

  }

  selectTarjeta3(tarjetaHoraTurno){
    this.seleccionoTarj3 = true;
    this.diaSemana = tarjetaHoraTurno.diaSemana;
    this.tarjetaHoraTurno = tarjetaHoraTurno;
    //console.log(this.tarjetaHoraTurno);

    this.tarjetaHora = this.tarjetaHoraTurno.horario[0] + " - " + this.tarjetaHoraTurno.horario[1];

    this.tarjetaFinal = {
      diaSemana: tarjetaHoraTurno.diaSemana,
      especialista: this.tarjetaEspecialista,
      horario: tarjetaHoraTurno.horario,
      paciente: this.tarjetaPaciente
    }

    //console.log(this.tarjetaFinal)
  }

   registrar(){
    
    //console.log(this.tarjetaFinal)

    
    this.serviceTurno.registrar(this.tarjetaFinal)
    .then((response) => {
      //console.log(response);
      this.toastr.success("El turno ha sido registrado con exito", "Turno Registrado");
      this.router.navigate(["/menuPrincipal"]);
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("El Turno no ha sido registrado con exito", "Error")
    }) 

  } 

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }



}
