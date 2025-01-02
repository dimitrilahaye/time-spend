import "./pwa.css";
import "./style.css";
import { initPWA } from "./pwa.ts";
import Controller from "./ui/Controller.ts";
import Timer from "./model/Timer.ts";
import LocalStorage from "./core/LocalStorage.ts";
import type Storage from "./ports/Storage.ts";
import {
  getAmountPerHourInput,
  getApp,
  getControlButton,
  getErrorMessage,
  getFormInit,
  getStop,
  getTimerContainer,
  getTimerDisplay,
} from "./ui/elements.ts";

function displayErrorMessage(message: string) {
  const errorMessage = getErrorMessage();
  const body = errorMessage.querySelector(".message-body");
  if (body) {
    body.innerHTML = message;
  }
  errorMessage.classList.toggle("is-hidden");
}

function pause() {
  const timerDisplay = getTimerDisplay();
  const controlButton = getControlButton();
  controlButton.classList.remove("button--pause");
  controlButton.classList.add("button--play");
  timerDisplay.classList.add("timer-display--pause");
}

function play() {
  const timerDisplay = getTimerDisplay();
  const controlButton = getControlButton();
  controlButton.classList.remove("button--play");
  controlButton.classList.add("button--pause");
  timerDisplay.classList.remove("timer-display--pause");
}

function startTimer(timer: Timer, storage: Storage) {
  const controlButton = getControlButton();
  const stop = getStop();
  const timerContainer = getTimerContainer();
  const formInit = getFormInit();
  formInit.classList.toggle("is-hidden");

  const controller = new Controller(timer, storage);
  if (timer.getPausedAt()) {
    controller.display();
    pause();
  } else {
    controller.start();
  }

  timerContainer.classList.toggle("is-hidden");

  controlButton.addEventListener("click", () => {
    if (controlButton.classList.contains("button--pause")) {
      pause();
      controller.pause();
    } else if (controlButton.classList.contains("button--play")) {
      play();
      controller.start();
    }
  });

  stop.addEventListener("click", () => {
    storage.restoreTimer();
    location.reload();
  });
}

export default function main() {
  const storage = new LocalStorage();

  const app = getApp();
  app.insertAdjacentHTML(
    "afterbegin",
    `
    <main class="section">
      <header>
        <nav class="navbar">
          <div class="navbar-brand">
            <span class="navbar-item has-text-weight-bold">
              🕰️ time | $pend
            </span>
          </div>
        </nav>
      </header>
      <div class="container">
        <div class="columns is-mobile is-multiline">
          <div class="column is-full">
            <form id="init">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label has-text-grey-light" for="hourlyCost">Taux horaire</label>
                </div>
                <div class="field-body">
                  <div class="field is-narrow has-addons">
                    <div class="control">
                      <input
                        class="input"
                        type="number" 
                        id="hourlyCost" 
                        name="hourlyCost" 
                        step="0.01" 
                        min="0" 
                        placeholder="ex. 15.35" 
                        required
                      />
                    </div>
                    <div class="control">
                      <a class="button is-static">
                        €
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <button class="button is-fullwidth" type="submit">Lancer le décompte</button>
            </form>
            <div id="timer-container" class="is-hidden has-text-grey-light">
              <div class="timer-display">
              <div id="clock">00:00:00</div>
              <div class="separator"></div>
              <div id="money" class="has-text-weight-bold">0.00 €</div>
              </div>
              <div class="timer-actions">
                <button class="controls button button--pause" type="button"></button>
                <button class="stop button" type="button">Faire un autre décompte</button>
              </div>
            </div>
          </div>
          <div id="error-message" class="message is-danger is-hidden">
            <div class="message-body"></div>
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
`
  );

  const timer = storage.getTimer();
  if (timer !== null) {
    startTimer(timer, storage);
  }

  const formInit = getFormInit();
  formInit.addEventListener("submit", (e) => {
    e.preventDefault();
    const amountPerHourInput = getAmountPerHourInput();
    const amountPerHour = (amountPerHourInput as HTMLInputElement).value;
    if (amountPerHour.length === 0) {
      throw new Error("Invalid form");
    }

    const timer = new Timer({
      amountPerHour: Number(amountPerHour),
      currentClock: "00:00:00",
      currentMoney: "0.00",
      isPaused: false,
    });
    startTimer(timer, storage);
  });

  initPWA(app);
}

export { displayErrorMessage };
