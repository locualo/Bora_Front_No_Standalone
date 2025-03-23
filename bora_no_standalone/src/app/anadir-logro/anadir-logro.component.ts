import { Component } from '@angular/core';
import { JsoncarreraconformadaService } from '../services/jsoncarreraconformada.service';
import { RequestRecCarr } from '../interfaces/carreras/requestRecCarr';
import { ResponseRecCarr } from '../interfaces/carreras/responseRecCarr';
import { JsoncorredorService } from '../services/jsoncorredor.service';
import { ResponseRecCorr } from '../interfaces/corredor/responseRecCorr';
import { banderas } from '../interfaces/constants';
import { Corredor } from '../interfaces/corredor';
import { CreateVictoria } from '../interfaces/creates/createvictoria';
import { CreatePuestometro } from '../interfaces/creates/createpuestometro';
import { Posicion } from '../interfaces/creates/posicion';

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
  cp = {} as CreatePuestometro;
  cv = {} as CreateVictoria;
  pos = {} as Posicion;
  corredor: number = 0;
  carrera: number = 0;
  temporada: number = 0;
  seasons: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];
  selectedSeason: number = 2020;

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
      this.carrera = this.res.carreras[0].id;
      this.pintarBanderaCarrera(this.res.carreras[0]);
    });
  }

  recuperarCorredores(): void {
    this.jsoncorredor.getCorredor().subscribe((data) => {
      this.responseCorredores = data;
      this.corredor = this.responseCorredores.corredores[0].id;
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

  guardarVictoria(): void {
    this.pos.etapa = this.isEtapa
    this.pos.tt = this.isITT;
    this.pos.corredorid = this.corredor;
    this.pos.carreraid = this.carrera;
    this.pos.temporada = this.selectedSeason;
    this.cv.posiciones = [];
    this.cv.posiciones.push(this.pos);
    this.jsoncorredor.guardarVictoria(this.cv).subscribe({
      next: (data) => {
        alert('Operación exitosa: Victoria guardada');
      },
      error: (error) => {
        alert('Error: No se pudo guardar la victoria. Por favor, inténtalo de nuevo.');
        console.error('Error al guardar la victoria:', error);
      }
    });
  }

  guardarPuestometro(): void {
    this.pos.puesto = this.selectedPos;
    this.pos.corredorid = this.corredor;
    this.pos.carreraid = this.carrera;
    this.pos.temporada = this.selectedSeason;
    this.cp.posiciones = [];
    this.cp.posiciones.push(this.pos);
    this.jsoncorredor.guardarPuestometro(this.cp).subscribe({
      next: (data) => {
        alert('Operación exitosa: Puestometro guardado');
      },
      error: (error) => {
        alert('Error: No se pudo guardar el Puestometro. Por favor, inténtalo de nuevo.');
        console.error('Error al guardar el Puestometro:', error);
      }
    });
  }
}
