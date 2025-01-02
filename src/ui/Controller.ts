import Clock from "../model/counter/Clock";
import Money from "../model/counter/Money";
import type Timer from "../model/Timer";

export default class Controller {
  private readonly clock: Clock;
  private readonly money: Money;
  private readonly clockElement: HTMLElement;
  private readonly moneyElement: HTMLElement;
  private intervalId: number | undefined;

  constructor(timer: Timer) {
    const clockElement = document.querySelector("#clock");
    const moneyElement = document.querySelector("#money");
    if (clockElement === null) {
      throw new Error("No clock element");
    }
    if (moneyElement === null) {
      throw new Error("No money element");
    }
    this.clockElement = clockElement as HTMLElement;
    this.moneyElement = moneyElement as HTMLElement;

    this.clock = new Clock(timer.startTime);
    this.money = new Money(timer.amountPerHour, timer.startTime);

    this.clock.add(this.updateClockElement.bind(this));
    this.money.add(this.updateMoneyElement.bind(this));
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clock.update();
      this.money.update();
    }, 1000);
  }

  updateClockElement(data: {
    hours: number;
    minutes: number;
    seconds: number;
  }) {
    const { hours, minutes, seconds } = data;
    this.clockElement.textContent = `${this.pad(hours)}:${this.pad(
      minutes
    )}:${this.pad(seconds)}`;
  }

  updateMoneyElement(data: { amount: number }) {
    const { amount } = data;
    this.moneyElement.textContent = `${amount.toFixed(2)} €`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, "0");
  }
}
