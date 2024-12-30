import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { IMessage } from '../logger.service';

@Component({
  selector: 'app-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.scss']
})

export class ExampleComponentComponent {
  count = 0;
  showNumberList = false;
  numberArray = [] as number[];
  messages = [] as IMessage[];

  constructor(private loggerService: LoggerService) {
    this.messages = this.loggerService.getMessages();
   }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  toggleNumberList() {
    if (this.count < 0) {
      this.numberArray = Array.from({ length: this.count * -1 }, (_, i) => this.count + i);
    } else if (this.count > 0) {
      this.numberArray = Array.from({ length: this.count }, (_, i) => i+1);
    } else {
      this.numberArray = [0];
    }
    this.showNumberList = true;
  }

  logCount(message: number) {
    const time = new Date();
    this.loggerService.logMessage({ message: message.toString(), date: time });
    this.messages = this.loggerService.getMessages();
  }

  getLogs(): IMessage[] {
    this.messages = this.loggerService.getMessages();
    return this.messages;
  }

}
