import { Component } from "@angular/core";
import { DeadlineFacade } from "src/facade/deadline.facade";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrl: "./timer.component.css",
})
export class TimerComponent {
  public timeLeft$ = this.deadlineFacade.timeLeft$;

  constructor(private deadlineFacade: DeadlineFacade) {}

  ngOnInit() {
    this.deadlineFacade.getDeadline();
  }
}
