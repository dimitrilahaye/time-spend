import type Timer from "../Timer";
import { Counter } from "./Counter";

type ClockData = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default class Clock extends Counter<ClockData> {
  private seconds = 0;
  private minutes = 0;
  private hours = 0;

  constructor(timer: Timer) {
    super();
    const [hours, minutes, seconds] = timer.currentClock.split(":").map(Number);
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  update(): void {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours++;
    }

    this.notify({
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    });
  }

  display() {
    this.notify({
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    });
  }

  exitStandby(timer: Timer) {
    if (timer.isPaused) {
      return;
    }
    const onStandByAt = timer.onStandByAt;
    if (onStandByAt === null) {
      return;
    }
    const elapsedTime = this.getElapsedTimeSinceStandby(onStandByAt);
    this.addElapsedTimeToCurrentClock(elapsedTime);
    this.display();
  }

  private addElapsedTimeToCurrentClock(elapsedTime: number) {
    const currentClockMilliseconds =
      elapsedTime + this.getCurrentClockInMilliseconds();
    this.setCurrentClockFromMilliseconds(currentClockMilliseconds);
  }

  private getCurrentClockInMilliseconds() {
    const totalMilliseconds =
      this.hours * 60 * 60 * 1000 +
      this.minutes * 60 * 1000 +
      this.seconds * 1000;
    return totalMilliseconds;
  }

  private setCurrentClockFromMilliseconds(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}
