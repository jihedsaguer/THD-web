import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service'; // Adjust path as needed

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  errorMessage: string = '';
  navVisible: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (data: any) => {
        this.projects = data;
        // No need for change detection here
      },
      (error) => {
        this.errorMessage = 'Error fetching projects: ' + error.message;
        console.error('Error fetching projects:', error);
      }
    );
  }

  toggleNav() {
    this.navVisible = !this.navVisible;
  }
  handleImageError(event: any) {
    event.target.src = 'http://localhost:4200/path/to/default/image.png'; // Path to a default image
  }

  getImageUrl(imageName: string): string {
    // Ensure image URLs are prefixed correctly
    return `http://localhost:3000${imageName}`;
  }

}
