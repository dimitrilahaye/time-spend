export default class Timer {
  public readonly startTime: number;
  public readonly amountPerHour: number;

  constructor(args: { startTime: number; amountPerHour: number }) {
    this.startTime = args.startTime;
    this.amountPerHour = args.amountPerHour;
  }
}
