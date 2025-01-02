import type Timer from "../Timer";
import { Counter } from "./Counter";

type MoneyData = {
  amount: number;
};

export default class Money extends Counter<MoneyData> {
  private readonly amountPerSecond;
  private amount = 0;

  constructor(timer: Timer) {
    super();
    this.amountPerSecond = timer.amountPerHour / 60 / 60;
    this.amount = Number(timer.getCurrentMoney());
  }

  update(): void {
    this.amount += this.amountPerSecond;

    this.notify({
      amount: this.amount,
    });
  }

  display(): void {
    this.notify({
      amount: this.amount,
    });
  }
}
