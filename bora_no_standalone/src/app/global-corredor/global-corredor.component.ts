import { Component } from '@angular/core';
import { JsoncorredorService } from '../services/jsoncorredor.service';
import { JsoncarreraconformadaService } from '../services/jsoncarreraconformada.service';
import { banderas, categoria_gv, categoria_major, categoria_minor, categoria_monumento, categoria_tour, clasic1, clasic2, logos_carrera, nc, temporadas } from '../interfaces/constants';
import { Palmares } from '../interfaces/palmares/palmares';
import { ResponseRecCorr } from '../interfaces/corredor/responseRecCorr';
import { RequestLogrosPorCorredor } from '../interfaces/corredor/requestLogrosPorCorredor';
import { Logro } from '../interfaces/corredor/logro';
import { Puestometro } from '../interfaces/corredor/puestometro';

@Component({
  selector: 'app-global-corredor',
  templateUrl: './global-corredor.component.html',
  styleUrl: './global-corredor.component.css'
})
export class GlobalCorredorComponent {
  banderas = banderas;
  palmares: Palmares[] = [];
  responseCorredores = {} as ResponseRecCorr;
  corredor: number = 0;
  asignada: boolean = false;
  bandera: string = '';
  requestLogrosPorCorredor: RequestLogrosPorCorredor = {} as RequestLogrosPorCorredor;
  victoria: Logro[] = [];
  newVictoria: Logro = {} as Logro;

  puestometroMonumentos: Puestometro[] = [];
  puestometroGV: Puestometro[] = [];
  puestometroMajor: Puestometro[] = [];
  puestometroMinor: Puestometro[] = [];
  puestometroClasicas: Puestometro[] = [];
  monumentoEncontrado: boolean = false;

  seasons: string[] = ['Global', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];
  selectedSeason: string = 'Global';

  constructor(
    private readonly jsoncorredor: JsoncorredorService,
    private readonly jsoncarrera: JsoncarreraconformadaService) { }


  ngOnInit(): void {
    this.recuperarCorredores();
  }

