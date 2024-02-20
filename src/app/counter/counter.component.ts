import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})

export class CounterComponent {

  incrementAmount: number = 1;
  count: number = 0;

  resetCounter(){
    this.count = 0;
  }

  incrementCounter(){
    this.count += this.incrementAmount;
  }
}