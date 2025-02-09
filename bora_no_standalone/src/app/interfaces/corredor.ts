import { Pais } from "./pais";

export interface Corredor {
    id: number;
    nombre: string;
    foto: string;
    pais: Pais;
}
