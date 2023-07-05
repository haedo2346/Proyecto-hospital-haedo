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

//-----------------------------------------------------------------------
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
    
  }

  seleccionoFormaPago(formaPago){
    this.seleccionoFP = true
    this.formaPago = formaPago;
    
  }

  seleccionoMonto(monto){
    this.monto = monto;
    
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




  // ---------------------------------------

  diaActual = "";
  mesActual = "";
  nombreMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
  "Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  nombreMes = "";
  
  msjBorrar = false;

  borrar(turno){
    this.msjBorrar = true;
    this.seleccionoTurno(turno)

  }

  async delete(){
    
    const response = await this.servicioTurno.borrarTurno(this.turnoSeleccionado);
    console.log("Se borro: ")
    console.log(response)
    this.toastr.success("El turno ha sido borrado con exito", "turno eliminado");
    this.visTurno = false
  }


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
    
  



// ---------------------------------------------------------------------
// *********************************************************************
// ---------------------------------------------------------------------
    
    ngOnInit(): void {
        
      let d = new Date();
      let year = new Date().getFullYear()
      let mes = (d.getMonth() + 1).toString();
      if (mes.toString().length == 1) {
        mes = "0" + mes.toString()
      }

      let dia = (d.getDate()).toString();
      if (dia.toString().length == 1) {
        dia = "0" + dia.toString()
      }
      
      let date = "" + dia + "-" + mes + "-" + year + "";
      
      
      
      this.obtenerAgenda();
      this.mostrarCeldasTabla(date);
      let semana = this.obtenerSemana(dia)
      this.mostrarSemanaActual(d.getDate(), (d.getMonth() + 1), semana);
      this.cargarGrillaXSemana()
      //this.mostrarGrillaSemanaActual()

      

//---------------------------------------------------------------



      this.esteDia = d.getDate();
      this.esteNroMes = (d.getMonth() + 1).toString();
      this.nombreMes = this.nombreMeses[Number(this.esteNroMes) - 1];
      this.i = this.obtenerNroi(this.esteDia, this.esteNroMes)
      this.estaSemana = this.obtenerSemana(this.esteDia)
      this.nroDeDiaSemana = -1;
      
      let fecha = "" + year + "-" + this.esteNroMes + "-" + this.esteDia + "" 
      this.esteNroSemana = this.obtenerNroSemana2(fecha)
      this.diaDeSemanaActual = this.obtenerDiaDeSemana(this.esteDia, this.esteNroMes, this.nroDeDiaSemana)
      
      
      let nroDeSemana = this.esteNroSemana;
      let week = this.obtenerSemana(this.esteDia)

      this.servicioTurno.obtenerTurno().subscribe((response) => {
        this.turnos = response;


        for (let i = 0; i < document.getElementsByClassName("hora1").length; i++) {
          this.todasHorasPosibles.push(document.getElementsByClassName("hora1")[i].innerHTML);
        }
        
        
        let primeraVez = []
        for (let i = 0; i < this.grillaXSemana.length; i++) {
          primeraVez.push(false)
        }
        this.primeraVez = primeraVez
//------------------------------------------------------------------------------
/* 
       this.turnos.forEach((element) => {
        
      if (element.diaSemana == "Lunes") { this.turnosLunes.push(element) };
      if (element.diaSemana == "Martes") { this.turnosMartes.push(element) };
      if (element.diaSemana == "Miercoles") { this.turnosMiercoles.push(element) };
      if (element.diaSemana == "Jueves") { this.turnosJueves.push(element) };
      if (element.diaSemana == "Viernes") { this.turnosViernes.push(element) };
      if (element.diaSemana == "Sabado") { this.turnosSabado.push(element) };
      if (element.diaSemana == "Domingo") { this.turnosDomingo.push(element) };
    });
 */

    let date = new Date();
    


      let grillaXSemana = this.grillaXSemana;

      for (let index = 0; index < this.turnos.length; index++) {

      let t = this.turnos[index]
      let indice = 0
      console.log(t)

      let fechaTurno = t.fechaTurno
      let dia = (fechaTurno[0] + fechaTurno[1]).toString();
      let mes = (fechaTurno[3] + fechaTurno[4]).toString();
      let fecha = date.getFullYear() + "-" + mes + "-" + dia
      let nroSemanaTurno = this.obtenerNroSemana2(fecha)
      let semanaTurno = this.obtenerSemana(dia)
        
      //console.log("Nro de semana: " + nroDeSemana + " - Nro de sem Turno: " + nroSemanaTurno)
          

          if (t.diaSemana == "Lunes" && 
              ((nroDeSemana == nroSemanaTurno) ||
                week == semanaTurno)) {
            indice += 0
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Martes" && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno)) {
            indice += 29
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
              
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Miercoles" && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno)) {
            indice += 59
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Jueves" && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno)) {
            indice += 89
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Vienes" && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno)) {
            indice += 119
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Sabado" && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno)) {
            indice += 149
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Domingo" && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno)) {
            indice += 179
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          
          indice = 0
        }
        
        this.grillaXSemana = grillaXSemana;

     


     let contador = 0;
     for (let z = 0; z < this.grillaXSemana[nroDeSemana].length; z++) {
       this.grillaModificada.push(this.grillaXSemana[nroDeSemana][z])
       contador += 1
       if (contador == 30) {
         this.grillaFinal.push(this.grillaModificada)
         this.grillaModificada = []
         contador = 0
        }
      }

        this.mostrarGrillaSemActual = this.grillaFinal; // Modifique aca
        
        })
        
  

    }
// ---------------------------------------------------------------------
// *********************************************************************
// ---------------------------------------------------------------------
primeraVez = [];

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






// ---------------------------------------

  obtenerAgenda(){
  // Horarios son 30 celdas
  // La semana tiene 7 dias
  // El año tiene 52.1 semanas

  let date = new Date();
  
  let yearActual = date.getFullYear();
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

  // Variables a mostrar ------------
  celdasYear;
  i;
  esteNroMes;
  estaSemana;
  esteNroSemana;
  esteDia;
  nroDeDiaSemana;
  diaDeSemanaActual = "";

  mostrarSemana = [];

  semanas = [];
  //-------------


  mostrarCeldasTabla(date){
    // fecha: "15-05-2023"

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













//  (8, 3, 2)
  mostrarSemanaActual(dia, mes, semana){
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


  mostrarSemanaActual2(nroSemana, mes, semana){
    let mostrar = [];
    let x = 0;

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {
        if (((semana == this.semanas[i][j].semana)) &&
          (mes == this.semanas[i][j].mes) && this.semanas[i][j].diaSemana == "Lunes") {
          mostrar.push(this.semanas[i][j])
        }

      }

    }

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {

        if (( (semana == this.semanas[i][j].semana)) &&
          mes == this.semanas[i][j].mes && this.semanas[i][j].diaSemana == "Martes") {
          mostrar.push(this.semanas[i][j])
        }
        

      }
    }

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {

        if (((semana == this.semanas[i][j].semana)) &&
          mes == this.semanas[i][j].mes && this.semanas[i][j].diaSemana == "Miercoles") {
          mostrar.push(this.semanas[i][j])
        }
        

      }
    }

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {

        if (((semana == this.semanas[i][j].semana)) &&
          mes == this.semanas[i][j].mes && this.semanas[i][j].diaSemana == "Jueves") {
          mostrar.push(this.semanas[i][j])
        }

      }
    }

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {

        if (((semana == this.semanas[i][j].semana)) &&
          mes == this.semanas[i][j].mes && this.semanas[i][j].diaSemana == "Viernes") {
          mostrar.push(this.semanas[i][j])
        }
        

      }
    }

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {

        if (((semana == this.semanas[i][j].semana)) &&
          mes == this.semanas[i][j].mes && this.semanas[i][j].diaSemana == "Sabado") {
          mostrar.push(this.semanas[i][j])
        }
        

      }
    }

    for (let i = 0; i < this.semanas.length; i++) {
      for (let j = 0; j < this.semanas[i].length; j++) {

        if (((semana == this.semanas[i][j].semana)) &&
          (mes == this.semanas[i][j].mes ) && this.semanas[i][j].diaSemana == "Domingo") {
          mostrar.push(this.semanas[i][j])
        }

      }
    }


    this.mostrarSemana = mostrar;
    
  }












