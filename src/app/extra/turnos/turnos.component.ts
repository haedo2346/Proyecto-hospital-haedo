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


  cantDiasEneroAnt;
  cantDiasFebreroAnt;
  cantDiasMarzoAnt;
  cantDiasAbrilAnt; 
  cantDiasMayoAnt;
  cantDiasJunioAnt;
  cantDiasJulioAnt;
  cantDiasAgostoAnt;
  cantDiasSeptiembreAnt;
  cantDiasOctubreAnt;
  cantDiasNoviembreAnt;
  cantDiasDiciembreAnt;
  
  cantDiasEnero;
  cantDiasFebrero;
  cantDiasMarzo;
  cantDiasAbril; 
  cantDiasMayo;
  cantDiasJunio;
  cantDiasJulio;
  cantDiasAgosto;
  cantDiasSeptiembre;
  cantDiasOctubre;
  cantDiasNoviembre;
  cantDiasDiciembre;
  
  
  cantDiasEneroSig;
  cantDiasFebreroSig;
  cantDiasMarzoSig;
  cantDiasAbrilSig; 
  cantDiasMayoSig;
  cantDiasJunioSig;
  cantDiasJulioSig;
  cantDiasAgostoSig;
  cantDiasSeptiembreSig;
  cantDiasOctubreSig;
  cantDiasNoviembreSig;
  cantDiasDiciembreSig;
  



  obtenerNroi(dia, nroMes){
    let rtado = 0;
    let j = 0
      j += 1 
      if (nroMes == 1) {
        rtado = dia;
      }
      else if (nroMes == 2) {
        rtado = this.cantDiasEnero + dia;
      }
      else if (nroMes == 3) {
        rtado = this.cantDiasEnero
                this.cantDiasFebrero + dia;
      }
      else if (nroMes == 4) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + dia;
      }
      else if (nroMes == 5) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + dia;
      }
      else if (nroMes == 6) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                dia;
      }
      else if (nroMes == 7) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                this.cantDiasJunio + 
                dia;
      }
      else if (nroMes == 8) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                this.cantDiasJunio + 
                this.cantDiasJulio +
                dia;
      }
      else if (nroMes == 9) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                this.cantDiasJunio + 
                this.cantDiasJulio +
                this.cantDiasAgosto +
                dia;
      }
      else if (nroMes == 10) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                this.cantDiasJunio + 
                this.cantDiasJulio +
                this.cantDiasAgosto +
                this.cantDiasSeptiembre +
                dia;
      }
      else if (nroMes == 11) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                this.cantDiasJunio + 
                this.cantDiasJulio +
                this.cantDiasAgosto +
                this.cantDiasSeptiembre +
                this.cantDiasOctubre +
                dia;
      }
      else if (nroMes == 12) {
        rtado = this.cantDiasEnero +
                this.cantDiasFebrero +
                this.cantDiasMarzo + 
                this.cantDiasAbril + 
                this.cantDiasMayo +
                this.cantDiasJunio + 
                this.cantDiasJulio +
                this.cantDiasAgosto +
                this.cantDiasSeptiembre +
                this.cantDiasOctubre +
                this.cantDiasNoviembre +
                dia;
      }
      else{
        rtado = 0}
      return rtado - 1
  }
  
  obtenerDia(i){
    
    let rtado = 0
  
    // Enero
    if(i > 0 && i <= this.cantDiasEnero){
  
      rtado = i;
      return rtado;
    }
  
    // Febrero
    if(i > this.cantDiasEnero
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero  )){
  
      rtado = i - this.cantDiasEnero;
      return rtado
    }
  
    // Marzo
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo )){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero;
      return rtado
    }
  
    // Abril
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo;
      return rtado
    }
  
    // Mayo
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril;
      return rtado
    }
  
    // Junio
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo +
            this.cantDiasJunio)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo;
      return rtado
    }
  
    // Julio
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo +
              this.cantDiasJunio)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo +
            this.cantDiasJunio +
            this.cantDiasJulio)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo -
                  this.cantDiasJunio;
      return rtado
    }
  
    // Agosto
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo +
            this.cantDiasJunio +
            this.cantDiasJulio +
            this.cantDiasAgosto)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo -
                  this.cantDiasJunio -
                  this.cantDiasJulio;
      return rtado
    }
  
    // Septiembre
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo +
            this.cantDiasJunio +
            this.cantDiasJulio +
            this.cantDiasAgosto +
            this.cantDiasSeptiembre)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo -
                  this.cantDiasJunio -
                  this.cantDiasJulio -
                  this.cantDiasAgosto;
      return rtado
    }
  
    // Octubre
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre)
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo +
            this.cantDiasJunio +
            this.cantDiasJulio +
            this.cantDiasAgosto +
            this.cantDiasSeptiembre +
            this.cantDiasOctubre)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo -
                  this.cantDiasJunio -
                  this.cantDiasJulio -
                  this.cantDiasAgosto -
                  this.cantDiasSeptiembre;
      return rtado
    }
  
    // Noviembre
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre )
      &&
      i <= ( this.cantDiasEnero +
            this.cantDiasFebrero +
            this.cantDiasMarzo +
            this.cantDiasAbril +
            this.cantDiasMayo +
            this.cantDiasJunio +
            this.cantDiasJulio +
            this.cantDiasAgosto +
            this.cantDiasSeptiembre +
            this.cantDiasOctubre +
            this.cantDiasNoviembre)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo -
                  this.cantDiasJunio -
                  this.cantDiasJulio -
                  this.cantDiasAgosto -
                  this.cantDiasSeptiembre -
                  this.cantDiasOctubre;
      return rtado
    }
  
    // Diciembre
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril + 
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre +
              this.cantDiasNoviembre)
      &&
      i <= ( this.cantDiasEnero +
        this.cantDiasFebrero +
        this.cantDiasMarzo +
        this.cantDiasAbril +
        this.cantDiasMayo +
        this.cantDiasJunio +
        this.cantDiasJulio +
        this.cantDiasAgosto +
        this.cantDiasSeptiembre +
        this.cantDiasOctubre +
        this.cantDiasNoviembre +
        this.cantDiasDiciembre)){
  
      rtado = i - this.cantDiasEnero - 
                  this.cantDiasFebrero -
                  this.cantDiasMarzo - 
                  this.cantDiasAbril -
                  this.cantDiasMayo -
                  this.cantDiasJunio -
                  this.cantDiasJulio -
                  this.cantDiasAgosto -
                  this.cantDiasSeptiembre -
                  this.cantDiasOctubre -
                  this.cantDiasNoviembre;
      return rtado
    }
    
    return "error"
  }
  
  obtenerDiasEnMes(year, month){
    return new Date(year, month, 0).getDate()
  }
  
  obtenerSemana(dia){
    dia = Number(dia)
     let semana = 0
    if (dia >= 1 && dia <= 7) {
      semana = 1
      return semana
    }
    if (dia >= 8 && dia <= 14) {
      semana = 2
      return semana
    }
    if (dia >= 15 && dia <= 21) {
      semana = 3
      return semana
    }
    if (dia >= 22 && dia <= 28) {
      semana = 4
      return semana
    }
    if (dia >= 29 && dia <= 31) {
      semana = 5
      return semana
    }
  
    return "Error"
  
  }
  
  obtenerNroSemana2(d){
    // fecha: "2023-01-15"
    var get = d;
    var currentDate = new Date(get);
    var year =  new Date(currentDate.getFullYear(), 0, 1);
    var days =  Math.floor((Number(currentDate) - Number(year)) / (24 * 60 * 60 * 1000));
    var week = Math.ceil(( currentDate.getDay() + 1 + days) / 7);
    return week;
    }
  
  obtenerMes(i){
    if(i < 1){return "Error"}
  
    if(i >= 1 
      && 
      i <=    this.cantDiasEnero )
    {return "Enero"}
  
    if(i >    this.cantDiasEnero 
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero
              ) )
    {return "Febrero"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero)
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo 
              ) )
    {return "Marzo"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo )
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril 
              ) )
    {return "Abril"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril )
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo 
              ) )
    {return "Mayo"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo )
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio
              ) )
    {return "Junio"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio)
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio 
              ) )
    {return "Julio"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio)
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo + 
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto
              ) )
    {return "Agosto"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto)
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo + 
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre
              ) )
    {return "Septiembre"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre
              )
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo + 
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre
              ) )
    {return "Octubre"}
  
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre
              )
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo + 
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre +
              this.cantDiasNoviembre
              ) )
    {return "Noviembre"}
    
    if(i > (  this.cantDiasEnero +
              this.cantDiasFebrero + 
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo +
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre +
              this.cantDiasNoviembre
              )
      && 
      i <= (  this.cantDiasEnero + 
              this.cantDiasFebrero +
              this.cantDiasMarzo +
              this.cantDiasAbril +
              this.cantDiasMayo + 
              this.cantDiasJunio +
              this.cantDiasJulio +
              this.cantDiasAgosto +
              this.cantDiasSeptiembre +
              this.cantDiasOctubre +
              this.cantDiasNoviembre +
              this.cantDiasDiciembre
              ) )
    {return "Diciembre"}
  
    if(i > 365){ return "Error"}
  
      return "Error";
  }
  obtenerNroMes(mes){
    if (mes == "Enero") {
      return 1
    }
    if (mes == "Febrero") {
      return 2
    }
    if (mes == "Marzo") {
      return 3
    }
    if (mes == "Abril") {
      return 4
    }
    if (mes == "Mayo") {
      return 5
    }
    if (mes == "Junio") {
      return 6
    }
    if (mes == "Julio") {
      return 7
    }
    if (mes == "Agosto") {
      return 8
    }
    if (mes == "Septiembre") {
      return 9
    }
    if (mes == "Octubre") {
      return 10
    }
    if (mes == "Noviembre") {
      return 11
    }
    if (mes == "Diciembre") {
      return 12
    }
  
    return "Error"
  }
  
  // Cambiar aca luego de que pase el 2023
  obtenerDiaDeSemana(dia, mes, diaAnterior){
    let diaDeSemana;
    dia = Number(dia);
    mes = Number(mes);
    if(dia.length == 1){
      dia = "0" + dia
    }
    if(mes.length == 1){
      mes = "0" + mes
    }
    let year = new Date().getFullYear();
    let fecha = new Date(year + "-" + mes + "-" +  dia); // Cambiar ************************************?????????????????????????
    diaDeSemana = fecha.getDay()
    
    if (diaDeSemana == diaAnterior) {
      diaDeSemana += 1
    }
    
  
    switch (diaDeSemana) {
      case 0:
        diaDeSemana = "Domingo"
        break;
      case 1:
        diaDeSemana = "Lunes"
        break;
      case 2:
        diaDeSemana = "Martes"
        break;
      case 3:
        diaDeSemana = "Miercoles"
        break;
      case 4:
        diaDeSemana = "Jueves"
        break;
      case 5:
        diaDeSemana = "Viernes"
        break;
      case 6:
        diaDeSemana = "Sabado"
        break;
  
      default:
        diaDeSemana = "Error obtenerdiadesemana"
        break;
    }
  
    return diaDeSemana;
  
  
    
    
  }

  obtenerAgenda(){
    // Horarios son 30 celdas
    // La semana tiene 7 dias
    // El año tiene 52.1 semanas
  
    let date = new Date();
    
    let yearActual = date.getFullYear();
    let monthActual = date.getMonth() + 1;
    let cantDiasMesActual = this.obtenerDiasEnMes(yearActual, monthActual)
    this.cantDiasEnero = this.obtenerDiasEnMes(yearActual, 1);
    this.cantDiasFebrero = this.obtenerDiasEnMes(yearActual, 2);
    this.cantDiasMarzo = this.obtenerDiasEnMes(yearActual, 3);
    this.cantDiasAbril = this.obtenerDiasEnMes(yearActual, 4);
    this.cantDiasMayo = this.obtenerDiasEnMes(yearActual, 5);
    this.cantDiasJunio = this.obtenerDiasEnMes(yearActual, 6);
    this.cantDiasJulio = this.obtenerDiasEnMes(yearActual, 7);
    this.cantDiasAgosto = this.obtenerDiasEnMes(yearActual, 8);
    this.cantDiasSeptiembre = this.obtenerDiasEnMes(yearActual, 9);
    this.cantDiasOctubre = this.obtenerDiasEnMes(yearActual, 10);
    this.cantDiasNoviembre = this.obtenerDiasEnMes(yearActual, 11);
    this.cantDiasDiciembre = this.obtenerDiasEnMes(yearActual, 12);
    
    
      
  
    let celdasYear = [];
  
    
    let anterior = -1;
    let actual;
    for (let i = 1; i <= 365; i++) {
      let dia = Number(this.obtenerDia(i));
      let nombreMes = this.obtenerMes(i);
      let mes = this.obtenerNroMes(nombreMes);
      let diaSemana = this.obtenerDiaDeSemana(dia, mes, anterior);
      actual = diaSemana
  
      let year = new Date().getFullYear()
      let fecha = "" + year + "-" + mes + "-" + dia + "" 
      let nroSemana = this.obtenerNroSemana2(fecha);
  
      let semana = this.obtenerSemana(dia);
  
      if(anterior == actual)
      {
        if (actual == "Lunes") {
          diaSemana = "Martes"   
        }
        else if(actual == "Martes"){
          diaSemana = "Miercoles"
        }
        else if(actual == "Miercoles"){
          diaSemana = "Jueves"
        }
        else if(actual == "Jueves"){
          diaSemana = "Viernes"
        }
        else if(actual == "Viernes"){
          diaSemana = "Sabado"
        }
        else if(actual == "Sabado"){
          diaSemana = "Domingo"
        }
        else if(actual == "Domingo"){
          diaSemana = "Lunes"
        }
        else{
          diaSemana = "ERROR en anterior = actual"
        }
      }
      
      celdasYear.push(
        { nroDia: i,
          dia: dia, // Listo
          mes: mes,
          nombreMes: nombreMes, // Listo
          diaSemana: diaSemana, // Listo
          nroSemana: nroSemana,
          semana: semana, //listo
          year: year,
          
          horarios: [  0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,
                      0,0          ]
                    
          
          })
  
  
          
      anterior = diaSemana
      }
      
      this.celdasYear = celdasYear;
  
  
    }

  mostrarCeldasTabla(date){

    let year = date[6] + date[7] + date[8] + date[9] 
    let mes = date[3] + date[4]
    let dia = date[0] + date[1]

    let allYear = this.celdasYear;


    for (let i = 0; i < allYear.length; i++) {
      if (allYear[i].mes == mes) {
        this.esteNroMes = mes;
        break
      }
    }

    for (let i = 0; i < allYear.length; i++) {
      if (allYear[i].dia == dia) {
        this.esteDia = dia;
        break
      }
    }

    let fecha = "" + year + "-" + mes + "-" + dia + "" 
    this.estaSemana = this.obtenerSemana(this.esteDia)
    this.esteNroSemana = this.obtenerNroSemana2(fecha)

    let semanas = [];
    let semana = []
    let x = 0;

    for (let i = 0; i < 1; i++) {
      
      if(allYear[i].nroSemana == 1){
        let z = false

        if(semana.length == 0){
          
          for (let j = 0; j < 7; j++) {
            if (allYear[j].diaSemana == "Lunes" && z == false) {
              semana.push(allYear[j]);
              z = true;
              x += 1;
              i += 2
            }
          }
        }

    }

    for (let i = x + 1; i <= 364; i++) {
      
      semana.push(allYear[i]);
      x += 1;
      
      if(x == 7 && allYear[i].diaSemana == "Domingo"){
        semanas.push(semana)
        semana = []
        x = 0
      }
      

      
      }
    
      
      
    }
    this.semanas = semanas;

  }
    
  // Variables a mostrar ------------
  celdasYear;
  i;
  esteNroMes;
  estaSemana;
  esteNroSemana;
  esteDia;
  nroDeDiaSemana;
  diaDeSemanaActual = "";

  diaSeleccionado = 0;

  mostrarSemana = [];                 //********************************** */

  semanas = [];
  //-------------



