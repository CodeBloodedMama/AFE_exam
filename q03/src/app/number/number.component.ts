import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent {
  number = 0;

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe((params) => {
      this.number = parseInt(params.get('number') || '0');
    });
  }
}
