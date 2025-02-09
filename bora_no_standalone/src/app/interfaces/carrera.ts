import { Pais } from "./pais";

export interface Carrera {
    nombre: string;
    id: number;
    categoria: string;
    worldtour: boolean;
    prioridad: number;
    bandera: string;
    pais: Pais;
}

/*"nombre": "GP Denain - Porte du Hainaut",
"categoria": "1.HC",
"worldtour": false,
"prioridad": 10,
"$$hashKey": "011Z",
"bandera": "francia"/*/