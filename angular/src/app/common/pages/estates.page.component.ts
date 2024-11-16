import { Directive, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEstates } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';

@Directive()
export class EstatePage implements OnInit {

  constructor(protected store: Store){}

  ngOnInit(): void {
    this.store.dispatch(loadEstates());
  }

  estates = this.store.selectSignal(selectEstates);

}