mostrarGrillaSemActual = [];

mostrarGrillaSemanaActual(){
  let mostrarGrillaSemActual = [];
  let mostrar = [];
  

  for (let i = 0; i < this.mostrarSemana.length; i++) {
    
    for (let j = 0; j < this.mostrarSemana[i].horarios.length; j++) {
      mostrar.push(this.mostrarSemana[i].horarios[j]) 
    }
    
    mostrarGrillaSemActual.push(mostrar)
    mostrar = []
  }
  
  this.mostrarGrillaSemActual = mostrarGrillaSemActual;
  

  
}





verificarMes(dia, mes, condicion){
  let date = new Date();
  
  let yearActual = date.getFullYear();
  let monthActual = date.getMonth() + 1;
  let cantDiasMesActual = this.obtenerDiasEnMes(yearActual, monthActual)
  this.cantDiasEnero = this.obtenerDiasEnMes(yearActual, 1);
  this.cantDiasFebrero = this.obtenerDiasEnMes(yearActual, 2);
  this.cantDiasMarzo = this.obtenerDiasEnMes(yearActual, 3);
  this.cantDiasAbril = this.obtenerDiasEnMes(yearActual, 4);
  this.cantDiasMayo = this.obtenerDiasEnMes(yearActual, 5);
  this.cantDiasJunio = this.obtenerDiasEnMes(yearActual, 6);
  this.cantDiasJulio = this.obtenerDiasEnMes(yearActual, 7);
  this.cantDiasAgosto = this.obtenerDiasEnMes(yearActual, 8);
  this.cantDiasSeptiembre = this.obtenerDiasEnMes(yearActual, 9);
  this.cantDiasOctubre = this.obtenerDiasEnMes(yearActual, 10);
  this.cantDiasNoviembre = this.obtenerDiasEnMes(yearActual, 11);
  this.cantDiasDiciembre = this.obtenerDiasEnMes(yearActual, 12);

  let yearSig = date.getFullYear() + 1;
  
  this.cantDiasEneroSig = this.obtenerDiasEnMes(yearSig, 1);
  this.cantDiasFebreroSig = this.obtenerDiasEnMes(yearSig, 2);
  this.cantDiasMarzoSig = this.obtenerDiasEnMes(yearSig, 3);
  this.cantDiasAbrilSig = this.obtenerDiasEnMes(yearSig, 4);
  this.cantDiasMayoSig = this.obtenerDiasEnMes(yearSig, 5);
  this.cantDiasJunioSig = this.obtenerDiasEnMes(yearSig, 6);
  this.cantDiasJulioSig = this.obtenerDiasEnMes(yearSig, 7);
  this.cantDiasAgostoSig = this.obtenerDiasEnMes(yearSig, 8);
  this.cantDiasSeptiembreSig = this.obtenerDiasEnMes(yearSig, 9);
  this.cantDiasOctubreSig = this.obtenerDiasEnMes(yearSig, 10);
  this.cantDiasNoviembreSig = this.obtenerDiasEnMes(yearSig, 11);
  this.cantDiasDiciembreSig = this.obtenerDiasEnMes(yearSig, 12);

  let yearAnt = date.getFullYear() - 1;
  
  this.cantDiasEneroAnt = this.obtenerDiasEnMes(yearAnt, 1);
  this.cantDiasFebreroAnt = this.obtenerDiasEnMes(yearAnt, 2);
  this.cantDiasMarzoAnt = this.obtenerDiasEnMes(yearAnt, 3);
  this.cantDiasAbrilAnt = this.obtenerDiasEnMes(yearAnt, 4);
  this.cantDiasMayoAnt = this.obtenerDiasEnMes(yearAnt, 5);
  this.cantDiasJunioAnt = this.obtenerDiasEnMes(yearAnt, 6);
  this.cantDiasJulioAnt = this.obtenerDiasEnMes(yearAnt, 7);
  this.cantDiasAgostoAnt = this.obtenerDiasEnMes(yearAnt, 8);
  this.cantDiasSeptiembreAnt = this.obtenerDiasEnMes(yearAnt, 9);
  this.cantDiasOctubreAnt = this.obtenerDiasEnMes(yearAnt, 10);
  this.cantDiasNoviembreAnt = this.obtenerDiasEnMes(yearAnt, 11);
  this.cantDiasDiciembreAnt = this.obtenerDiasEnMes(yearAnt, 12);

  if(condicion == 1)
  {
    if (mes == 1) {
      if(dia > this.cantDiasEnero)
      {
        dia = dia - this.cantDiasEnero;
        mes = 2;    
      }
      return [dia, mes];
    }
    if (mes == 2) {
      if(dia > this.cantDiasFebrero)
      {
        dia = dia - this.cantDiasFebrero;
        mes = 3;
      }
      return [dia, mes]
    }

    if (mes == 3) {
      if(dia > this.cantDiasMarzo)
      {
        dia = dia - this.cantDiasMarzo
        mes = 4;         
      }
      return [dia, mes]
    }

    if (mes == 4) {
      if(dia > this.cantDiasAbril)
      {
        dia = dia - this.cantDiasAbril
        mes = 5;
      }

      return [dia, mes]
    }

    if (mes == 5) {
      if(dia > this.cantDiasMayo)
      {
        dia = dia - this.cantDiasMayo
        mes = 6;
      }

      return [dia, mes]
    }

    if (mes == 6) {
      if(dia > this.cantDiasJunio)
      {
        dia = dia - this.cantDiasJunio
        mes = 7;
      }

      return [dia, mes]
    }

    if (mes == 7) {
      if(dia > this.cantDiasJulio)
      {
        dia = dia - this.cantDiasJulio
        mes = 8;
      }

      return [dia, mes]
    }

    if (mes == 8) {
      if(dia > this.cantDiasAgosto)
      {
        dia = dia - this.cantDiasAgosto
        mes = 9;
      }

      return [dia, mes]
    }

    if (mes == 9) {
      if(dia > this.cantDiasSeptiembre)
      {
        dia = dia - this.cantDiasSeptiembre
        mes = 10;
      }

      return [dia, mes]
    }

    if (mes == 10) {
      if(dia > this.cantDiasOctubre)
      {
        dia = dia - this.cantDiasOctubre
        mes = 11;
      }

      return [dia, mes]
    }

    if (mes == 11) {
      if(dia > this.cantDiasNoviembre)
      {
        dia = dia - this.cantDiasNoviembre
        mes = 12;
      }

      return [dia, mes]
    }

    if (mes == 12) {
      if(dia > this.cantDiasDiciembre)
      {
        dia = dia - this.cantDiasDiciembre
        mes = 1;
      }

      return [dia, mes]
    }

  }
  else{
    if(condicion == -1)
    {
      if (mes == 1) {
         if (dia <= 0) {
          dia = this.cantDiasDiciembreAnt + dia;
          mes = 12
        }
        return [dia, mes];
      }

      if (mes == 2) {
        if(dia <= 0){
          dia = dia + this.cantDiasEnero;
          mes = 1;
        }
        return [dia, mes]
      }
  
      if (mes == 3) {
        if(dia <= 0){
          dia = dia + this.cantDiasFebrero;
          mes = 2;
        }
        return [dia, mes]
      }
  
      if (mes == 4) {
        if(dia <= 0){
          dia = dia + this.cantDiasMarzo;
          mes = 3;
        }
        return [dia, mes]
      }
  
      if (mes == 5) {
        if(dia <= 0){
          dia = dia + this.cantDiasAbril;
          mes = 4;
        }
        return [dia, mes]
      }
  
      if (mes == 6) {
        if(dia <= 0){
          dia = dia + this.cantDiasMayo;
          mes = 5;
        }
        return [dia, mes]
      }
  
      if (mes == 7) {
        if(dia <= 0){
          dia = dia + this.cantDiasJunio;
          mes = 6;
        }
        return [dia, mes]
      }
  
      if (mes == 8) {
        if(dia <= 0){
          dia = dia + this.cantDiasJulio;
          mes = 7;
        }
        return [dia, mes]
      }
  
      if (mes == 9) {
        if(dia <= 0){
          dia = dia + this.cantDiasAgosto;
          mes = 8;
        }
        return [dia, mes]
      }
  
      if (mes == 10) {
        if(dia <= 0){
          dia = dia + this.cantDiasSeptiembre;
          mes = 9;
        }
        return [dia, mes]
      }
  
      if (mes == 11) {
        if(dia <= 0){
          dia = dia + this.cantDiasOctubre;
          mes = 10;
        }
        return [dia, mes]
      }
  
      if (mes == 12) {
        if(dia <= 0){
          dia = dia + this.cantDiasNoviembre;
          mes = 11;
        }
        return [dia, mes]
      }
  
    }
  }
  
  

  
  return "Error"
}

