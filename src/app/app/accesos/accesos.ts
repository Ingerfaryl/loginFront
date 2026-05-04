import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-accesos',
  imports: [FormsModule, DatePickerModule],
  templateUrl: './accesos.html',
  styleUrl: './accesos.css',
})
export class Accesos {
  date: Date | undefined;
}
