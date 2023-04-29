import { Component } from '@angular/core';
import { RegisterService } from '../../../auth/register.service';
import { RegistrationResponse } from 'src/app/auth/registration.response';
import { AuthService } from 'src/app/auth';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form!: FormGroup;
  spinner = false;

  get f() { return this.form.controls; }

  constructor(
    private authService: AuthService,
    private service: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      yearOfBirth: ['', [Validators.required, this.yearOfBirthValidator]]
    }, { validator: this.passwordsMatch });
  }

  private passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);

    if (hasUpperCase && hasLowerCase) {
      return null;
    }

    return { passwordStrength: true };
  }

  private passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  private yearOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const minYear = 1900;
    const maxYear = new Date().getFullYear() - 10;

    const value = control.value;

    if (value < minYear || value > maxYear) {
      return { yearOutOfRange: true };
    }

    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      this.register();
    }
  }

  private register() {
    const request = this.form.value;

    this.spinner = true;
    this.service.register(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe((res: RegistrationResponse) => {
        this.authService.saveToken(res.token)
        this.router.navigate(['/dashboard']);
      })
  }
}
