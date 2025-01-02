export default class ClockDisplay {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(data: { hours: number; minutes: number; seconds: number }) {
    this.hours = data.hours;
    this.minutes = data.minutes;
    this.seconds = data.seconds;
  }

  static fromStartTime(startTime: number) {
    const date = new Date(startTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return new ClockDisplay({ hours, minutes, seconds });
  }

  get value() {
    return `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(
      this.seconds
    )}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, "0");
  }
}
