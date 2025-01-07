import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// this component is a standalone component that displays a count, 
// used in the app component to display the count 

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
