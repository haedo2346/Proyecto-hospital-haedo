import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/Registrarse/login.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Login2Component } from './components/login/login2.component';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ArticulosComponent } from './components/articulos/articulos.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { EditarArticulosComponent } from './components/editar-articulos/editar-articulos.component';
import { MenuPrincipalComponent } from './extra/menu-principal/menu-principal.component';
import { RegistrarClienteComponent } from './extra/registrar-cliente/registrar-cliente.component';
import { TurnosComponent } from './extra/turnos/turnos.component';
import { RegistrarEspecialistaComponent } from './extra/registrar-especialista/registrar-especialista.component';
import { RegistrarEspecialidadComponent } from './extra/registrar-especialidad/registrar-especialidad.component';
import {MatSliderModule} from '@angular/material/slider';
import { AgendaComponent } from './extra/agenda/agenda.component';
import { RegistrarDisponibilidadComponent } from './extra/registrar-disponibilidad/registrar-disponibilidad.component';
import { HistorialMedicoComponent } from './extra/historial-medico/historial-medico.component';
import { ConsultarHistorialMedicoComponent } from './extra/consultar-historial-medico/consultar-historial-medico.component';
import { CobroComponent } from './extra/cobro/cobro.component';
import { EstadisticaComponent } from './extra/estadistica/estadistica.component';
import {MatDividerModule} from '@angular/material/divider';
import { NgChartsModule,  NgChartsConfiguration} from 'ng2-charts';
import { ConsultarEspecialidadesComponent } from './extra/consultar-especialidades/consultar-especialidades.component';
import { ConsultarEspecialistasComponent } from './extra/consultar-especialistas/consultar-especialistas.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Login2Component,
    
    ArticulosComponent,
    EditarArticulosComponent,
    MenuPrincipalComponent,
    RegistrarClienteComponent,
    TurnosComponent,
    RegistrarEspecialistaComponent,
    RegistrarEspecialidadComponent,
    AgendaComponent,
    RegistrarDisponibilidadComponent,
    HistorialMedicoComponent,
    ConsultarHistorialMedicoComponent,
    CobroComponent,
    EstadisticaComponent,
    ConsultarEspecialidadesComponent,
    ConsultarEspecialistasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    RouterModule.forRoot([
      {path: "registrarse", component: LoginComponent},
      {path: "login", component: Login2Component},

      {path: "menuPrincipal", component: MenuPrincipalComponent},
      {path: "agenda", component: AgendaComponent},
      {path: "cobro", component: CobroComponent},
      {path: "registrarHM", component: HistorialMedicoComponent},
      {path: "consultarHM", component: ConsultarHistorialMedicoComponent},
      {path: "registrarCliente", component: RegistrarClienteComponent},
      {path: "registrarEspecialidad", component: RegistrarEspecialidadComponent},
      {path: "registrarEspecialista", component: RegistrarEspecialistaComponent},
      {path: "turnos", component: TurnosComponent},
      {path: "estadistica", component: EstadisticaComponent},
      {path: "consultarEspecialidades", component: ConsultarEspecialidadesComponent},
      {path: "consultarEspecialistas", component: ConsultarEspecialistasComponent},
      

      {path: "articulos", component: ArticulosComponent},
      {path: "editarArticulos/:id", component: ArticulosComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      
    ]),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({

    }
    ),
    provideFirestore(() => getFirestore()),
    FormsModule,
    MatSliderModule,
    MatDividerModule,
    NgChartsModule,
  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: true }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