//        j     j   j
//  i [ [ [] , [] , [] ],
//  i   [ [] , [] , [] ] ]
  mostrarGrillaSemActual = [];
  grillaXSemana = [];
  grillaModificada = [];
  grillaFinal = [];

  cargarGrillaXSemana(){
    let x = 0;
    let grillaXSemana = [];
    
    for (let i = 0; i < 7; i++) {
      if(this.celdasYear[i].diaSemana == "Lunes"){
        x = i
      }
    }

    let contador = 0;
    for (let i = x; i < this.celdasYear.length; i++) {
      for (let j = 0; j < this.celdasYear[i].horarios.length; j++) {
        grillaXSemana.push(this.celdasYear[i].horarios[j])
       
      }
      
      contador += 1;
      if(contador == 7){
        this.grillaXSemana.push(grillaXSemana)
        grillaXSemana = []
        contador = 0
      }
      
    }
    



  }





  mostrarGrillaSemanaActual(){ // Anda bien
    
    /* let mostrarGrillaSemActual = [];
    let mostrar = []; */
   
 
    /* for (let i = 0; i < this.mostrarSemana.length; i++) {
      
      for (let j = 0; j < this.mostrarSemana[i].horarios.length; j++) {
        mostrar.push(this.mostrarSemana[i].horarios[j]) 
      }
      
      mostrarGrillaSemActual.push(mostrar)
      mostrar = []
    }
    this.mostrarGrillaSemActual = mostrarGrillaSemActual; */

    
  }


