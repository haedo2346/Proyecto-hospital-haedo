import { Injectable } from '@angular/core';
import { ICobro } from '../models/Cobro';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CobrosService {

  constructor(private firestore: Firestore) { }

  registrar(cobro: ICobro){
    const cobroDocRef = collection(this.firestore, "cobro");
    return addDoc(cobroDocRef, cobro)
  }
  
  obtenerCobros(): Observable<ICobro[]>{
    const cobroDocRef = collection(this.firestore, "cobro");
    return collectionData(cobroDocRef, {idField: "_id"}) as Observable<ICobro[]>
  }


}
