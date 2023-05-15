import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticulosService } from "../../services/articulos.service";
import { IArticulo } from "../../models/Articulo";
import { db } from "../../../firebase/config";



import { ToastrService } from "ngx-toastr";
import { startAfter } from '@angular/fire/firestore';

@Component({
  selector: 'articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit{

  articulos : IArticulo[]
  
  constructor(
    public formBuilder:FormBuilder,
    private servicio:ArticulosService,
    private toastr: ToastrService
    ){}
  
  
  ngOnInit(): void {
    this.formRegistro = this.formBuilder.group({
      nombre: [null], descripcion: [null], precio: [0]
    });
    this.formModificar = this.formBuilder.group({
      nombre: [null], descripcion: [null], precio: [0]
    })
    this.servicio.obtenerArticulos().subscribe(articulos => {
      this.articulos = articulos
      this.spinner = false
    })
  }


  
  
  opcionesABMC = {
    L: "Listado",
    A: "Agregar",
    M: "Modificar"
  }
  opcionActualABMC = "L";
  formRegistro:FormGroup;
  formModificar:FormGroup;
  busqueda = "";
  spinner = true;
  _id : string;
  nombre: string;
  descripcion: string;
  precio:number;
  articulo:IArticulo;

  


  async registrar(){
    const fR = this.formRegistro.value;
    console.log(fR);
    const response = await this.servicio.agregarArticulo(fR);
    this.toastr.success("El producto ha sido registrado con exito", "Producto registrado");
    this.spinner = false
  }
 
  async borrar(articulo: IArticulo){
    const res = await this.servicio.borrarArticulo(articulo)
    console.log(res)
    this.toastr.success("El producto ha sido borrado con exito", "Producto eliminado");
  }

  agregar(){
    this.opcionActualABMC = "A"
  }

  buscarRegistro(art:string){
    this.servicio.obtenerArticulos().subscribe(() => {
      for (let i = 0; i < Object.keys(this.articulos).length; i++) {
        if (this.articulos[i].nombre === art.toString()) {
          this.articulos = []
          this.articulos.push(this.articulos[i])
          console.log(this.articulos)
        }
        
      }
    })

  }

  
  regresar(){
  this.opcionActualABMC = "L"
}

modificar(articulo:IArticulo){
  this.opcionActualABMC = "M"
  this.cargarUpdate(articulo)
}

cargarUpdate(articulo){
  this._id = articulo._id
  this.nombre = articulo.nombre;
  this.descripcion = articulo.descripcion;
  this.precio = articulo.precio;
  this.articulo = {
    _id : this._id,
    nombre : this.nombre,
    descripcion : this.descripcion,
    precio : this.precio
  }
}

async update(){
  const fM = this.formModificar.value;
  const art = this.articulo;
  console.log(fM);
  const res = await this.servicio.modificarArticulo(art, fM);
  console.log(res);
  this.toastr.success("El producto ha sido actualizado con exito", "Producto actualizado");
  
}

// ---------------------------------------------------------------
/*  siguiente(){
  const btnNext = document.getElementById("btnNext")
  const articulosRef = db.collection("articulos");
  let lastDocument = null;
  btnNext.addEventListener("click",() => {
    const query =  articulosRef
      .orderBy("nombre")
    .startAfter(lastDocument);

    query.limit(2).get().then((snap) => {
    lastDocument = snap.docs[snap.docs.length - 1] || null;
    this.servicio.retornaArticulos(snap)  
    })
      })
        } */

 
}
