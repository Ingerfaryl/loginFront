import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule],
  templateUrl: './reportes.html',
})
export class Reportes {

}