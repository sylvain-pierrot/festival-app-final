import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  public messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
