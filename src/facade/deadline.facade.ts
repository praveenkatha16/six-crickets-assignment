import { Injectable } from "@angular/core";
import { timer, map, takeWhile } from "rxjs";

import { DeadlineAPI } from "src/api/deadline.api";

@Injectable()
export class DeadlineFacade {
  private expiryTimeInMillis: number | undefined;

  constructor(private deadlineApi: DeadlineAPI) {}

  public timeLeft$ = timer(0, 1000).pipe(
    map(() => this._timeLeft),
    takeWhile((timeLeft) => timeLeft != undefined && timeLeft >= 0)
  );

  private get _timeLeft(): number | undefined {
    return (
      this.expiryTimeInMillis &&
      Math.floor((this.expiryTimeInMillis - Date.now()) / 1000)
    );
  }

  public getDeadline(): void {
    if (this.expiryTimeInMillis === undefined) {
      this.deadlineApi.getDeadline().subscribe(({ secondsLeft }) => {
        this.expiryTimeInMillis = secondsLeft * 1000 + Date.now();
      });
    }
  }
}
