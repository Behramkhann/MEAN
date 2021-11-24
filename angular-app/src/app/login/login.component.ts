import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  message!: string;
  userId!: number;
  User!: User;
  loggedIn: boolean = false;
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  otp = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(4),
  ]);
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userId = param.userId;
    });
  }
  onLogin() {
    console.log(this.otp.value);
    this.api.verifyOtp(this.userId, this.otp.value).subscribe(
      (res) => {
        this.User = res;
        this.loggedIn = true;
      },
      (err) => {
        console.log(err);
        this.message = err.error;
      }
    );
  }
}
