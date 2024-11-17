import { Directive, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { loadEstates } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';

@Directive()
export class EstatePage implements OnInit {

  estates = this.store.selectSignal(selectEstates);

  constructor(protected store: Store, protected modalService: NzModalService) { }

  ngOnInit(): void {
    this.store.dispatch(loadEstates());
  }

}
