import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss'],
})
export class TemplateDrivenComponent {

  onSubmit(userForm: NgForm) {
    // Do something with the form data here
    alert(
      'Submitted via template-driven form:\n' + JSON.stringify(userForm.value)
    );
  }
}
