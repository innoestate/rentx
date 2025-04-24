import { Injectable, model } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class Pagination {

  protected displayedTotal$ = new BehaviorSubject<number>(0);
  protected displayedTotal = toSignal(this.displayedTotal$);

  setTotal(){
    this.displayedTotal$.next(this.displayedTotal()!);
  }

  getPageNumber(rows: number, rowsPerPage: number): number {
    if (!this.displayedTotal()) return Math.ceil(rows / rowsPerPage as any);
    return Math.ceil(this.displayedTotal()! / rowsPerPage);
  }

}