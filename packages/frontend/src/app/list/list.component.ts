import { Component, Input } from '@angular/core';
import { Places } from '../app.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() places: Places[] = [];
}
