import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { IArticulo } from "../models/Articulo";
import { Observable } from 'rxjs';
import { IPaciente } from '../models/Paciente';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private firestore: Firestore) { }

  agregarArticulo(articulo:IArticulo){
    const artRef = collection(this.firestore, "articulos");
    return addDoc(artRef, articulo)
  }

  obtenerArticulos(): Observable<IArticulo[]>{
    const artRef = collection(this.firestore,"articulos");
    return collectionData(artRef, {idField: "_id"}) as Observable<IArticulo[]>
  }

  borrarArticulo(articulo:IArticulo){
    const artDocRef = doc(this.firestore, `articulos/${articulo._id}`)
    return deleteDoc(artDocRef);
  }

  modificarArticulo(articulo:IArticulo, data){
    const artDocRef = doc(this.firestore, `articulos/${articulo._id}`)
    return updateDoc(artDocRef, data)
  }

 


/*   retornaArticulos(snapshot){
    const articulos = [];
    snapshot.forEach(snapHijo => {
      articulos.push({
        _id: snapHijo.id,
        ...snapHijo.data()
      })
    });
    console.log(articulos)
    return articulos
  }  */

  
}
