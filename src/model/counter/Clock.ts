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
    const [hours, minutes, seconds] = timer
      .getCurrentClock()
      .split(":")
      .map(Number);
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
}
