import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'Registrarse',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  constructor(
    private servicio: LoginService, 
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router:Router){}
  
  formRegistrar: FormGroup;

  ngOnInit(): void {
    this.formRegistrar = this.formBuilder.group({
      email: [null, [Validators.minLength(1), Validators.required]], 
      password: [null, [Validators.minLength(1), Validators.required]]
    })
  }

  submitted = false


  onSubmit(){
    const fR = this.formRegistrar.value;
    const fRV = this.formRegistrar;
    const error = document.getElementsByClassName("is-invalid");
    
    if (error.length > 0 ||
      fRV.controls.email.untouched ||
      fRV.controls.password.untouched) {
    alert("Por favor, ingrese los datos...")
    return
  }
    console.log(fR)
    this.servicio.register(fR.email,fR.password)
    .then(response =>{
      console.log(response);
      this.submitted = true;
      this.toastr.success("El usuario ha sido registrado con exito", "Usuario Registrado");
      this.router.navigate(["/login"]);
      
    })
    .catch(e => {
      console.log(e)
      this.toastr.error("El usuario no ha sido registrado con exito", "Error")
    })

  }
    
            
  
}