// 22/05 ---- nro semana 21  -- semana 4  LUNES
// 25/05 ---- nro semana 22  -- semana 4  JUEVES
// 
// 29/05 ---- nro semana 22  -- semana 5  LUNES
// 01/06 ---- nro semana 23  -- semana 1  JUEVES
//
//

obtenerSemanaCompleta(nroSemana, semana){
  let sem = []
  console.log(this.celdasYear)

  for (let i = 0; i < this.celdasYear.length; i++) {

    if (
      (this.celdasYear[i].nroSemana == nroSemana) 
      && (semana == this.celdasYear[i].semana)
      ) {
        for (let j = 0; j < 7; j++) {

          sem.push(this.celdasYear[i])
          i += 1
        }
        
      }
  

    }
 
    return sem    
  }


  
    mostrarSemanaActualSiguienteAnterior(semanaCompleta){ // Modificar aca
    
      this.mostrar = []
      
        for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
          if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Lunes") {
            
            this.mostrar.push(
              this.mostrarEstaSemana = {
                diaSemana: "Lunes",
                horario: this.disponibilidadOrdenadaEspecialista[i].horario,
                dia: semanaCompleta[0].dia,
                semana: semanaCompleta[0].semana,
                mes: semanaCompleta[0].mes,  
              }
              
              )
          }
        }
      
     
      for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
        if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Martes") {
          this.mostrar.push(
            this.mostrarEstaSemana = {
              diaSemana: "Martes",
              horario: this.disponibilidadOrdenadaEspecialista[i].horario,
              dia: semanaCompleta[1].dia,
              semana: semanaCompleta[1].semana,
              mes: semanaCompleta[1].mes,  
            }
            
            )
        }
     
      }
  
     
      for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
        if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Miercoles") {
          this.mostrar.push(
            this.mostrarEstaSemana = {
              diaSemana: "Miercoles",
              horario: this.disponibilidadOrdenadaEspecialista[i].horario,
              dia: semanaCompleta[2].dia,
              semana: semanaCompleta[2].semana,
              mes: semanaCompleta[2].mes,  
            }
            
            )
        }
      }
      
  
    
      for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
        if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Jueves") {
          this.mostrar.push(
            this.mostrarEstaSemana = {
              diaSemana: "Jueves",
              horario: this.disponibilidadOrdenadaEspecialista[i].horario,
              dia: semanaCompleta[3].dia,
              semana: semanaCompleta[3].semana,
              mes: semanaCompleta[3].mes,  
            }
            
            )
        }
      }
    
  
  
    
      for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
        if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Viernes") {
          this.mostrar.push(
            this.mostrarEstaSemana = {
              diaSemana: "Viernes",
              horario: this.disponibilidadOrdenadaEspecialista[i].horario,
              dia: semanaCompleta[4].dia,
              semana: semanaCompleta[4].semana,
              mes: semanaCompleta[4].mes,  
            }
            
            )
        }
      }
    
  
    
      for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
        if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Sabado") {
          this.mostrar.push(
            this.mostrarEstaSemana = {
              diaSemana: "Sabado",
              horario: this.disponibilidadOrdenadaEspecialista[i].horario,
              dia: semanaCompleta[5].dia,
              semana: semanaCompleta[5].semana,
              mes: semanaCompleta[5].mes,  
            }
            
            )
        }
      }
    
  
  
    
      for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
        if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Domingo") {
          this.mostrar.push(
            this.mostrarEstaSemana = {
              diaSemana: "Domingo",
              horario: this.disponibilidadOrdenadaEspecialista[i].horario,
              dia: semanaCompleta[6].dia,
              semana: semanaCompleta[6].semana,
              mes: semanaCompleta[6].mes,  
            }
            
            )
        }
      }
    

  
    }
 


