import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'login',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit{
  constructor(private servicio: LoginService,
  public formBuilder: FormBuilder,
  private router:Router,
  private route: ActivatedRoute,
  private toastr: ToastrService){}

  formLogin: FormGroup;
//
  ngOnInit(): void{
    this.formLogin = this.formBuilder.group({
      email: [null,[Validators.required, Validators.minLength(1)]], 
      password: [null, [Validators.required, Validators.minLength(1)]]
    })
    
  }

  submitted = false;

  login = false;
  @Output() newLoginEvent = new EventEmitter<boolean>();

    
  onSubmit(){
    const fL = this.formLogin.value;
    const fRV = this.formLogin;
    const error = document.getElementsByClassName("is-invalid");
    
    if (error.length > 0 ||
      fRV.controls.email.untouched) {
    alert("Por favor, ingrese los datos...")
    return
  }
    console.log(fL);
    this.servicio.login(fL.email, fL.password)
    .then(response => {
      console.log(response)
      this.submitted = true;
      this.router.navigate(["/menuPrincipal"])
      this.toastr.success("El usuario ha sido logueado con exito", "Usuario Logueado")

      let login = this.login
      login = true;
      this.newLoginEvent.emit(login)
      
    })
    .catch(e => {
      console.log(e);
      this.toastr.error("El usuario no ha sido logueado con exito", "Error")
    })
  }



 //   h@hotmail.com
 
 //   123456



}