  recuperarCorredores(): void {
    this.jsoncorredor.getCorredor().subscribe((data) => {
      this.responseCorredores = data;
      this.corredor = this.responseCorredores.corredores[0].id;
      this.pintarBandera(this.responseCorredores.corredores[0]);
      this.cargarPerfil(this.corredor, 'Global');
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

    if (!this.asignada) {
      this.bandera = 'https://i.pinimg.com/originals/34/a2/18/34a21875aef565bdf426b8da2199c437.jpg';
    }
  }

  cargarPerfil(id: number, temporada: string): void {
    this.victoria = [];
    this.puestometroMonumentos = [];
    this.puestometroGV = [];
    this.puestometroMajor = [];
    this.puestometroMinor = [];
    this.puestometroClasicas = [];
    this.requestLogrosPorCorredor.idCorredor = id;

    this.jsoncarrera.getLogrosPorCorredor(this.requestLogrosPorCorredor).subscribe((data) => {
      data.logros.forEach((logro) => {
        if (logro.puesto == null &&
          (temporada === 'Global' ||
            (logro.ediciones != null && logro.ediciones.includes(Number(temporada))) ||
            (this.comprobarEtapasTemporada(logro, temporada))
          )) {
          this.newVictoria = {} as Logro;
          this.procesarVictoria(logro, temporada);
        } else if (logro.puesto != null &&
          (temporada === 'Global' ||
            logro.temporada === Number(temporada)
          )) {
          this.procesarPuestometro(logro);
        }
      });
      this.sortVictoria();
      this.sortPuestometro();
    });
  }

  comprobarEtapasTemporada(logro: Logro, temporada: string): boolean {
    if (temporada === 'Global' && logro.numero != null) {
      return true;
    }

    if (logro.numeroTemporada != null) {
      for (const numTemp of logro.numeroTemporada) {
        if (numTemp.temporada === Number(temporada)) {
          return true;
        }
      }
    }
    return false;
  }

  asignarBandera(codigoCarrera: number): string {
    for (const band of banderas) {
      if (codigoCarrera === band.codigo) {
        return band.bandera;
      }
    }
    return ''; // Retorna una cadena vacía si no se encuentra la bandera
  }

  asignarLogo(carrera: string): string {
    for (const logo of logos_carrera) {
      if (carrera === logo.carrera) {
        return logo.logo;
      }
    }
    return ''; // Retorna una cadena vacía si no se encuentra la bandera
  }

  procesarVictoria(logro: Logro, temporada: string): void {
    this.newVictoria = {} as Logro;
    this.newVictoria.carrera = logro.carrera;
    this.newVictoria.categoria = logro.categoria;
    this.newVictoria.bandera = this.asignarBandera(logro.codigoCarrera);

    if (logro.numero != null && temporada === 'Global') {
      if (logro.numero > 1) {
        this.newVictoria.etapas = logro.numero + ' etapas';
      } else {
        this.newVictoria.etapas = logro.numero + ' etapa';
      }
    } else if (this.comprobarEtapasTemporada(logro, temporada)) {
      logro.numeroTemporada.forEach((numTemp) => {
        if (numTemp.temporada === Number(temporada)) {
          if (numTemp.numero > 1) {
            this.newVictoria.etapas = numTemp.numero + ' etapas';
          } else {
            this.newVictoria.etapas = numTemp.numero + ' etapa';
          }
        }
      });
    } else if (logro.ediciones != null) {
      if (temporada === 'Global') {
        this.newVictoria.edicionString = 'x' + logro.ediciones.length + ' (';
        logro.ediciones.forEach((edicion, index) => {
          // Verifica si es la última iteración
          if (index === logro.ediciones.length - 1) {
            this.newVictoria.edicionString += edicion + ')'; // Cierra la cadena si es la última iteración
          } else {
            this.newVictoria.edicionString += edicion + " - "; // Agrega un separador si no es la última iteración
          }
        });
      }
    }

    this.victoria.push(this.newVictoria);
  }

  procesarPuestometro(logro: Logro): void {
    this.puestometroMonumentos = this.puestometroMonumentos || [];
    if (logro.categoria.id === categoria_monumento) {
      const monumento = this.puestometroMonumentos.find(mon => mon.carrera === logro.carrera);
      if (monumento) {
        this.asignarPuestoPorTemporada(logro, monumento);
      } else {
        const nuevoPuestometro = this.crearNuevoPuestometro(logro);
        this.puestometroMonumentos.push(nuevoPuestometro);
      }
    } else if (logro.categoria.id === categoria_gv || logro.categoria.id === categoria_tour) {
      const gv = this.puestometroGV.find(gv => gv.carrera === logro.carrera);
      if (gv) {
        this.asignarPuestoPorTemporada(logro, gv);
      } else {
        const nuevoPuestometro = this.crearNuevoPuestometro(logro);
        this.puestometroGV.push(nuevoPuestometro);
      }
    } else if (logro.categoria.id === categoria_major) {
      const major = this.puestometroMajor.find(major => major.carrera === logro.carrera);
      if (major) {
        this.asignarPuestoPorTemporada(logro, major);
      } else {
        const nuevoPuestometro = this.crearNuevoPuestometro(logro);
        this.puestometroMajor.push(nuevoPuestometro);
      }
    } else if (logro.categoria.id === categoria_minor) {
      const minor = this.puestometroMinor.find(minor => minor.carrera === logro.carrera);
      if (minor) {
        this.asignarPuestoPorTemporada(logro, minor);
      } else {
        const nuevoPuestometro = this.crearNuevoPuestometro(logro);
        this.puestometroMinor.push(nuevoPuestometro);
      }
    } else if (logro.categoria.id === clasic1 || logro.categoria.id === clasic2 ||
      logro.categoria.id === nc) {
      const clasicas = this.puestometroClasicas.find(clasica => clasica.carrera === logro.carrera);
      if (clasicas) {
        this.asignarPuestoPorTemporada(logro, clasicas);
      } else {
        const nuevoPuestometro = this.crearNuevoPuestometro(logro);
        this.puestometroClasicas.push(nuevoPuestometro);
      }
    }

  }

  crearNuevoPuestometro(logro: Logro): Puestometro {
    const nuevoPuestometro = {} as Puestometro;
    nuevoPuestometro.carrera = logro.carrera;
    nuevoPuestometro.bandera = this.asignarBandera(logro.codigoCarrera);
    nuevoPuestometro.logo = this.asignarLogo(logro.carrera);
    this.asignarPuestoPorTemporada(logro, nuevoPuestometro);
    return nuevoPuestometro;
  }

  asignarPuestoPorTemporada(logro: Logro, monumento: Puestometro): void {
    if (logro.temporada === temporadas[0]) {
      monumento.dosmilveinte = logro.puesto;
    } else if (logro.temporada === temporadas[1]) {
      monumento.dosmilveintiuno = logro.puesto;
    }
    else if (logro.temporada === temporadas[2]) {
      monumento.dosmilveintidos = logro.puesto;
    }
    else if (logro.temporada === temporadas[3]) {
      monumento.dosmilveintitres = logro.puesto;
    }
    else if (logro.temporada === temporadas[4]) {
      monumento.dosmilveinticuatro = logro.puesto;
    }
    else if (logro.temporada === temporadas[5]) {
      monumento.dosmilveinticinco = logro.puesto;
    }
    else if (logro.temporada === temporadas[6]) {
      monumento.dosmilveintiseis = logro.puesto;
    }
    else if (logro.temporada === temporadas[7]) {
      monumento.dosmilveintisiete = logro.puesto;
    }
  }

  sortVictoria(): void {
    this.victoria.sort((a, b) => {
      if (a.categoria.id < b.categoria.id) {
        return -1;
      }
      if (a.categoria.id > b.categoria.id) {
        return 1;
      }
      return 0;
    });
  }

  sortPuestometro(): void {
    this.puestometroMonumentos.sort((a, b) => {
      if (a.carrera < b.carrera) {
        return -1;
      }
      if (a.carrera > b.carrera) {
        return 1;
      }
      return 0;
    });
    this.puestometroGV.sort((a, b) => {
      if (a.carrera < b.carrera) {
        return -1;
      }
      if (a.carrera > b.carrera) {
        return 1;
      }
      return 0;
    });
    this.puestometroMajor.sort((a, b) => {
      if (a.carrera < b.carrera) {
        return -1;
      }
      if (a.carrera > b.carrera) {
        return 1;
      }
      return 0;
    });
    this.puestometroMinor.sort((a, b) => {
      if (a.carrera < b.carrera) {
        return -1;
      }
      if (a.carrera > b.carrera) {
        return 1;
      }
      return 0;
    });
    this.puestometroClasicas.sort((a, b) => {
      if (a.carrera < b.carrera) {
        return -1;
      }
      if (a.carrera > b.carrera) {
        return 1;
      }
      return 0;
    });
  }

  getBackgroundClass(value: number): string {
    if (value === 1) {
      return 'oro';
    } else if (value === 2) {
      return 'plata';
    } else if (value === 3) {
      return 'bronce';
    } else {
      return 'chocolate';
    }
  }

}
