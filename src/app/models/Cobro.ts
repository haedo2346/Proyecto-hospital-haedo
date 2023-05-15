import { IPaciente } from "./Paciente";

export interface ICobro{
    fecha: string,
    especialidad: string,
    paciente: string,
    formaPago: string,
    monto: number
}