import "./pwa.css";
import "./style.css";
import { initPWA } from "./pwa.ts";
import Controller from "./ui/Controller.ts";
import Timer from "./model/Timer.ts";
import LocalStorage from "./core/LocalStorage.ts";
import type Storage from "./ports/Storage.ts";
import {
  getAmountPerHourValue,
  getApp,
  getControlButton,
  getErrorMessage,
  getFormInit,
  getStop,
  getTimerContainer,
  getTimerDisplay,
} from "./ui/elements.ts";

function displayErrorMessage(message: string) {
  const $errorMessage = getErrorMessage();
  $errorMessage.displayMessage(message);
}

function pause() {
  const $timerDisplay = getTimerDisplay();
  const $controlButton = getControlButton();
  $controlButton.pause();
  $timerDisplay.pause();
}

function play() {
  const $timerDisplay = getTimerDisplay();
  const $controlButton = getControlButton();
  $controlButton.play();
  $timerDisplay.play();
}

function startTimer(timer: Timer, storage: Storage) {
  const $controlButton = getControlButton();
  const $stop = getStop();
  const $timerContainer = getTimerContainer();
  const $formInit = getFormInit();
  $formInit.hide();

  const controller = new Controller(timer, storage);
  if (timer.getPausedAt()) {
    controller.display();
    pause();
  } else {
    controller.start();
  }

  $timerContainer.show();

  $controlButton.clickHandler(() => {
    if ($controlButton.isPaused()) {
      pause();
      controller.pause();
    } else if ($controlButton.isPlayed()) {
      play();
      controller.start();
    }
  });

  $stop.clickHandler(() => {
    storage.restoreTimer();
    location.reload();
  });
}

export default function main() {
  const storage = new LocalStorage();

  const $app = getApp();
  $app.initDom();

  const timer = storage.getTimer();
  if (timer !== null) {
    startTimer(timer, storage);
  }

  const $formInit = getFormInit();
  $formInit.submitHandler((e) => {
    e.preventDefault();
    const amountPerHour = getAmountPerHourValue();
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

  initPWA($app.element);
}

export { displayErrorMessage };
