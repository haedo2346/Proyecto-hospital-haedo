import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IEspecialista } from '../models/Especialista';

@Injectable({
  providedIn: 'root'
})

export class EspecialistasService {

  constructor(private firestore: Firestore) { }


  registrar(especialista: IEspecialista){
    const especialistaDocRef = collection(this.firestore, "especialistas");
    return addDoc(especialistaDocRef, especialista)
  }
  
  obtenerEspecialistas(): Observable<IEspecialista[]>{
    const especialistaRef = collection(this.firestore, "especialistas");
    return collectionData(especialistaRef, {idField: "_id"}) as Observable<IEspecialista[]>
  }

}
