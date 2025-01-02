import Timer, { type TimerProps } from "../model/Timer";
import type Storage from "../ports/Storage";

export default class LocalStorage implements Storage {
  private readonly storageKey: string;

  constructor(storageKey = "time_spent") {
    this.storageKey = storageKey;
  }

  getTimer(): Timer | null {
    const data = localStorage.getItem(this.storageKey);
    if (data === null) {
      return null;
    }
    const timer: TimerProps = JSON.parse(data);
    return new Timer({
      isPaused: timer.isPaused,
      currentClock: timer.currentClock,
      currentMoney: timer.currentMoney,
      amountPerHour: Number(timer.amountPerHour.toFixed(2)),
    });
  }

  saveTimer(timer: Timer): void {
    localStorage.setItem(this.storageKey, JSON.stringify(timer.snapshot));
  }

  restoreTimer(): void {
    localStorage.removeItem(this.storageKey);
  }
}
