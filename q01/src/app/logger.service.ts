import { Injectable } from '@angular/core';

export interface IMessage {
  message: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  private messages: IMessage[] = [];

  getMessages(): IMessage[] {
    return this.messages.slice();
  }

  logMessage(message: IMessage): void {
    this.messages.push(message);
  }
}
