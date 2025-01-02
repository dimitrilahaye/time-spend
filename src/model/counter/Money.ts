import { Counter } from "./Counter";

type MoneyData = {
  amount: number;
};

export default class Money extends Counter<MoneyData> {
  private readonly amountPerSecond;
  private amount = 0;

  constructor(amountPerHour: number, startTime = 0) {
    super(startTime);
    this.amountPerSecond = amountPerHour / 60 / 60;
    if (startTime > 0) {
      this.amount = this.amountPerSecond * this.elapsedSeconds;
    }
  }

  update(): void {
    this.amount += this.amountPerSecond;

    this.notify({
      amount: this.amount,
    });
  }
}
