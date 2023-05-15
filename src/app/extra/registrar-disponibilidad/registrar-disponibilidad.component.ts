import { Component, OnInit } from '@angular/core';
import { DisponibilidadHorariaService } from 'src/app/services/disponibilidad-horaria.service';
import { IDisponibilidadHoraria } from 'src/app/models/disponibilidadHoraria';
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'registrar-disponibilidad',
  templateUrl: './registrar-disponibilidad.component.html',
  styleUrls: ['./registrar-disponibilidad.component.css']
})
export class RegistrarDisponibilidadComponent implements OnInit{

  constructor(
    private serviceDisponibilidad: DisponibilidadHorariaService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    /* this.formulario = this.formBuilder.group({
      cantidad: [0],
      diaSemana: [null],
      horarioInicio: [""],
      horarioFin: [""],
      dispHoraria: ["", ""]
    }) */

    this.dia = this.diasSemana[0];
    let i = 0;
    let j = 0;
    while (this.horaIni != "22:30" && i<1000 && this.dia != undefined) {
      let inicio, fin;
      let horaInicio, minutoInicio;
      let horaFin, minutoFin;
      
      //----------------------------------
      horaInicio = this.horaIni[0] + this.horaIni[1];
      horaInicio = Number(horaInicio)
      minutoInicio = this.horaIni[3] + this.horaIni[4];
      this.horaIniAnterior = horaInicio;

      horaFin = this.horaFin[0] + this.horaFin[1];
      horaFin = Number(horaFin)
      minutoFin = this.horaFin[3] + this.horaFin[4];
      this.horaFinAnterior = horaFin;

      //---------------   Hora Inicio  -------------------
     if (horaInicio < 10 && ((horaInicio == 9 && minutoInicio == "30" ) == false) ) {
      if (minutoInicio == "30") {
        horaInicio += 1;

      }
      horaInicio = horaInicio.toString()
      horaInicio = "0" + horaInicio;
    }

    if(horaInicio >= 10 && horaInicio < 20 && (( horaInicio == 19 && minutoInicio == "30" ) == false) ){
      if (minutoInicio == "30"){
        horaInicio += 1;
      }
      horaInicio = horaInicio.toString();
    } 
    
    if( horaInicio == 9 && minutoInicio == "30" && this.horaIniAnterior == 9){
      horaInicio = "10" ;
    } 
    
    if(horaInicio >= 20){
      if (minutoInicio == "30"){
        horaInicio += 1;
      }
      horaInicio = horaInicio.toString();
    }
    if( horaInicio == 19 && minutoInicio == "30" && this.horaIniAnterior == 19){
      horaInicio = "20";
    }   
  
    //******************************** --------------------------------
    if (minutoInicio == "00") {
      minutoInicio = "30";
    }
    else{
      minutoInicio = "00";
    }

    inicio = horaInicio + ":" + minutoInicio;
    this.horaIni = inicio;

     //---------------   Hora FIN  -------------------
     if (horaFin < 10 && ((horaFin == 9 && minutoFin == "30" ) == false) ) {
      if (minutoFin == "30") {
        horaFin += 1;

      }
      horaFin = horaFin.toString()
      horaFin = "0" + horaFin;
    }

    if(horaFin >= 10 && horaFin < 20 && (( horaFin == 19 && minutoFin == "30" ) == false) ){
      if (minutoFin == "30"){
        horaFin += 1;
      }
      horaFin = horaFin.toString();
    } 
    
    if( horaFin == 9 && minutoFin == "30" && this.horaFinAnterior == 9){
      horaFin = "10" 
    } 
    
    if(horaFin >= 20){
      if (minutoFin == "30"){
        horaFin += 1;
      }
      horaFin = horaFin.toString();
    }
    if( horaFin == 19 && minutoFin == "30" && this.horaFinAnterior == 19){
      horaFin = "20"
    }   
  
    //******************************** --------------------------------
    if (minutoFin == "00") {
      minutoFin = "30";
    }
    else{
      minutoFin = "00";
    }

    fin = horaFin + ":" + minutoFin;
    this.horaFin = fin;
    
    //console.log("Hora Inicio: " + inicio)
    //console.log("Hora Fin: " + fin);
    //console.log("Dia de la semana: " + this.dia)
    this.formulario = {
      cantidad: this.cantidad, 
      diaSemana: this.dia,
      horario: [this.horaIni, this.horaFin]
    }
    //this.registrar()
    i = i+1;
    if (this.horaFin == "23:00") {
      this.dia = this.diasSemana[j+1]
      this.horaIni = "07:30"
      this.horaFin = "08:00"
      j += 1;

    }


    }



    
  }
  cantidad = 0;
  horaIni = "07:30";
  horaFin = "08:00";
  horaIniAnterior;
  horaFinAnterior;

  disponibilidadHoraria = [];

  diasSemana = 
  ["Lunes", "Martes", "Miercoles", 
  "Jueves", "Viernes", "Sabado", "Domingo"]
  dia = "";  

  formulario = {
    cantidad: 0,
    diaSemana: this.dia,
    horario: [this.horaIni, this.horaFin]
  };

  registrar(){
    const f = this.formulario;

    console.log(this.formulario)

    this.serviceDisponibilidad.registrar(this.formulario)
    .then((response) => {
      console.log(response)
      this.toastr.success("El turno ha sido registrado con exito", "Turno Registrado");
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("El Turno no ha sido registrado con exito", "Error")
    }) 
  }


}
