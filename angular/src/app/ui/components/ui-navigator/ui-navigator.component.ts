import { Component, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'ui-navigator',
  imports: [RouterModule],
  templateUrl: './ui-navigator.component.html',
  styleUrl: './ui-navigator.component.scss'
})
export class UiNavigatorComponent {

  label = input.required<string>();
  navigate = input.required<string>();

  constructor(private router: Router){}

  protected onNavigate(){
    this.router.navigate([this.navigate()]);
  }
}
