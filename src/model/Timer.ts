export type TimerProps = {
  isPaused: boolean;
  currentClock: string;
  currentMoney: string;
  onStandByAt: number | null;
  amountPerHour: number;
};

export default class Timer {
  private _isPaused: boolean;
  private _currentClock: string;
  private _currentMoney: string;
  private _onStandByAt: number | null;
  public readonly amountPerHour: number;

  constructor(props: TimerProps) {
    this._isPaused = props.isPaused ?? null;
    this._currentClock = props.currentClock;
    this._currentMoney = props.currentMoney;
    this._onStandByAt = props.onStandByAt;
    this.amountPerHour = props.amountPerHour;
  }

  setPlayed() {
    this._isPaused = false;
  }

  setPaused() {
    this._isPaused = true;
  }

  get isPaused() {
    return this._isPaused;
  }

  get currentClock(): string {
    return this._currentClock;
  }

  set currentClock(value: string) {
    this._currentClock = value;
  }

  get currentMoney(): string {
    return this._currentMoney;
  }

  set currentMoney(value: string) {
    this._currentMoney = value;
  }

  get onStandByAt(): number | null {
    return this._onStandByAt;
  }

  wasOnStandBy() {
    return this._onStandByAt !== null;
  }

  defineOnStandByAt() {
    this._onStandByAt = Date.now();
  }

  removeOnStandByAt() {
    this._onStandByAt = null;
  }

  get snapshot(): TimerProps {
    return {
      isPaused: this._isPaused,
      currentClock: this._currentClock,
      currentMoney: this._currentMoney,
      onStandByAt: this.onStandByAt,
      amountPerHour: this.amountPerHour,
    };
  }

  static clone(timer: Timer) {
    return new Timer(timer.snapshot);
  }

  static initialTimer(amountPerHour: number) {
    return new Timer({
      amountPerHour: amountPerHour,
      currentClock: "00:00:00",
      currentMoney: "0.00",
      isPaused: false,
      onStandByAt: null,
    });
  }
}