siguienteSemana(){

 
  let semana
  let semanaCompleta
  this.esteDia += 7;
  this.esteNroSemana += 1;
  let siguiente = 1;
  let fecha;
  fecha = this.verificarMes(this.esteDia, this.esteNroMes, siguiente)
  this.esteDia = fecha[0]
  this.esteNroMes = fecha[1]
  semana = this.obtenerSemana(this.esteDia)



  this.estaSemana = semana
  semanaCompleta = this.obtenerSemanaCompleta(this.esteNroSemana,semana)
  this.mostrarSemanaActual3(this.esteDia, this.esteNroMes, semana);
  this.mostrarSemanaActual(this.mostrarSemana)
  this.mostrarSemanaActualSiguienteAnterior(semanaCompleta)

}


anteriorSemana(){
  let hoy = new Date().getDate()
  let mesActual = (new Date().getMonth()) + 1
  let semanaCompleta;

  if( (((this.esteDia - 7) >= hoy) && ((this.esteNroMes) == mesActual)) ||
  (((this.esteDia - 7) <= hoy) && ((this.esteNroMes) > mesActual)) )
  {
    this.esteDia -= 7;
  this.esteNroSemana -= 1;
  let anterior = -1
  let fecha;
  fecha = this.verificarMes(this.esteDia, this.esteNroMes, anterior)
  this.esteDia = fecha[0]
  this.esteNroMes = fecha[1]
  let semana = this.obtenerSemana(this.esteDia)
  this.estaSemana = semana
  semanaCompleta = this.obtenerSemanaCompleta(this.esteNroSemana,semana)
  
  this.mostrarSemanaActual3(this.esteDia, this.esteNroMes, semana);
  this.mostrarSemanaActual(this.mostrarSemana)
  this.mostrarSemanaActualSiguienteAnterior(semanaCompleta)
  }

}
registrar(){

    
  this.serviceTurno.registrar(this.tarjetaFinal)
  .then((response) => {
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

//------------------------------------

diaActual = "";
mesActual = "";
nombreMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
"Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
nombreMes = "";

meses = [
  {nro: 1, mes:"Enero", cantDias: 31},
  {nro: 2, mes:"Febrero", cantDias: 28},
  {nro: 3, mes:"Marzo", cantDias: 31},
  {nro: 4, mes:"Abril", cantDias: 30},
  {nro: 5, mes:"Mayo", cantDias: 31},
  {nro: 6, mes:"Junio", cantDias: 30},
  {nro: 7, mes:"Julio", cantDias: 31},
  {nro: 8, mes:"Agosto", cantDias: 31},
  {nro: 9, mes:"Septiembre", cantDias: 30},
  {nro: 10, mes:"Octubre", cantDias: 31},
  {nro: 11, mes:"Noviembre", cantDias: 30},
  {nro: 12, mes:"Diciembre", cantDias: 31},
         ]

dias = [
  {dia: 0, nombre: "Lunes"},
  {dia: 0, nombre: "Martes"},
  {dia: 0, nombre: "Miercoles"},
  {dia: 0, nombre: "Jueves"},
  {dia: 0, nombre: "Viernes"},
  {dia: 0, nombre: "Sabado"},
  {dia: 0, nombre: "Domingo"},
]



atras(){
  
  this.seleccionoTarj1 = false;
  this.seleccionoTarj2 = false;
  this.seleccionoTarj3 = false;
  this.tarjetaPaciente = undefined;
  this.tarjetaEspecialista = undefined;
  this.tarjetaHoraTurno = undefined;
}   

//------------------------------------------------------------------------
//*********************************************************************** */

disponibilidadOrdenadaEspecialistaLunes = [];
mostrarFechaLunes = [];
disponibilidadOrdenadaEspecialistaMartes = [];
mostrarFechaMartes = [];
disponibilidadOrdenadaEspecialistaMiercoles = [];
mostrarFechaMiercoles = [];
disponibilidadOrdenadaEspecialistaJueves = [];
mostrarFechaJueves = [];
disponibilidadOrdenadaEspecialistaViernes = [];
mostrarFechaViernes = [];
disponibilidadOrdenadaEspecialistaSabado = [];
mostrarFechaSabado = [];
disponibilidadOrdenadaEspecialistaDomingo = [];
mostrarFechaDomingo = [];

mostrarFecha = []
mostrarEstaSemana = {
  diaSemana: "",
  horario: ["",""],
  dia: 0,
  semana: 0,
  mes: 0
};
mostrar = []




mostrarSemanaActual3(dia, mes, semana){
  let mostrar = [];
  let x = 0

  for (let i = 0; i < this.semanas.length; i++) {
    for (let j = 0; j < this.semanas[i].length; j++) {

      if  ( semana == this.semanas[i][j].semana &&
          ( mes == this.semanas[i][j].mes  &&
            dia == this.semanas[i][j].dia)) {

            for (let k = 0; k < 7; k++) {
              mostrar.push(this.semanas[i][k])
              
            }
      break

      }
      
    }
    
  }


  this.mostrarSemana = mostrar;

}


mostrarSemanaActual(semanaCompleta){ // Modificar aca
  let date = new Date()
  if(semanaCompleta[0].dia >= date.getDate()){
    for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
      if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Lunes") {
        
        this.mostrar.push(
          this.mostrarEstaSemana = {
            diaSemana: "Lunes",
            horario: this.disponibilidadOrdenadaEspecialista[i].horario,
            dia: semanaCompleta[0].dia,
            semana: semanaCompleta[0].semana,
            mes: semanaCompleta[0].mes,  
          }
          
          )
      }
    }
  }
 
  if(semanaCompleta[1].dia >= date.getDate()){
  for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
    if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Martes") {
      this.mostrar.push(
        this.mostrarEstaSemana = {
          diaSemana: "Martes",
          horario: this.disponibilidadOrdenadaEspecialista[i].horario,
          dia: semanaCompleta[1].dia,
          semana: semanaCompleta[1].semana,
          mes: semanaCompleta[1].mes,  
        }
        
        )
    }
  }
  }

  if(semanaCompleta[2].dia >= date.getDate()){
  for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
    if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Miercoles") {
      this.mostrar.push(
        this.mostrarEstaSemana = {
          diaSemana: "Miercoles",
          horario: this.disponibilidadOrdenadaEspecialista[i].horario,
          dia: semanaCompleta[2].dia,
          semana: semanaCompleta[2].semana,
          mes: semanaCompleta[2].mes,  
        }
        
        )
    }
  }
}


