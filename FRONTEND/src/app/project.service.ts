import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  getProjectImages(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${projectId}/images`);
  }}
