import { Injectable } from "@angular/core";

@Injectable()
export class ThemeService {
  private currentTheme = 'default';
  private isDarkMode = false;

  constructor() {
    this.loadPreferences();
  }

  setMode(mode: string): void {
    this.isDarkMode = mode === 'dark';
    this.applyTheme();
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    this.applyTheme();
  }

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme(): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', this.currentTheme);
    root.setAttribute('data-mode', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', this.currentTheme);
    localStorage.setItem('mode', this.isDarkMode ? 'dark' : 'light');

    console.log('applyTheme', this.currentTheme, this.isDarkMode);
  }

  private loadPreferences(): void {
    const savedTheme = localStorage.getItem('theme');
    const savedMode = localStorage.getItem('mode');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
    if (savedMode) {
      this.isDarkMode = savedMode === 'dark';
    }
    this.applyTheme();
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  getCurrentMode(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }

}