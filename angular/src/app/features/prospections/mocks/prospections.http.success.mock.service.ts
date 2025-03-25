import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Prospection_Dto } from "src/app/features/prospections/models/prospection.dto.model";
import { prospectionDtoMock1, prospectionDtoMock2, ProspectionDtoMock3 } from "./prospections.dto.mock";

@Injectable({
  providedIn: 'root'
})
export class ProspectionHttpSuccessMockService {

  private mockProspections: Prospection_Dto[] = [
    prospectionDtoMock1,
    prospectionDtoMock2,
    ProspectionDtoMock3
  ];

  getAll(): Observable<Prospection_Dto[]> {
    return of(this.mockProspections);
  }

  create(prospection: Prospection_Dto): Observable<Prospection_Dto> {
    const newProspection = {
      ...prospection,
      id: `mock-id-${this.mockProspections.length + 1}`
    };
    this.mockProspections = [...this.mockProspections, newProspection];
    return of(newProspection);
  }

  update(id: string, prospection: Partial<Prospection_Dto>): Observable<Partial<Prospection_Dto>> {
    const index = this.mockProspections.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProspections = [...this.mockProspections ];
      this.mockProspections[index] = {
        ...this.mockProspections[index],
        ...prospection
      };
      return of(this.mockProspections[index]);
    }
    return of(prospection);
  }

  delete(id: string): Observable<void> {
    const newMock: any[] = []
    this.mockProspections.forEach( p => {
      if( p.id !== id) {
        newMock.push(p)
      }
    });
    this.mockProspections = newMock;
    return of(void 0);
  }
}
