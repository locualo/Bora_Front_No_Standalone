import { Component } from '@angular/core';
import { JsoncarreraconformadaService } from '../services/jsoncarreraconformada.service';
import { RequestRecCarr } from '../interfaces/carreras/requestRecCarr';
import { ResponseRecCarr } from '../interfaces/carreras/responseRecCarr';
import { JsoncorredorService } from '../services/jsoncorredor.service';
import { ResponseRecCorr } from '../interfaces/corredor/responseRecCorr';
import { banderas } from '../interfaces/constants';
import { Corredor } from '../interfaces/corredor';

@Component({
  selector: 'app-anadir-logro',
  templateUrl: './anadir-logro.component.html',
  styleUrl: './anadir-logro.component.css'
})
export class AnadirLogroComponent {
  req = {} as RequestRecCarr;
  res = {} as ResponseRecCarr;
  responseCorredores = {} as ResponseRecCorr;
  logro = ['Victoria', 'Puestometro'];
  posicion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedLogro: string = 'Victoria';
  selectedPos: number = 1;
  isEtapa: boolean = false;
  isITT: boolean = false;
  bandera: string = '';
  banderaCarrera: string = '';
  corredorActivo: Corredor = {} as Corredor;
  asignada: boolean = false;

  ngOnInit(): void {
    this.recuperarCarreras();
    this.recuperarCorredores();
  }

  constructor(
    private readonly jsoncarrera: JsoncarreraconformadaService,
    private readonly jsoncorredor: JsoncorredorService
  ) { }

  recuperarCarreras(): void {
    this.req.idCategoria = null;
    this.req.worldTour = false;
    this.jsoncarrera.getCarreraconformada(this.req).subscribe((data) => {
      this.res = data;
      this.pintarBanderaCarrera(this.res.carreras[0]);
    });
  }

  recuperarCorredores(): void {
    this.jsoncorredor.getCorredor().subscribe((data) => {
      this.responseCorredores = data;
      this.pintarBandera(this.responseCorredores.corredores[0]);
    });
  }

  pintarBandera(event: any): void {
    this.asignada = false;
    const selectedCorredorId = event.target ? event.target.value : event.id;
    const selectedCorredor = this.responseCorredores.corredores.find(corredor => corredor.id === +selectedCorredorId);
    if (selectedCorredor) {
      banderas.forEach((band) => {
        if (selectedCorredor.pais.codigo === band.codigo) {
          this.bandera = band.bandera;
          this.asignada = true;
        }
      });
    }

    if(!this.asignada) {
      this.bandera = 'https://i.pinimg.com/originals/34/a2/18/34a21875aef565bdf426b8da2199c437.jpg';
    }
  }

  pintarBanderaCarrera(event: any): void {
    this.asignada = false;
    const selectedCarreraId = event.target ? event.target.value : event.id;
    const selectedCarrera = this.res.carreras.find(carrera => carrera.id === +selectedCarreraId);
    if (selectedCarrera) {
      banderas.forEach((band) => {
        if (selectedCarrera.pais.codigo === band.codigo) {
          this.banderaCarrera = band.bandera;
          this.asignada = true;
        }
      });
    }

    if(!this.asignada) {
      this.bandera = 'https://i.pinimg.com/originals/34/a2/18/34a21875aef565bdf426b8da2199c437.jpg';
    }
  }
}