//-----------------------------------------------------------------
  verificarMes(dia, mes, condicion){
    let date = new Date();
    
    let yearActual = date.getFullYear();
    let monthActual = date.getMonth() + 1;
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

  
  nroSemanaT = []

  cargarGrillaNuevamente(nroDeSemana, semana, dia){

    
    let indice = 0;
    let date = new Date();
    
    let grillaXSemana = this.grillaXSemana
    
    for (let index = 0; index < this.turnos.length; index++) {
      

      let t = this.turnos[index]
      let fechaTurno = t.fechaTurno[0] + t.fechaTurno[1]
      let semanaCompleta = this.obtenerSemanaCompleta(nroDeSemana, semana)

      let flag = false;
      if (dia.length == 1) {
        dia = "0" + dia 
      }
      for (let i = 0; i < semanaCompleta.length; i++) {

        if(fechaTurno == dia){
          flag = true;
        }
        
      }

      for (let index = 0; index < this.turnos.length; index++) {

        
        let t = this.turnos[index]
        let indice = 0
        //console.log(t)
  
        let fechaTurno = t.fechaTurno
        let dia = (fechaTurno[0] + fechaTurno[1]).toString();
        let mes = (fechaTurno[3] + fechaTurno[4]).toString();
        let fecha = date.getFullYear() + "-" + mes + "-" + dia
        let nroSemanaTurno = this.obtenerNroSemana2(fecha)
        let semanaTurno = this.obtenerSemana(dia)

        let week = this.obtenerSemana(this.esteDia)
        
        
         if (t.diaSemana == "Lunes" && flag && 
         ((nroDeSemana == nroSemanaTurno) ||
           week == semanaTurno) &&
           this.primeraVez[nroDeSemana] == false) {
            indice += 0
            
              
              if (t.horario[0] == "08:00") {
                grillaXSemana[nroDeSemana][indice +1] += 1;
              }
              if (t.horario[0] == "08:30") {
                grillaXSemana[nroDeSemana][indice +2] += 1;
              }
              if (t.horario[0] == "09:00") {
                grillaXSemana[nroDeSemana][indice +3] += 1;
              }
              if (t.horario[0] == "09:30") {
                grillaXSemana[nroDeSemana][indice +4] += 1;
              }
              if (t.horario[0] == "10:00") {
                grillaXSemana[nroDeSemana][indice +5] += 1;
              }
              if (t.horario[0] == "10:30") {
                grillaXSemana[nroDeSemana][indice +6] += 1;
              }
              if (t.horario[0] == "11:00") {
                grillaXSemana[nroDeSemana][indice +7] += 1;
              }
              if (t.horario[0] == "11:30") {
                grillaXSemana[nroDeSemana][indice +8] += 1;
              }
              if (t.horario[0] == "12:00") {
                grillaXSemana[nroDeSemana][indice +9] += 1;
              }
              if (t.horario[0] == "12:30") {
                grillaXSemana[nroDeSemana][indice +10] += 1;
              }
              if (t.horario[0] == "13:00") {
                grillaXSemana[nroDeSemana][indice +11] += 1;
              }
              if (t.horario[0] == "13:30") {
                grillaXSemana[nroDeSemana][indice +12] += 1;
              }
              if (t.horario[0] == "14:00") {
                grillaXSemana[nroDeSemana][indice +13] += 1;
              }
              if (t.horario[0] == "14:30") {
                grillaXSemana[nroDeSemana][indice +14] += 1;
              }
              if (t.horario[0] == "15:00") {
                grillaXSemana[nroDeSemana][indice +15] += 1;
              }
              if (t.horario[0] == "15:30") {
                grillaXSemana[nroDeSemana][indice +16] += 1;
              }
              if (t.horario[0] == "16:00") {
                grillaXSemana[nroDeSemana][indice +17] += 1;
              }
              if (t.horario[0] == "16:30") {
                grillaXSemana[nroDeSemana][indice + 18] += 1;
              }
              if (t.horario[0] == "17:00") {
                grillaXSemana[nroDeSemana][indice +19] += 1;
              }
              if (t.horario[0] == "17:30") {
                grillaXSemana[nroDeSemana][indice +20] += 1;
              }
              if (t.horario[0] == "18:00") {
                grillaXSemana[nroDeSemana][indice +21] += 1;
              }
              if (t.horario[0] == "18:30") {
                grillaXSemana[nroDeSemana][indice +22] += 1;
              }
              if (t.horario[0] == "19:00") {
                grillaXSemana[nroDeSemana][indice +23] += 1;
              }
              if (t.horario[0] == "19:30") {
                grillaXSemana[nroDeSemana][indice +24] += 1;
              }
              if (t.horario[0] == "20:00") {
                grillaXSemana[nroDeSemana][indice +25] += 1;
              }
              if (t.horario[0] == "20:30") {
                grillaXSemana[nroDeSemana][indice +26] += 1;
              }
              if (t.horario[0] == "21:00") {
                grillaXSemana[nroDeSemana][indice +27] += 1;
              }
              if (t.horario[0] == "21:30") {
                grillaXSemana[nroDeSemana][indice +28] += 1;
              }
              if (t.horario[0] == "22:00") {
                grillaXSemana[nroDeSemana][indice +29] += 1;
              }
              if (t.horario[0] == "22:30") {
                grillaXSemana[nroDeSemana][indice +30] += 1;
              }
              indice = 0
            }
                        
          if (t.diaSemana == "Martes" && flag && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno) &&
            this.primeraVez[nroDeSemana] == false) {
            indice += 29
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
              
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Miercoles" && flag && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno) &&
            this.primeraVez[nroDeSemana] == false) {
            indice += 59
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Jueves" && flag && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno) &&
            this.primeraVez[nroDeSemana] == false) {
            indice += 89
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Vienes" && flag && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno) &&
            this.primeraVez[nroDeSemana] == false) {
            indice += 119
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Sabado" && flag && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno) &&
            this.primeraVez[nroDeSemana] == false) {
            indice += 149
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }
          if (t.diaSemana == "Domingo" && flag && 
          ((nroDeSemana == nroSemanaTurno) ||
            week == semanaTurno) &&
            this.primeraVez[nroDeSemana] == false) {
            indice += 179
            if (t.horario[0] == "08:00") {
              grillaXSemana[nroDeSemana][indice +1] += 1;
            }
            if (t.horario[0] == "08:30") {
              grillaXSemana[nroDeSemana][indice +2] += 1;
            }
            if (t.horario[0] == "09:00") {
              grillaXSemana[nroDeSemana][indice +3] += 1;
            }
            if (t.horario[0] == "09:30") {
              grillaXSemana[nroDeSemana][indice +4] += 1;
            }
            if (t.horario[0] == "10:00") {
              grillaXSemana[nroDeSemana][indice +5] += 1;
            }
            if (t.horario[0] == "10:30") {
              grillaXSemana[nroDeSemana][indice +6] += 1;
            }
            if (t.horario[0] == "11:00") {
              grillaXSemana[nroDeSemana][indice +7] += 1;
            }
            if (t.horario[0] == "11:30") {
              grillaXSemana[nroDeSemana][indice +8] += 1;
            }
            if (t.horario[0] == "12:00") {
              grillaXSemana[nroDeSemana][indice +9] += 1;
            }
            if (t.horario[0] == "12:30") {
              grillaXSemana[nroDeSemana][indice +10] += 1;
            }
            if (t.horario[0] == "13:00") {
              grillaXSemana[nroDeSemana][indice +11] += 1;
            }
            if (t.horario[0] == "13:30") {
              grillaXSemana[nroDeSemana][indice +12] += 1;
            }
            if (t.horario[0] == "14:00") {
              grillaXSemana[nroDeSemana][indice +13] += 1;
            }
            if (t.horario[0] == "14:30") {
              grillaXSemana[nroDeSemana][indice +14] += 1;
            }
            if (t.horario[0] == "15:00") {
              grillaXSemana[nroDeSemana][indice +15] += 1;
            }
            if (t.horario[0] == "15:30") {
              grillaXSemana[nroDeSemana][indice +16] += 1;
            }
            if (t.horario[0] == "16:00") {
              grillaXSemana[nroDeSemana][indice +17] += 1;
            }
            if (t.horario[0] == "16:30") {
              grillaXSemana[nroDeSemana][indice + 18] += 1;
            }
            if (t.horario[0] == "17:00") {
              grillaXSemana[nroDeSemana][indice +19] += 1;
            }
            if (t.horario[0] == "17:30") {
              grillaXSemana[nroDeSemana][indice +20] += 1;
            }
            if (t.horario[0] == "18:00") {
              grillaXSemana[nroDeSemana][indice +21] += 1;
            }
            if (t.horario[0] == "18:30") {
              grillaXSemana[nroDeSemana][indice +22] += 1;
            }
            if (t.horario[0] == "19:00") {
              grillaXSemana[nroDeSemana][indice +23] += 1;
            }
            if (t.horario[0] == "19:30") {
              grillaXSemana[nroDeSemana][indice +24] += 1;
            }
            if (t.horario[0] == "20:00") {
              grillaXSemana[nroDeSemana][indice +25] += 1;
            }
            if (t.horario[0] == "20:30") {
              grillaXSemana[nroDeSemana][indice +26] += 1;
            }
            if (t.horario[0] == "21:00") {
              grillaXSemana[nroDeSemana][indice +27] += 1;
            }
            if (t.horario[0] == "21:30") {
              grillaXSemana[nroDeSemana][indice +28] += 1;
            }
            if (t.horario[0] == "22:00") {
              grillaXSemana[nroDeSemana][indice +29] += 1;
            }
            if (t.horario[0] == "22:30") {
              grillaXSemana[nroDeSemana][indice +30] += 1;
            }
            indice = 0
          }

          
          this.nroSemanaT.push(nroDeSemana)
      }
      
      
        
      }
      let nroSemT
      nroSemT = [...new Set(this.nroSemanaT)];

      
        
      // 22 23 24
      // 0 0 0 0 0 0
      for (let i = 0; i < nroSemT.length; i++) {
        
        if (this.primeraVez[nroSemT[i]] == false) {
          this.primeraVez[nroSemT[i]] = true
        }
      
        
 
          
      
        this.grillaXSemana = grillaXSemana;
      }
  

  let contador = 0;
  let x = 0
  this.grillaModificada = []
  this.grillaFinal = []
     for (let z = 0; z < this.grillaXSemana[nroDeSemana].length; z++) {
       this.grillaModificada.push(this.grillaXSemana[nroDeSemana][z])
       
       contador += 1
       x += 1

       if (contador == 30) {

         this.grillaFinal.push(this.grillaModificada)
         this.grillaModificada = []
         contador = 0
        }
      }

     
    
    this.mostrarGrillaSemActual = this.grillaFinal

  }

