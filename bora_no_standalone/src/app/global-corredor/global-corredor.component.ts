import { Component } from '@angular/core';
import { Carrera } from '../interfaces/carrera';
import { Corredor } from '../interfaces/corredor';
import { Victoria } from '../interfaces/victoria';
import { JsoncorredorService } from '../services/jsoncorredor.service';
import { JsoncarreraconformadaService } from '../services/jsoncarreraconformada.service';
import { JsonvictoriaService } from '../services/jsonvictoria.service';
import { banderas } from '../interfaces/constants';
import { Palmares } from '../interfaces/palmares/palmares';

@Component({
  selector: 'app-global-corredor',
  templateUrl: './global-corredor.component.html',
  styleUrl: './global-corredor.component.css'
})
export class GlobalCorredorComponent {
  title = 'bora';
  corredores: Corredor[] = [];
  corredor = {} as Corredor
  carreras: Carrera[] = [];
  carrera = {} as Carrera;
  victorias: Victoria[] = [];
  victoria = {} as Victoria;
  victoriascorredor: Victoria[] = [];
  hiddenCarrera: boolean = true;
  corredorelegido = {} as Corredor;
  banderas = banderas;
  palmares: Palmares[] = [];

  constructor(
    private readonly jsoncorredor: JsoncorredorService,
    private readonly jsoncarrera: JsoncarreraconformadaService,
    private readonly jsonvictoria: JsonvictoriaService) { }


  ngOnInit(): void {
    //this.obtenerPalmaresSelectoPorTemporada(2027);
    /*this.obtenerCorredores();
    this.obtenerCarreras();
    this.obtenerVictorias();*/
  }

  sortCarrerasBy() {
    return this.carreras.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      } else if (a.nombre < b.nombre) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  sortCorredoresBy() {
    return this.corredores.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      } else if (a.nombre < b.nombre) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  clicar() {
    this.hiddenCarrera = false;
  }

  cargarPerfil(id: number) {
    console.log(id);
    this.victoriascorredor = [];
    this.victorias.forEach(vic => {
      if (vic.corredorid == id) {
        const carreracruce = this.carreras.find(carrera => carrera.nombre == vic.carreranombre);
        if (carreracruce) {
          const banderaObj = this.banderas.find(bandera => bandera.pais == carreracruce.bandera);
          if (banderaObj) {
            vic.bandera = banderaObj.bandera;
          }
        }
        this.victoriascorredor.push(vic);
      }
      this.sortVictoriasBy();
    });
  }

  obtenerCorredores() {
    this.jsoncorredor.getCorredor().subscribe((corr) => {
      for (const corredor of corr) {
        this.corredores.push(corredor);
      }
      this.sortCorredoresBy();
      this.corredorelegido = this.corredores[0];
    });
  }

  obtenerCarreras() {
    this.jsoncarrera.getCarreraconformada().subscribe((car) => {
      for (const carrera of car) {
        this.carreras.push(carrera);
      }
      this.sortCarrerasBy();
    });
  }

  obtenerVictorias() {
    this.jsonvictoria.getVictoria().subscribe((vir) => {
      for (const victoria of vir) {
        this.victorias.push(victoria);
      }
      this.sortCarrerasBy();
    });
  }

  sortVictoriasBy() {
    return this.victoriascorredor.sort((a, b) => {
      if (a.carreraprioridad > b.carreraprioridad) {
        return 1;
      } else if (a.carreraprioridad < b.carreraprioridad) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  obtenerPalmaresSelectoPorTemporada(id: number) {
    this.jsoncarrera.getPalmaresSelectoPorTemporada(id).subscribe((pal) => {
      this.palmares.push(pal);
    });
    console.log(this.palmares);
  }
}
