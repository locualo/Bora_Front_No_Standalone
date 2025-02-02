import { Logro } from './logro';

export interface Corredor {
    logros: Logro[];
    id: number;
    nombre: string;
    puntosTotales: number;
    showAll: boolean;
    foto: string;
}