import { Component } from '@angular/core';
import { EstatePage } from 'src/app/common/pages/estates.page.component';
import { Estate } from 'src/app/core/models/estate.model';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrl: './estates.component.scss'
})
export class EstatesPageDesktopComponent extends EstatePage {}
