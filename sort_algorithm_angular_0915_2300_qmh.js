// 代码生成时间: 2025-09-15 23:00:45
import { Injectable } from '@angular/core';

/**
 * SortService class that provides sorting functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class SortService {
  
  /**
   * Sorts an array of numbers using the bubble sort algorithm.
   * @param {number[]} array - The array of numbers to sort.
   * @returns {number[]} - The sorted array.
   */
  bubbleSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array of numbers.');
    }
    
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap the elements
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }

  /**
   * Sorts an array of numbers using the quick sort algorithm.
   * @param {number[]} array - The array of numbers to sort.
   * @returns {number[]} - The sorted array.
   */
  quickSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array of numbers.');
    }
    
    if (array.length <= 1) {
      return array;
    }
    let pivot = array[array.length - 1];
    let left: number[] = [];
    let right: number[] = [];
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    return this.concat(this.quickSort(left), [pivot], this.quickSort(right));
  }

  /**
   * Concatenates three arrays to form a single sorted array.
   * @param {number[]} left - The left sorted array.
   * @param {number[]} middle - The middle array.
   * @param {number[]} right - The right sorted array.
   * @returns {number[]} - The concatenated sorted array.
   */
  private concat(left: number[], middle: number[], right: number[]): number[] {
    let result: number[] = [...left, ...middle, ...right];
    return result;
  }
}

// Example usage:
// const sortService = new SortService();
// const sortedArray = sortService.bubbleSort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
// console.log(sortedArray);
