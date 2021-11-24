import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  message: string = '';
  phNumber!: number;
  User!: User;
  constructor(private api: ApiService, private router: Router) {}
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  ngOnInit(): void {
    this.phoneNumber.valueChanges.subscribe((value) => {
      if (value.length == 11) {
        this.phNumber = value;
      }
    });
  }

  onGetOtp() {
    if (this.phNumber) {
      this.api.generateOtp(this.phNumber).subscribe(
        (response) => {
          this.message = response.message;
          this.User = response.user;
        },
        (err) => {
          this.message = err.error;
        }
      );
    }
  }
  onLogin() {
    console.log(this.User);
    this.router.navigate(['login', this.User.id]);
  }
}