if(semanaCompleta[3].dia >= date.getDate()){
  for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
    if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Jueves") {
      this.mostrar.push(
        this.mostrarEstaSemana = {
          diaSemana: "Jueves",
          horario: this.disponibilidadOrdenadaEspecialista[i].horario,
          dia: semanaCompleta[3].dia,
          semana: semanaCompleta[3].semana,
          mes: semanaCompleta[3].mes,  
        }
        
        )
    }
  }
}


if(semanaCompleta[4].dia >= date.getDate()){
  for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
    if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Viernes") {
      this.mostrar.push(
        this.mostrarEstaSemana = {
          diaSemana: "Viernes",
          horario: this.disponibilidadOrdenadaEspecialista[i].horario,
          dia: semanaCompleta[4].dia,
          semana: semanaCompleta[4].semana,
          mes: semanaCompleta[4].mes,  
        }
        
        )
    }
  }
}

if(semanaCompleta[5].dia >= date.getDate()){
  for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
    if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Sabado") {
      this.mostrar.push(
        this.mostrarEstaSemana = {
          diaSemana: "Sabado",
          horario: this.disponibilidadOrdenadaEspecialista[i].horario,
          dia: semanaCompleta[5].dia,
          semana: semanaCompleta[5].semana,
          mes: semanaCompleta[5].mes,  
        }
        
        )
    }
  }
}


