export default class MoneyDisplay {
  amount: number;

  constructor(data: { amount: number }) {
    this.amount = data.amount;
  }

  get value() {
    return `${this.amount.toFixed(2)} €`;
  }
}
