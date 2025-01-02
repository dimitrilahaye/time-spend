import type Storage from "../ports/Storage.ts";
import ClockDisplay from "../model/ClockDisplay";
import Clock from "../model/counter/Clock";
import Money from "../model/counter/Money";
import MoneyDisplay from "../model/MoneyDisplay";
import type Timer from "../model/Timer";

export default class Controller {
  private readonly storage: Storage;
  private readonly clock: Clock;
  private readonly money: Money;
  private readonly clockElement: HTMLElement;
  private readonly moneyElement: HTMLElement;
  private intervalId: number | undefined;

  constructor(timer: Timer, storage: Storage) {
    this.storage = storage;

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

    this.clock = new Clock(timer);
    this.money = new Money(timer);
    this.clock.addObserver(this.updateClockElement.bind(this));
    this.money.addObserver(this.updateMoneyElement.bind(this));

    this.storage.saveTimer(timer);
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clock.update();
      this.money.update();
    }, 1000);

    this.saveTimerAsPlayed();
  }

  pause() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;

    this.saveTimerAsPaused();
  }

  display() {
    this.clock.display();
    this.money.display();
  }

  private updateClockElement(data: {
    hours: number;
    minutes: number;
    seconds: number;
  }) {
    this.clockElement.innerText = new ClockDisplay(data).value;

    this.saveTimerCurrentClock();
  }

  private updateMoneyElement(data: { amount: number }) {
    this.moneyElement.innerText = new MoneyDisplay(data).value;

    this.saveTimerCurrentMoney();
  }

  private saveTimerCurrentMoney() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.setCurrentMoney(this.moneyElement.innerText.replace(" €", ""));
    this.storage.saveTimer(currentTimer);
  }

  private saveTimerCurrentClock() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.setCurrentClock(this.clockElement.innerText);
    this.storage.saveTimer(currentTimer);
  }

  private saveTimerAsPlayed() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.setPlayed();
    this.storage.saveTimer(currentTimer);
  }

  private saveTimerAsPaused() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.setPaused();
    this.storage.saveTimer(currentTimer);
  }
}
