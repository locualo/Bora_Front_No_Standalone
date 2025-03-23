import { Categoria } from "./categoria";
import { NumeroTemporada } from "./numero-temporada";

export interface Logro {
    carrera: string;
    codigoCarrera: number;
    bandera: string;
    categoria: Categoria;
    //etapa
    numero: number;
    etapas: string;
    numeroTemporada: NumeroTemporada[];
    //NoEtapa
    ediciones: number[];
    edicionString: string;
    //puestometro
    puesto: number;
    temporada: number;
}