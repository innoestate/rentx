import { Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/core/store/user/user.selectors';

@Directive()
export class MenuComponent {

  user = this.store.selectSignal(selectUser);

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch({ type: '[User] Log Out' });
  }

}
