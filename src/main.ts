import "./style.css";
import "./pwa.css";
import { initPWA } from "./pwa.ts";
import Controller from "./model/ui/Controller.ts";
import Timer from "./model/Timer.ts";

export default function main() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app === null) {
    throw new Error("app not found");
  }

  app.innerHTML = `
  <div>
    <div id="clock"></div>
    <div id="money"></div>
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
`;

  const controller = new Controller(
    new Timer({
      amountPerHour: 15,
      startTime: new Date("2025-01-02T18:20:00").getTime(),
    })
  );
  controller.start();

  initPWA(app);
}
