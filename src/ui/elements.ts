function getErrorMessage() {
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage === null) {
    throw new Error("Error message not found");
  }
  return errorMessage;
}

function getApp() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app === null) {
    throw new Error("app not found");
  }

  return app;
}

function getAmountPerHourInput() {
  const amountPerHourInput = document.querySelector("#hourlyCost");
  if (amountPerHourInput === null) {
    throw new Error("Input for hourly cost not found");
  }

  return amountPerHourInput;
}

function getTimerDisplay() {
  const timerDisplay = document.querySelector(".timer-display");
  if (timerDisplay === null) {
    throw new Error("Timer container not found");
  }

  return timerDisplay;
}

function getControlButton() {
  const controlButton = document.querySelector(".controls");
  if (controlButton === null) {
    throw new Error("Control button not found");
  }

  return controlButton;
}

function getStop() {
  const stop = document.querySelector(".stop");
  if (stop === null) {
    throw new Error("Stop button not found");
  }

  return stop;
}

function getTimerContainer() {
  const timerContainer = document.querySelector("#timer-container");
  if (timerContainer === null) {
    throw new Error("Timer not found");
  }

  return timerContainer;
}

function getFormInit() {
  const formInit = document.querySelector("#init");
  if (formInit === null) {
    throw new Error("Form for initialization not found");
  }

  return formInit;
}

export {
  getErrorMessage,
  getApp,
  getAmountPerHourInput,
  getTimerDisplay,
  getControlButton,
  getStop,
  getTimerContainer,
  getFormInit,
};