if(semanaCompleta[6].dia >= date.getDate()){
  for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
    if (this.disponibilidadOrdenadaEspecialista[i].diaSemana == "Domingo") {
      this.mostrar.push(
        this.mostrarEstaSemana = {
          diaSemana: "Domingo",
          horario: this.disponibilidadOrdenadaEspecialista[i].horario,
          dia: semanaCompleta[6].dia,
          semana: semanaCompleta[6].semana,
          mes: semanaCompleta[6].mes,  
        }
        
        )
    }
  }
}


}


    ngOnInit(): void {
      
      this.servicePaciente.obtenerPacientes().subscribe((response) => {
        this.tarjetasPacientes = response;

      })

      this.serviceEspecialista.obtenerEspecialistas().subscribe((response) => {
        this.tarjetasEspecialistas = response;

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




        

        
        // ----------  ------------

        this.dispOrdenada.forEach(element => {
          
          this.horaInicio = element.horario[0];
          this.horaFin = element.horario[1]
          const horaDisponible = this.horaInicio + " - " + this.horaFin;
          const diaSemana = element.diaSemana;
          let disponibilidadHoraria = {diaSemana: diaSemana, horaDisponible: horaDisponible}
          this.horarioDisponible.push(disponibilidadHoraria)
          
          
        });
  
      })
      //-----------------------------------------------
      let cantDias = 0;


      let date = new Date();
      let dia = date.getDate();
      let mes = date.getMonth();
      let diaDeSemana = this.dias[(date.getDay()-1)].nombre;
      
      let dias = [
        {dia: 0, nombre: "Lunes"},
        {dia: 0, nombre: "Martes"},
        {dia: 0, nombre: "Miercoles"},
        {dia: 0, nombre: "Jueves"},
        {dia: 0, nombre: "Viernes"},
        {dia: 0, nombre: "Sabado"},
        {dia: 0, nombre: "Domingo"},
      ]
      cantDias = this.meses[mes].cantDias
      

      let x = dia - 1
      //----
      if (diaDeSemana == "Lunes"){ 
        this.dias[0].dia = x;

        for (let j = 1; j < 7; j++) {  
          if (dia > cantDias){
            x = 0
          }
          this.dias[j].dia = x + 1 
          
        }       
        }
      else{ 
          let i = 1;
          let j = 0;

          if(diaDeSemana == "Martes"){
            j = 1
          }
          if(diaDeSemana == "Miercoles"){
            j = 2
          }
          if(diaDeSemana == "Jueves"){
            j = 3
          }
          if(diaDeSemana == "Viernes"){
            j = 4
          }
          if(diaDeSemana == "Sabado"){
            j = 5
          }
          if(diaDeSemana == "Domingo"){
            j = 6
          }
          
          
          for (j; i < 8; j++) { 
            if(this.dias[6].dia != 0 && this.dias[0].dia == 0){
              j = 0;
            }
            if (dia > cantDias){
              x = 0
            }
            this.dias[j].dia = x + 1 
            
            i += 1
            x += 1
            
          };
          
          
        }



        //------------------------------------------------------------------
        let d = new Date();
        let year = new Date().getFullYear()
        let month = (d.getMonth() + 1).toString();
        if (month.toString().length == 1) {
          month = "0" + month.toString()
        }
  
        let day = (d.getDate()).toString();
        if (day.toString().length == 1) {
          day = "0" + day.toString()
        }
        
        let date2 = "" + dia + "-" + mes + "-" + year + "";
        this.obtenerAgenda()
        this.mostrarCeldasTabla(date2)
        let semana = this.obtenerSemana(dia)
        
        this.mostrarSemanaActual3(d.getDate(), (d.getMonth() + 1), semana);
        this.mostrarGrillaSemanaActual()
        


        //------------------------------------------------------------------
        
        this.esteDia = d.getDate();
        this.esteNroMes = (d.getMonth() + 1).toString();
        this.nombreMes = this.nombreMeses[Number(this.esteNroMes) - 1];
        this.i = this.obtenerNroi(this.esteDia, this.esteNroMes)
        this.estaSemana = this.obtenerSemana(this.esteDia)
        this.nroDeDiaSemana = -1;
        
        let fecha = "" + year + "-" + this.esteNroMes + "-" + this.esteDia + "" 
        this.esteNroSemana = this.obtenerNroSemana2(fecha)
        this.diaDeSemanaActual = this.obtenerDiaDeSemana(this.esteDia, this.esteNroMes, this.nroDeDiaSemana)
        
      
        

      //-----------------------------------------------------------------------------------------------
      //-----------------------------------------------------------------------------------------------
      //-----------------------------------------------------------------------------------------------
      //-----------------------------------------------------------------------------------------------
      //-----------------------------------------------------------------------------------------------
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
    paciente: [],
    fechaTurno: ""
  };
  
  seleccionoTarj1 = false; // cambiar a false
  seleccionoTarj2 = false; // cambiar a false
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
  }

