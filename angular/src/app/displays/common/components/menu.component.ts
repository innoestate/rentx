import { Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/core/design-system/services/theme.service';
import { selectUser } from 'src/app/features/user/data/ngrx/user.selectors';

@Directive()
export class MenuComponent {

  user = this.store.selectSignal(selectUser);

  constructor(private store: Store, protected themeService: ThemeService) {}

  logout() {
    this.store.dispatch({ type: '[User] Log Out' });
  }

}
