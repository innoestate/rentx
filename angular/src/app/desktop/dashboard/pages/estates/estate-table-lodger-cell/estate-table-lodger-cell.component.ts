import { Component, OnInit } from '@angular/core';
import { LodgerComponent } from 'src/app/common/components/lodger.component';
import { MailOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'estate-table-lodger-cell',
  templateUrl: './estate-table-lodger-cell.component.html',
  styleUrl: './estate-table-lodger-cell.component.scss'
})
export class EstateTableLodgerCellComponent extends LodgerComponent implements OnInit {

  iconMail = MailOutline.icon;

  ngOnInit() {
    console.log("icons", this.iconMail);
  }

}
