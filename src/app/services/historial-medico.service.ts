import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IHistorialMedico } from '../models/historialMedico';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {

  constructor(private firestore: Firestore) { }

  registrar(historialMedico: IHistorialMedico){
    const hMDocRef = collection(this.firestore, "historialMedico");
    return addDoc(hMDocRef, historialMedico);
  }

  obtenerHistoriaMedica(): Observable<IHistorialMedico[]>{
    const hMRef = collection(this.firestore, "historialMedico");
    return collectionData(hMRef, {idField:"_id"}) as Observable<IHistorialMedico[]>;
  }

}
