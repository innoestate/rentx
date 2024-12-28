import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProspections } from 'src/app/core/store/prospections.actions';
import { selectAllProspections } from 'src/app/core/store/prospections.selectors';

@Component({
  selector: 'app-prospections',
  templateUrl: './prospections.template.html',
  styleUrls: ['./prospections.component.css']
})
export class ProspectionsDesktopComponent {

  prospections = this.store.selectSignal(selectAllProspections);

  constructor(private store: Store) {
    this.store.dispatch(loadProspections());
  }

}
