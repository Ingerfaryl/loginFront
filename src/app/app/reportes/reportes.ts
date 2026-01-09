import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {

}
