import "./pwa.css";
import "./style.css";
import { initPWA } from "./pwa.ts";
import Controller from "./ui/Controller.ts";
import Timer from "./model/Timer.ts";
import type Storage from "./ports/Storage.ts";
import ui from "./ui/elements.ts";

export default function main(storage: Storage) {
  ui.initAppDom();

  const timer = storage.getTimer();
  if (timer !== null) {
    startTimer(timer, storage);
  }

  if (timer === null) {
    ui.showFormInit();
  }

  ui.formInitSubmitHandler((e) => {
    e.preventDefault();
    const amountPerHour = ui.getAmountPerHourValue();
    if (amountPerHour.length === 0) {
      throw new Error("Invalid form");
    }

    const timer = Timer.initialTimer(Number(amountPerHour));
    startTimer(timer, storage);
  });

  initPWA(ui.getAppElement());
}

function displayErrorMessage(message: string) {
  ui.displayErrorMessage(message);
}

function startTimer(timer: Timer, storage: Storage) {
  ui.hideFormInit();

  const controller = new Controller(timer, storage);
  if (timer.isPaused) {
    controller.display();
    ui.setPlayerOnPause();
  } else {
    console.info(timer.snapshot);
    controller.play();
  }

  ui.showTimerContainer();

  ui.controlButtonClickHandler(() => {
    if (ui.isPlayerOnPlay()) {
      ui.setPlayerOnPause();
      controller.pause();
    } else if (ui.isPlayerOnPause()) {
      ui.setPlayerOnPlay();
      controller.play();
    }
  });

  ui.setStopButtonClickHandler(() => {
    storage.restoreTimer();
    location.reload();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      controller.defineOnStandby();
    }
    if (document.visibilityState === "visible") {
      controller.exitStandby();
    }
  });
}

export { displayErrorMessage };
