import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITurno } from '../models/Turno'; 

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private firestore: Firestore) { }

  registrar(turno){
    const turnoDocRef = collection(this.firestore, "turnos");
    return addDoc(turnoDocRef, turno)
  }
  
  obtenerTurno(): Observable<ITurno[]>{
    const turnoDocRef = collection(this.firestore, "turnos");
    return collectionData(turnoDocRef, {idField: "_id"}) as Observable<ITurno[]>
  }

}
