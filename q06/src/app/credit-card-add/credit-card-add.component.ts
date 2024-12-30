import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreditCard } from '../credit-card/model';
import { CreditCardService } from '../services/credit-card.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-credit-card-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.scss'],
})
export class CreditCardAddComponent {
  creditCardForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private creditCardService: CreditCardService,
    private location: Location
  ) {}

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      card_number: [
        '',
        {
          validators: [
            Validators.minLength(7),
            Validators.maxLength(16),
            Validators.required,
            Validators.pattern('^[0-9]*$'),
          ],
        },
      ],
      cardholder_name: [
        '',
        {
          validators: [Validators.maxLength(100), Validators.required],
          updateOn: 'blur',
        },
      ],
      csc_code: [
        '',
        {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.required,
          ],
        },
      ],
      expiration_date_month: [
        new Date().getMonth() + 1,
        {
          validators: [
            Validators.min(1),
            Validators.max(12),
            Validators.required,
          ],
        },
      ],
      expiration_date_year: [
        new Date().getFullYear(),
        {
          validators: [
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.required,
          ],
        },
      ],
      issuer: [
        '',
        {
          validators: [Validators.maxLength(100)],
        },
      ],
    });
  }

  formToCreditCard(form: FormGroup) {
    const creditCard: CreditCard = {
      card_number: form.get('card_number')?.value,
      cardholder_name: form.get('cardholder_name')?.value,
      csc_code: form.get('csc_code')?.value,
      expiration_date_month: form.get('expiration_date_month')?.value,
      expiration_date_year: form.get('expiration_date_year')?.value,
      issuer: form.get('issuer')?.value,
    };
    return creditCard;
  }

  onSubmit() {
    console.log(this.creditCardForm.value);
    this.creditCardService
      .postCreditCard(this.formToCreditCard(this.creditCardForm))
      .subscribe();
    this.location.back();
  }

  onAutoFill() {
    this.creditCardForm.patchValue({
      card_number: '1234567890123456',
      cardholder_name: 'John Doe',
      csc_code: '420',
      expiration_date_month: '12',
      expiration_date_year: '2024',
      issuer: 'MSO',
    });
  }
}
