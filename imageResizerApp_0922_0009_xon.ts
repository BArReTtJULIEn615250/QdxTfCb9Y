// 代码生成时间: 2025-09-22 00:09:51
// Image Resizer Angular Module
// This module allows users to batch adjust the size of images.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageResizerComponent } from './image-resizer.component';
import { ResizeService } from './resize.service';

@NgModule({
  declarations: [
    ImageResizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ResizeService],
  bootstrap: [ImageResizerComponent]
})
export class ImageResizerAppModule { }

// Image Resizer Component
// This component provides the user interface for resizing images.
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResizeService } from './resize.service';

@Component({
  selector: 'app-image-resizer',
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.css']
})
export class ImageResizerComponent {
  width: number = 0;
  height: number = 0;
  images: File[] = [];
  resizeError: string | undefined;

  constructor(private resizeService: ResizeService) { }

  onFileChange(event: Event): void {
    const files: FileList = event.target as any;
    if (files.length > 0) {
      this.images = Array.from(files);
    }
  }

  onResize(): void {
    if (this.width <= 0 || this.height <= 0) {
      this.resizeError = 'Width and height must be greater than 0';
      return;
    }
    this.resizeService.resizeImages(this.images, this.width, this.height).subscribe({
      next: (resizedImages) => {
        console.log('Resized images:', resizedImages);
      },
      error: (error) => {
        this.resizeError = error.message;
      }
    });
  }
}

// Resize Service
// This service handles the logic for resizing images.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private resizeEndpoint = '/api/resize';

  constructor(private http: HttpClient) { }

  resizeImages(images: File[], width: number, height: number): Observable<Blob[]> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
      formData.append(`widths`, width.toString());
      formData.append(`heights`, height.toString());
    });

    return this.http.post<Blob[]>(this.resizeEndpoint, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => event.target.response as Blob[]),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Log error and throw
    console.error('An error occurred:', error.message);
    return throwError(error.message || 'Server error');
  }
}