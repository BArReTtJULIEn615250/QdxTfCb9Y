// 代码生成时间: 2025-09-19 12:36:13
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-generator',
  template: `
    <div>
      <h2>Excel Generator</h2>
      <input #input type="text" placeholder="Enter data (comma separated)" />
      <button (click)="generateExcel(input.value)">Generate Excel</button>
      <button (click)="downloadExcel()">Download</button>
    </div>
  `,
  styles: []
})
export class ExcelGeneratorComponent {
  // Two-way data binding for the Excel file
  excelData: any[][] = [];
  private worksheet: XLSX.WorkSheet;
  private workbook: XLSX.WorkBook;

  constructor(private http: HttpClient) {
    // Initialize an empty workbook and worksheet
    this.workbook = XLSX.utils.book_new();
    this.worksheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.book_append_sheet(this.workbook, this.worksheet, 'Sheet1');
  }

  // Function to generate Excel from user input
  generateExcel(data: string): void {
    try {
      // Parse the input data into an array of arrays
      const parsedData = this.parseData(data);
      this.excelData = parsedData;
      this.worksheet = XLSX.utils.aoa_to_sheet(parsedData);
      XLSX.utils.book_append_sheet(this.workbook, this.worksheet, 'Sheet1');
    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  }

  // Helper function to parse the input data
  parseData(data: string): any[][] {
    const rows = data.split('
').map(row => row.split(',').map(cell => cell.trim()));
    return rows;
  }

  // Function to download the generated Excel file
  downloadExcel(): void {
    try {
      const wbout = XLSX.write(this.workbook, {bookType:'xlsx', type:'binary'});
      const blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});
      saveAs(blob, 'generated.xlsx');
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  }

  // Function to convert string to ArrayBuffer
  private static s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}

// Directive to handle the ElementRef
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFocus]'
})
export class InputFocusDirective {
  constructor(private el: ElementRef) {}

  @HostListener('focus') onFocus() {
    this.el.nativeElement.select();
  }
}

/*
 * Custom Angular module to handle Excel operations
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ExcelGeneratorComponent } from './excel-generator.component';
import { InputFocusDirective } from './input-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    ExcelGeneratorComponent,
    InputFocusDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
 * Main component of the Angular application
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-excel-generator></app-excel-generator>`,
  styles: []
})
export class AppComponent {
  title = 'Excel Generator';
}

/*
 * Helper function to focus input on load
 */
function autoFocusInput() {
  const input = document.querySelector('input');
  if (input) input.focus();
}

document.addEventListener('DOMContentLoaded', autoFocusInput);