obtenerSemanaCompleta(nroSemana, semana){
  let sem = []

  for (let i = 0; i < this.celdasYear.length; i++) {
    if (this.celdasYear[i].nroSemana == nroSemana && semana == this.celdasYear[i].semana
      && this.celdasYear[i].diaSemana == "Lunes") {
        for (let j = 0; j < 7; j++) {
          sem.push(this.celdasYear[i])
          i += 1
        }
        
      }
  

    }
    return sem    
  }



    
  siguienteSemana(){
    this.esteDia += 7;
    
    this.esteNroSemana += 1;
    let siguiente = 1;
    let fecha;
    fecha = this.verificarMes(this.esteDia, this.esteNroMes, siguiente)
    this.esteDia = fecha[0]
    
    this.esteNroMes = fecha[1]
    let semana = this.obtenerSemana(this.esteDia)
    //console.log("este dia " + fecha[0])
    for (let i = 0; i < this.celdasYear.length; i++) {
      if (this.celdasYear[i].nroSemana == this.esteNroSemana) {
        this.estaSemana = this.celdasYear[i].semana
      }        
    }
    
    this.cargarGrillaNuevamente(this.esteNroSemana, semana, this.esteDia)
    this.mostrarSemanaActual(this.esteDia, this.esteNroMes, semana);

  }



  anteriorSemana(){
    this.esteDia -= 7;
    this.esteNroSemana -= 1;
    let anterior = -1
    let fecha;
    fecha = this.verificarMes(this.esteDia, this.esteNroMes, anterior)
    this.esteDia = fecha[0]
    this.esteNroMes = fecha[1]
    let semana = this.obtenerSemana(this.esteDia)
    
    
    for (let i = 0; i < this.celdasYear.length; i++) {
      if (this.celdasYear[i].nroSemana == this.esteNroSemana) {
        this.estaSemana = this.celdasYear[i].semana
      }        
    }
    
    this.cargarGrillaNuevamente(this.esteNroSemana, semana, this.esteDia)
    this.mostrarSemanaActual(this.esteDia, this.esteNroMes, semana);
    
  }




}
    