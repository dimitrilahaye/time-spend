import { Observable } from "../../core/Observable";
import type Timer from "../Timer";

export abstract class Counter<T> extends Observable<T> {
  abstract update(): void;
  abstract display(): void;
  abstract exitStandby(timer: Timer): void;

  protected getElapsedTimeSinceStandby(onStandByAt: number) {
    const now = Date.now();
    const elapsedTime = now - onStandByAt;
    return elapsedTime;
  }
}
