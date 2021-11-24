import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserResponse } from './models/response.interface';
import { User } from './models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  createUser(formData: object) {
    return this.http.post<UserResponse>(this.baseUrl, formData);
  }

  generateOtp(number: number) {
    const requestPayload = { phoneNumber: number };
    return this.http.post<UserResponse>(
      `${this.baseUrl}/generateOtp`,
      requestPayload
    );
  }

  verifyOtp(userId: number, otp: number) {
    const params = new HttpParams().set('otp', otp);
    const requestUrl = `${this.baseUrl}/${userId}/verifyOtp`;
    return this.http.get<User>(requestUrl, { params });
  }
}
