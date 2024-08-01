import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jihed saguer ';
  message: string = ''; // Initialize message with a default value

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTestMessage().subscribe(
      (data: { message: string }) => {
        this.message = data.message;
      },
      (error: any) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }
}
