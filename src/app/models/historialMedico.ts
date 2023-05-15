import { IEspecialista } from "./Especialista"
import { IPaciente } from "./Paciente"

export interface IHistorialMedico{
    especialista: IEspecialista,
    paciente: IPaciente,
    fecha: string,
    hora: string,
    grupoSanguineo: string,
    genero: string,
    estadoCivil: string,
    ocupacion: string,
    domicilio: string,
    localidad: string,
    codigoPostal: string,
    heredoFamiliares: string,
    personales: string,
    alergicos: string,
    ginecoObstetricos: string,
    quirurgicos: string,
    motivo: string,
    diagnostico: string,
    examenFisico: string,
    tratamiento: string
}
 
 





