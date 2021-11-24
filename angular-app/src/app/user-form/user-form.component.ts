import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  formSubmitted: boolean = false;
  message: string = 'loading...';
  genOtp: boolean = false;
  constructor(private api: ApiService, private router: Router) {}

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { value: form } = this.userForm;
    // const { name: name, phoneNumber: number } = form;
    // console.log(name, number);
    this.formSubmitted = true;
    console.log(form);
    this.api.createUser(form).subscribe(
      (res) => {
        this.message = res.message;
        this.genOtp = true;
      },
      (err) => {
        this.message = err.error;
      }
    );
  }
  generateOtp() {
    this.router.navigate(['/generateotp']);
  }
}
