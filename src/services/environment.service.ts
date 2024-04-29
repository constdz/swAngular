import { Injectable } from '@angular/core';
import { environment } from '../app/environment';

declare var process: any;

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  /**
   * Get variables values in environments files
   * @param key variable name in environment file
   * @returns variable value
   */
  private getEnvironmentVars(key: string): string {
    return typeof process !== 'undefined' && process && process.env
    ? process.env[key] || environment[key]
    : environment[key];
  }

  /**
   * @returns API Base URL
   */
  get APIBaseUrl(): string {
    return this.getEnvironmentVars('apiBaseUrl');
  }
}
