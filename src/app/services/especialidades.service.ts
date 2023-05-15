import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IEspecialidad } from '../models/Especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private firestore: Firestore) { }

  registrar(especialidad: IEspecialidad){
    const especialidadDocRef = collection(this.firestore, "especialidades");
    return addDoc(especialidadDocRef, especialidad)
  }
  
  obtenerEspecialidad(): Observable<IEspecialidad[]>{
    const especialidadRef = collection(this.firestore, "especialidades");
    return collectionData(especialidadRef, {idField: "_id"}) as Observable<IEspecialidad[]>
  }

}
