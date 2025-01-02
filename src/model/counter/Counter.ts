import { Observable } from "../../core/Observable";

export abstract class Counter<T> extends Observable<T> {
  abstract update(): void;
  abstract display(): void;
}
