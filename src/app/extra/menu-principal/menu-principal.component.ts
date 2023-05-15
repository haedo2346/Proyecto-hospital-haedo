import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  constructor(private servicio: LoginService,
    public formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private toastr: ToastrService){}

  opcion1(){
    this.router.navigate(["/turnos"])
  }

  opcion2(){
    this.router.navigate(["/agenda"])
  }

  opcion4(){
    this.router.navigate(["/registrarCliente"])
  }

  opcion5(){
    this.router.navigate(["/registrarEspecialista"])
  }

  opcion6(){
    this.router.navigate(["/registrarEspecialidad"])
  }
}
