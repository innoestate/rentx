import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";
import { Prospection_Dto } from "src/app/prospections/models/prospection.dto.model";
import { ProspectionDtoMock1, ProspectionDtoMock2, ProspectionDtoMock3 } from "../../../test/mocks/prospections.dto.mock";

@Injectable({
  providedIn: 'root'
})
export class ProspectionHttpFailUpdateMockService {

  private mockProspections: Prospection_Dto[] = [
    ProspectionDtoMock1,
    ProspectionDtoMock2,
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
    return of(prospection).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to update prospection');
      })
    )
  }

  delete(id: string): Observable<void> {
    const index = this.mockProspections.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProspections.splice(index, 1);
    }
    return of(void 0);
  }
}
