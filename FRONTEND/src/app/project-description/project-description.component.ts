import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {
  project: any;
  images: any[] = [];
  errorMessage: string | null = null;
  navVisible: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.getProject(id);
      this.fetchImagesForProject(id);
    });
  }

  getProject(id: number): void {
    this.projectService.getProjectById(id).subscribe(
      data => this.project = data,
      error => {
        this.errorMessage = 'Error fetching project details';
        console.error('Error fetching project details:', error);
      }
    );
  }

  fetchImagesForProject(projectId: number): void {
    this.projectService.getProjectImages(projectId).subscribe(
      data => this.images = data,
      error => {
        this.errorMessage = 'Error fetching project images';
        console.error('Error fetching project images:', error);
      }
    );
  }

  handleImageError(event: any) {
    event.target.src = 'http://localhost:4200/path/to/default/image.png'; // Path to a default image
  }

  getImageUrl(imageName: string): string {
    // Ensure image URLs are prefixed correctly
    return `http://localhost:3000${imageName}`;
  }


  toggleNav() {
    this.navVisible = !this.navVisible;
  }
}
