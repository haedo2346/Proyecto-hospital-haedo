import { Component, OnInit } from '@angular/core';
import { CobrosService } from 'src/app/services/cobros.service';
import { ICobro } from 'src/app/models/Cobro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit{

  constructor(
    private servicio: CobrosService, 
    private toastr: ToastrService,
    private router:Router){}

  ngOnInit(): void {
    this.servicio.obtenerCobros().subscribe((response) => {
      this.tarjetasCobro = response;
      console.log(this.tarjetasCobro)
    })
    
  }

  tarjetasCobro;

  volver(){
    this.router.navigate(["/menuPrincipal"])
  }


}
