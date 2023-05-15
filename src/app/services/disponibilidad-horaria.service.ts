import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IDisponibilidadHoraria } from '../models/disponibilidadHoraria';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadHorariaService {
  
  constructor(private firestore: Firestore) { }


  registrar(disponibilidadHoraria: {}){
    const dispHorariaDocRef = collection(this.firestore, "disponibilidadHoraria");
    return addDoc(dispHorariaDocRef, disponibilidadHoraria)
  }
  
  obtenerDisponibilidad(): Observable<IDisponibilidadHoraria[]>{
    const dispHorariaDocRef = collection(this.firestore, "disponibilidadHoraria");
    return collectionData(dispHorariaDocRef, {idField: "_id"}) as Observable<IDisponibilidadHoraria[]>
  }

}
