import type Timer from "../model/Timer";

export default interface Storage {
  getTimer(): Timer | null;
  saveTimer(timer: Timer): void;
  restoreTimer(): void;
}
