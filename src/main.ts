import "./pwa.css";
import "./style.css";
import { initPWA } from "./pwa.ts";
import Controller from "./ui/Controller.ts";
import Timer from "./model/Timer.ts";
import LocalStorage from "./core/LocalStorage.ts";
import type Storage from "./ports/Storage.ts";
import ui from "./ui/elements.ts";

function displayErrorMessage(message: string) {
  ui.displayErrorMessage(message);
}

function startTimer(timer: Timer, storage: Storage) {
  ui.hideFormInit();

  const controller = new Controller(timer, storage);
  if (timer.getPausedAt()) {
    controller.display();
    ui.setPlayerOnPause();
  } else {
    controller.start();
  }

  ui.showTimerContainer();

  ui.controlButtonClickHandler(() => {
    if (ui.controlButtonIsPaused()) {
      ui.setPlayerOnPause();
      controller.pause();
    } else if (ui.controlButtonIsPlayed()) {
      ui.setPlayerOnPlay();
      controller.start();
    }
  });

  ui.setStopButtonClickHandler(() => {
    storage.restoreTimer();
    location.reload();
  });
}

export default function main() {
  const storage = new LocalStorage();

  ui.initAppDom();

  const timer = storage.getTimer();
  if (timer !== null) {
    startTimer(timer, storage);
  }

  ui.formInitSubmitHandler((e) => {
    e.preventDefault();
    const amountPerHour = ui.getAmountPerHourValue();
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

  initPWA(ui.getAppElement());
}

export { displayErrorMessage };