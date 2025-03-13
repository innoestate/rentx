import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Prospection_Dto } from "src/app/prospections/models/prospection.dto.model";
import { ProspectionDtoMock1, ProspectionDtoMock2, ProspectionDtoMock3 } from "../mocks/prospections.dto.mock";

@Injectable({
  providedIn: 'root'
})
export class ProspectionHttpMockService {
  private mockProspections: Prospection_Dto[] = [
    ProspectionDtoMock1,
    ProspectionDtoMock2,
    ProspectionDtoMock3
  ];

  loadProspections(): Observable<Prospection_Dto[]> {
    return of(this.mockProspections);
  }

  createProspection(prospection: Prospection_Dto): Observable<Prospection_Dto> {
    const newProspection = {
      ...prospection,
      id: `mock-id-${this.mockProspections.length + 1}`
    };
    this.mockProspections.push(newProspection);
    return of(newProspection);
  }

  updateProspection(prospection: Partial<Prospection_Dto>): Observable<Partial<Prospection_Dto>> {
    const index = this.mockProspections.findIndex(p => p.id === prospection.id);
    if (index !== -1) {
      this.mockProspections[index] = {
        ...this.mockProspections[index],
        ...prospection
      };
      return of(this.mockProspections[index]);
    }
    return of(prospection);
  }

  deleteProspection(id: string): Observable<void> {
    const index = this.mockProspections.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProspections.splice(index, 1);
    }
    return of(void 0);
  }
}