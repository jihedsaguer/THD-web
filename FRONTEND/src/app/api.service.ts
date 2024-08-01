import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/test';

  constructor(private http: HttpClient) {}

  getTestMessage(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.apiUrl);
  }
}
