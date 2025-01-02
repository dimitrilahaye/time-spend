export abstract class Observable<T> {
  private observers: ((data: T) => void)[] = [];

  add(callback: (data: T) => void): void {
    this.observers.push(callback);
  }

  remove(callback: (data: T) => void): void {
    this.observers = this.observers.filter((obs) => obs !== callback);
  }

  protected notify(data: T): void {
    this.observers.forEach((callback) => callback(data));
  }
}
