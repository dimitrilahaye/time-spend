import type Storage from "../ports/Storage.ts";
import ClockDisplay from "../model/ClockDisplay";
import Clock from "../model/counter/Clock";
import Money from "../model/counter/Money";
import MoneyDisplay from "../model/MoneyDisplay";
import Timer from "../model/Timer";

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

    this.storage.saveTimer(Timer.clone(timer));
  }

  play() {
    this.start();
    this.saveTimerAsPlayed();
  }

  pause() {
    this.stop();
    this.saveTimerAsPaused();
  }

  display() {
    this.clock.display();
    this.money.display();
  }

  defineOnStandby() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    this.stop();
    currentTimer.defineOnStandByAt();
    this.storage.saveTimer(Timer.clone(currentTimer));
  }

  exitStandby() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    this.clock.exitStandby(currentTimer);
    this.money.exitStandby(currentTimer);
    this.start();
    currentTimer.removeOnStandByAt();
    this.storage.saveTimer(Timer.clone(currentTimer));
  }

  private start() {
    if (this.intervalId) {
      this.stop();
    }

    this.intervalId = setInterval(() => {
      this.clock.update();
      this.money.update();
    }, 1000);
  }

  private stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
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
    currentTimer.currentMoney = this.moneyElement.innerText.replace(" €", "");
    this.storage.saveTimer(Timer.clone(currentTimer));
  }

  private saveTimerCurrentClock() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.currentClock = this.clockElement.innerText;
    this.storage.saveTimer(Timer.clone(currentTimer));
  }

  private saveTimerAsPlayed() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.removeOnStandByAt();
    currentTimer.setPlayed();
    this.storage.saveTimer(Timer.clone(currentTimer));
  }

  private saveTimerAsPaused() {
    const currentTimer = this.storage.getTimer();
    if (currentTimer === null) {
      return;
    }
    currentTimer.setPaused();
    this.storage.saveTimer(Timer.clone(currentTimer));
  }
}
