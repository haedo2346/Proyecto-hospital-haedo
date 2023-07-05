import { IEspecialista } from "./Especialista";
import { IPaciente } from "./Paciente";

export interface ITurno{
    _id: string,
    fechaTurno: string,
    
    diaSemana: string,
    especialista: IEspecialista,
    horario: string[],
    paciente: IPaciente
}