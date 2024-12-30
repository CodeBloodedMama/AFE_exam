import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-count.component.html',
  styleUrls: ['./display-count.component.scss']
})
export class DisplayCountComponent {
  @Input() count: number | undefined;
}
