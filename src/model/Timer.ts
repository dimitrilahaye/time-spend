export type TimerProps = {
  isPaused: boolean;
  currentClock: string;
  currentMoney: string;
  amountPerHour: number;
};

export default class Timer {
  private isPaused: boolean;
  private currentClock: string;
  private currentMoney: string;
  public readonly amountPerHour: number;

  constructor(props: TimerProps) {
    this.isPaused = props.isPaused ?? null;
    this.currentClock = props.currentClock;
    this.currentMoney = props.currentMoney;
    this.amountPerHour = props.amountPerHour;
  }

  setCurrentClock(clock: string) {
    this.currentClock = clock;
  }

  setCurrentMoney(money: string) {
    this.currentMoney = money;
  }

  setPaused() {
    this.isPaused = true;
  }

  setPlayed() {
    this.isPaused = false;
  }

  getPausedAt() {
    return this.isPaused;
  }

  getCurrentMoney() {
    return this.currentMoney;
  }

  getCurrentClock() {
    return this.currentClock;
  }

  get snapshot() {
    return {
      isPaused: this.isPaused,
      currentClock: this.currentClock,
      currentMoney: this.currentMoney,
      amountPerHour: this.amountPerHour,
    };
  }
}
