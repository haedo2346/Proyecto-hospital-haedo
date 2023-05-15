import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { IArticulo } from "../models/Articulo";
import { Observable } from 'rxjs';
import { IPaciente } from '../models/Paciente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private firestore: Firestore) { }


  registrar(paciente: IPaciente){
    const pacienteDocRef = collection(this.firestore, "pacientes");
    return addDoc(pacienteDocRef, paciente)
  }
  
  obtenerPacientes(): Observable<IPaciente[]>{
    const pacienteDocRef = collection(this.firestore, "pacientes");
    return collectionData(pacienteDocRef, {idField: "_id"}) as Observable<IPaciente[]>
  }


}
