import { Observable } from "../../core/Observable";

export abstract class Counter<T> extends Observable<T> {
  protected elapsedSeconds = 0;

  constructor(startTime = 0) {
    super();
    if (startTime > 0) {
      const now = Date.now();
      const elapsedMs = now - startTime;
      this.elapsedSeconds = Math.floor(elapsedMs / 1000);
    }
  }

  abstract update(): void;
}
