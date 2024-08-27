import { Component, ChangeDetectionStrategy } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { DeadlineFacade } from "src/facade/deadline.facade";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrl: "./timer.component.css",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeadlineFacade],
})
export class TimerComponent {
  public timeLeft = toSignal(this.deadlineFacade.timeLeft$);

  constructor(private deadlineFacade: DeadlineFacade) {}

  ngOnInit() {
    this.deadlineFacade.getDeadline();
  }
}
