import { Component, computed, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/core/design-system/services/theme.service';
import { MenuComponent } from 'src/app/displays/common/components/menu.component';
import { UiDropdownItem } from 'src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model';
import { UiNestedDropdown } from 'src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model';
import { UiNestedDropdownActionsComponent } from 'src/app/ui/components/ui-nested-dropdown-actions/ui-nested-dropdown-actions.component';
import { AiFacadeService } from 'src/app/features/ai/facades/ai.facade';

@Component({
  selector: 'rentx-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false
})
export class MenuDesktopComponent extends MenuComponent {

  @ViewChild('dashboardMenu') dashboardMenu!: ElementRef;
  dropDownTrigger = {
    value: 'Menu',
    label: ''
  }

  dropdown: UiNestedDropdown = {
    label: { title: { label: ''}},
    list: [
      {
        label: { title: { label: 'déconnexion'}, command: () => this.logout()},
      },
      {
        label: { title: { label: 'thème'}},
        list: [
          {
            label: { title: { label: 'dark'}, command: () => this.themeService.setMode('dark')},
          },
          {
            label: { title: { label: 'light'}, command: () => this.themeService.setMode('light')},
          }
        ]
      }
    ]
  };

  // dropDown: UiDropdownItem<any>[] = [
  //   {
  //     label: 'déconnexion',
  //     value: 'logout',
  //     command: () => this.logout()
  //   },
  //   {
  //     label: 'thème',
  //     value: [
  //       {
  //         label: 'mode',
  //         value: [
  //           {
  //             label: 'jour',
  //             value: 'light',
  //             command: () => this.themeService.setMode('light')
  //           },
  //           {
  //             label: 'nuit',
  //             value: 'dark',
  //             command: () => this.themeService.setMode('dark')
  //           }
  //         ]
  //       },
  //       {
  //         label: 'default',
  //         value: 'default',
  //         command: () => this.themeService.setTheme('default')
  //       },
  //       {
  //         label: 'pink',
  //         value: 'pink',
  //         command: () => this.themeService.setTheme('pink')
  //       }
  //     ]
  //   }
  // ];

  tokens = this.aiFacade.getTokens();
  displayTokens = computed(() => this.tokens() ? this.tokens()/10000 : null);
  isAiActive = this.aiFacade.getActive();

  constructor(
    protected override store: Store,
    protected override themeService: ThemeService,
    private elRef: ElementRef,
    private aiFacade: AiFacadeService
  ) {
    super(store, themeService);
    this.updateMenuSize();
  }

  updateMenuSize() {
    const observer = new MutationObserver(mutations => {
      const validMutations = mutations.filter(m => m.type === 'childList' && (m.addedNodes.length > 0 || m.removedNodes.length > 0));
      if (validMutations.length > 0) {
        setTimeout(() => {
          const width = this.calculateMenuSize();
          this.dashboardMenu.nativeElement.style.width = `${width}px`;
        }, 400);
      }
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
  }

  calculateMenuSize(){

    const dashboardContent = document.querySelector('.dashboard-content');
    const container = dashboardContent?.childNodes[1] ;
    const gap = parseFloat(getComputedStyle(container as any)?.gap) || 0;

    const width = Array.from(container?.childNodes || []).reduce((acc, child) => {
      return acc + ((child as HTMLElement)?.offsetWidth || 0) + gap;
    }, 0);

    return width;
  }

}