/*   selectTarjeta22(tarjetaEspecialista){ // ORIGINAL
    this.seleccionoTarj2 = true;
    this.tarjetaEspecialista = tarjetaEspecialista;
    //console.log(this.tarjetaEspecialista)
    

    let inicio = tarjetaEspecialista.dispHoraria[0];
    let fin = tarjetaEspecialista.dispHoraria[1];
    
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
    
    

    for (let i = 0; i < this.dispOrdenada.length; i++) {
      if(this.dispOrdenada[i].horario[0] >= this.horarioEspecialista[0] &&
        this.dispOrdenada[i].horario[1] <= this.horarioEspecialista[1]){
          this.disponibilidadOrdenadaEspecialista.push(this.dispOrdenada[i])
        }
    }
    

    
    // ----------------------
    for (let i = 0; i < this.disponibilidadOrdenadaEspecialista.length; i++) {
      for (let j = 0; j < 7; j++) {
        if(this.disponibilidadOrdenadaEspecialista[i].diaSemana == this.dias[j].nombre){
          this.mostrarFecha.push(this.dias[j].dia)
          
        }
      }
      
    }
    
    
  } */

  selectTarjeta3(tarjetaHoraTurno){
    this.seleccionoTarj3 = true;
    this.diaSeleccionado = tarjetaHoraTurno.dia;
    this.diaSemana = tarjetaHoraTurno.diaSemana;
    this.tarjetaHoraTurno = tarjetaHoraTurno;
    

    this.tarjetaHora = this.tarjetaHoraTurno.horario[0] + " - " + this.tarjetaHoraTurno.horario[1];
    let dia = this.diaSeleccionado.toString();
    let date = new Date();
    let mes = (date.getMonth() + 1).toString();
    if (mes.length == 1) {
      mes = "0" + mes
    }
    if (dia.length == 1) {
      dia = "0" + dia
    }
    let fechaTurno = dia + "/" + mes
    
    this.fechaTurno = fechaTurno
    this.tarjetaFinal = {
      diaSemana: tarjetaHoraTurno.diaSemana,
      especialista: this.tarjetaEspecialista,
      horario: tarjetaHoraTurno.horario,
      paciente: this.tarjetaPaciente,
      fechaTurno: fechaTurno,
    }

    console.log(this.tarjetaFinal)
  }
  fechaTurno = "";


 




  selectTarjeta2(tarjetaEspecialista){
    this.seleccionoTarj2 = true;
    this.tarjetaEspecialista = tarjetaEspecialista;
    

    let inicio = tarjetaEspecialista.dispHoraria[0];
    let fin = tarjetaEspecialista.dispHoraria[1];
    
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
    
    

    for (let i = 0; i < this.dispOrdenada.length; i++) {
      if(this.dispOrdenada[i].horario[0] >= this.horarioEspecialista[0] &&
        this.dispOrdenada[i].horario[1] <= this.horarioEspecialista[1]){
          this.disponibilidadOrdenadaEspecialista.push(this.dispOrdenada[i])
        }
    }

//-----    
    // fecha: "2023-01-15"
    let date = new Date();

    let fecha = date.getFullYear() + "-" + this.mesActual + "-" + this.diaActual
    let semana = this.obtenerNroSemana2(fecha)

    //this.mostrarSemanaActual3(this.diaActual, this.mesActual, semana)
    this.mostrarSemanaActual(this.mostrarSemana)

  }


  


    

}
