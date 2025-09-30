// 代码生成时间: 2025-10-01 03:55:26
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatchManagementToolComponent } from './patch-management-tool.component';
import { PatchService } from './patch.service';

// PatchManagementToolModule is the main module for the patch management tool
@NgModule({
  declarations: [
    PatchManagementToolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    PatchService
  ],
  bootstrap: [PatchManagementToolComponent]
})
export class PatchManagementToolModule {}

// PatchManagementToolComponent is the main component for the UI
import { Component } from '@angular/core';
import { PatchService } from './patch.service';

@Component({
  selector: 'app-patch-management-tool',
  template: `
    <div>
      <h1>Patch Management Tool</h1>
      <app-patch-list [patches]='patches' (patchSelected)='onPatchSelected($event)'></app-patch-list>
    </div>
  `,
  styleUrls: ['./patch-management-tool.component.css']
})
export class PatchManagementToolComponent {
  patches: any[] = [];

  constructor(private patchService: PatchService) {
    this.loadPatches();
  }

  loadPatches(): void {
    this.patchService.getPatches().subscribe({
      next: (response) => {
        this.patches = response;
      },
      error: (error) => {
        console.error('Failed to load patches:', error);
      }
    });
  }

  onPatchSelected(patch: any): void {
    // Handle patch selection, e.g., show details or apply patch
    console.log('Patch selected:', patch);
  }
}

// PatchListComponent displays a list of patches
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-patch-list',
  template: `
    <ul>
      <li *ngFor='let patch of patches' (click)='selectPatch(patch)'>{{ patch.name }}</li>
    </ul>
  `,
  styleUrls: ['./patch-list.component.css']
})
export class PatchListComponent {
  @Input() patches: any[] = [];
  @Output() patchSelected = new EventEmitter<any>();

  constructor() { }

  selectPatch(patch: any): void {
    this.patchSelected.emit(patch);
  }
}

// PatchService handles communication with the backend
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatchService {
  private patchUrl = 'api/patches';

  constructor(private http: HttpClient) { }

  getPatches(): Observable<any[]> {
    return this.http.get<any[]>(this.patchUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}