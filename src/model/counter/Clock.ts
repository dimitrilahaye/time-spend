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

  constructor(startTime = 0) {
    super(startTime);
    if (startTime > 0) {
      this.hours = Math.floor(this.elapsedSeconds / 3600);
      this.minutes = Math.floor((this.elapsedSeconds % 3600) / 60);
      this.seconds = this.elapsedSeconds % 60;
    }
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
}
