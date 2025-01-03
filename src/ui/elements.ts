function getErrorMessage() {
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage === null) {
    throw new Error("Error message not found");
  }
  return {
    displayMessage: (message: string) => {
      const body = errorMessage.querySelector(".message-body");
      if (body) {
        body.innerHTML = message;
      }
      errorMessage.classList.toggle("is-hidden");
    },
  };
}

function getApp() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app === null) {
    throw new Error("app not found");
  }

  return {
    element: app,
    initDom: () => {
      app.insertAdjacentHTML(
        "afterbegin",
        `
        <main class="section">
          <header>
            <nav class="navbar">
              <div class="navbar-brand">
                <span class="navbar-item has-text-weight-bold">
                  🕰️ time | pend
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
    },
  };
}

function getAmountPerHourValue() {
  const amountPerHourInput = document.querySelector("#hourlyCost");
  if (amountPerHourInput === null) {
    throw new Error("Input for hourly cost not found");
  }

  return (amountPerHourInput as HTMLInputElement).value;
}

function getTimerDisplay() {
  const timerDisplay = document.querySelector(".timer-display");
  if (timerDisplay === null) {
    throw new Error("Timer container not found");
  }

  return {
    pause: () => timerDisplay.classList.add("timer-display--pause"),
    play: () => timerDisplay.classList.remove("timer-display--pause"),
  };
}

function getControlButton() {
  const controlButton = document.querySelector(".controls");
  if (controlButton === null) {
    throw new Error("Control button not found");
  }

  return {
    pause: () => {
      controlButton.classList.remove("button--pause");
      controlButton.classList.add("button--play");
    },
    play: () => {
      controlButton.classList.remove("button--play");
      controlButton.classList.add("button--pause");
    },
    isPaused: () => controlButton.classList.contains("button--pause"),
    isPlayed: () => controlButton.classList.contains("button--play"),
    clickHandler: (handler: () => void) => {
      controlButton.addEventListener("click", handler);
    },
  };
}

function getStop() {
  const stop = document.querySelector(".stop");
  if (stop === null) {
    throw new Error("Stop button not found");
  }

  return {
    clickHandler: (handler: () => void) => {
      stop.addEventListener("click", handler);
    },
  };
}

function getTimerContainer() {
  const timerContainer = document.querySelector("#timer-container");
  if (timerContainer === null) {
    throw new Error("Timer not found");
  }

  return {
    show: () => timerContainer.classList.remove("is-hidden"),
  };
}

function getFormInit() {
  const formInit = document.querySelector("#init");
  if (formInit === null) {
    throw new Error("Form for initialization not found");
  }

  return {
    hide: () => formInit.classList.add("is-hidden"),
    submitHandler: (handler: (e: Event) => void) => {
      formInit.addEventListener("submit", handler);
    },
  };
}

function ui() {
  return {
    getAppElement: () => {
      const app = getApp();
      return app.element;
    },
    initAppDom: () => {
      const app = getApp();
      app.initDom();
    },
    displayErrorMessage: (message: string) => {
      const errorMessage = getErrorMessage();
      errorMessage.displayMessage(message);
    },
    setPlayerOnPause: () => {
      const controlButton = getControlButton();
      const timerDisplay = getTimerDisplay();
      controlButton.pause();
      timerDisplay.pause();
    },
    setPlayerOnPlay: () => {
      const controlButton = getControlButton();
      const timerDisplay = getTimerDisplay();
      controlButton.play();
      timerDisplay.play();
    },
    controlButtonClickHandler: (handler: () => void) => {
      const controlButton = getControlButton();
      controlButton.clickHandler(handler);
    },
    isPlayerOnPlay: () => {
      const controlButton = getControlButton();
      return controlButton.isPaused();
    },
    isPlayerOnPause: () => {
      const controlButton = getControlButton();
      return controlButton.isPlayed();
    },
    setStopButtonClickHandler: (handler: () => void) => {
      const stop = getStop();
      stop.clickHandler(handler);
    },
    showTimerContainer: () => {
      const timerContainer = getTimerContainer();
      timerContainer.show();
    },
    hideFormInit: () => {
      const formInit = getFormInit();
      formInit.hide();
    },
    formInitSubmitHandler: (handler: (e: Event) => void) => {
      const formInit = getFormInit();
      formInit.submitHandler(handler);
    },
    getAmountPerHourValue,
  };
}

export default ui();
