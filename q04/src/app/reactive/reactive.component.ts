import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent {
  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private fb: FormBuilder) {}
  onSubmit() {
    // TODO: Use EventEmitter with form value
    alert(
      'Submitted via reactive form:\n' + JSON.stringify(this.userForm.value)
    );
  }
}
