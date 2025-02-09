import { Component, OnInit } from '@angular/core';
import { JsoncarreraconformadaService } from '../services/jsoncarreraconformada.service';
import { Palmares } from '../interfaces/palmares/palmares';
import { Corredor } from '../interfaces/palmares/corredor';

@Component({
  selector: 'app-vista-palmares',
  templateUrl: './vista-palmares.component.html',
  styleUrls: ['./vista-palmares.component.css']
})
export class VistaPalmaresComponent implements OnInit {
  seasons: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];
  selectedSeason: number = 2020;
  palmares = {} as Palmares;

  constructor(
    private readonly jsoncarrera: JsoncarreraconformadaService
  ) { }

  ngOnInit(): void {
    this.obtenerPalmaresSelectoPorTemporada(this.selectedSeason);
  }

  obtenerPalmaresSelectoPorTemporada(id: number) {
    const idString = id.toString();
    const idNumber = parseInt(idString);
    this.jsoncarrera.getPalmaresSelectoPorTemporada(idNumber).subscribe((data) => {
      this.palmares = data;
    });
  }

  toggleShowAll(corredor: Corredor): void {
    corredor.showAll = !corredor.showAll;
    this.getDisplayedLogros(corredor);
  }

  getDisplayedLogros(corredor: Corredor): any[] {
    return corredor.logros.length > 3 && !corredor.showAll ? corredor.logros.slice(0, 3) : corredor.logros;
  }
}