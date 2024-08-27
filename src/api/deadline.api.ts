import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class DeadlineAPI {
  public getDeadline(): Observable<{ secondsLeft: number }> {
    return of({ secondsLeft: 10 });
  }
}
