import "./style.css";
import "./pwa.css";
import { initPWA } from "./pwa.ts";
import Controller from "./ui/Controller.ts";
import Timer from "./model/Timer.ts";

export default function main() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app === null) {
    throw new Error("app not found");
  }

  app.innerHTML = `
    <main class="section">
      <div class="container">
        <div class="columns is-mobile is-multiline">
          <div class="column is-full">
            <form id="init">
              <div class="field">
                <label class="label has-text-grey-light" for="hourlyCost">Coût horaire</label>
                  <div class="control">
                    <input
                      class="input"
                      type="number" 
                      id="hourlyCost" 
                      name="hourlyCost" 
                      step="0.01" 
                      min="0" 
                      placeholder="15.35" 
                      required
                    >
                  </div>
              </div>
              <button class="button is-fullwidth" type="submit">Lancer le décompte</button>
            </form>
            <div id="timer" class="is-hidden has-text-grey-light">
              <div id="clock"></div>
              <div id="money"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="pwa-toast"
        role="alert"
        aria-labelledby="toast-message"
      >
        <div class="message">
          <span id="toast-message"></span>
        </div>
        <div class="buttons">
            <button id="pwa-refresh" type="button">
              Reload
            </button>
            <button id="pwa-close" type="button">
              Close
            </button>
        </div>
      </div>
    </main>
`;

  const formInit = document.querySelector("#init");
  const amountPerHourInput = document.querySelector("#hourlyCost");
  const timer = document.querySelector("#timer");

  if (formInit === null) {
    throw new Error("Form for initialization not found");
  }

  if (amountPerHourInput === null) {
    throw new Error("Input for hourly cost not found");
  }

  if (timer === null) {
    throw new Error("Timer not found");
  }

  formInit.addEventListener("submit", (e) => {
    e.preventDefault();
    const amountPerHour = (amountPerHourInput as HTMLInputElement).value;
    if (amountPerHour.length === 0) {
      throw new Error("Invalid form");
    }

    timer.classList.toggle("is-hidden");
    formInit.classList.toggle("is-hidden");

    const controller = new Controller(
      new Timer({
        amountPerHour: Number(amountPerHour),
        startTime: new Date("2025-01-02T18:20:00").getTime(),
      })
    );
    controller.start();
  });

  initPWA(app);
}
