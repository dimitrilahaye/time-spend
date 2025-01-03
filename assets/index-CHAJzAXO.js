var T=Object.defineProperty;var S=(t,e,s)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var a=(t,e,s)=>S(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&u(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const L="modulepreload",M=function(t){return"/time-spend/"+t},y={},$=function(e,s,u){let r=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(s.map(c=>{if(c=M(c),c in y)return;y[c]=!0;const m=c.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const i=document.createElement("link");if(i.rel=m?"stylesheet":L,m||(i.as="script"),i.crossOrigin="",i.href=c,l&&i.setAttribute("nonce",l),document.head.appendChild(i),m)return new Promise((E,k)=>{i.addEventListener("load",E),i.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return r.then(o=>{for(const l of o||[])l.status==="rejected"&&n(l.reason);return e().catch(n)})};function H(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:u,onRegistered:r,onRegisteredSW:n,onRegisterError:o}=t;let l,c;const m=async(i=!0)=>{await c};async function p(){if("serviceWorker"in navigator){if(l=await $(async()=>{const{Workbox:i}=await import("./workbox-window.prod.es5-B9K5rw8f.js");return{Workbox:i}},[]).then(({Workbox:i})=>new i("/time-spend/sw.js",{scope:"/time-spend/",type:"classic"})).catch(i=>{o==null||o(i)}),!l)return;l.addEventListener("activated",i=>{(i.isUpdate||i.isExternal)&&window.location.reload()}),l.addEventListener("installed",i=>{i.isUpdate||u==null||u()}),l.register({immediate:e}).then(i=>{n?n("/time-spend/sw.js",i):r==null||r(i)}).catch(i=>{o==null||o(i)})}}return c=p(),m}function I(t){const e=t.querySelector("#pwa-toast"),s=e.querySelector(".message #toast-message"),u=e.querySelector("#pwa-close"),r=e.querySelector("#pwa-refresh");let n;const o=()=>n==null?void 0:n(!0);function l(m){if(m){requestAnimationFrame(()=>l(!1));return}e.classList.contains("refresh")&&r.removeEventListener("click",o),e.classList.remove("show","refresh")}function c(m){m||r.addEventListener("click",o),requestAnimationFrame(()=>{l(!1),m||e.classList.add("refresh"),e.classList.add("show")})}window.addEventListener("load",()=>{u.addEventListener("click",()=>l(!0)),n=H({immediate:!0,onOfflineReady(){s.innerHTML="App ready to work offline",c(!0)},onNeedRefresh(){s.innerHTML="New content available, click on reload button to update",c(!1)},onRegisteredSW(m,p){}})})}class f{constructor(e){a(this,"hours");a(this,"minutes");a(this,"seconds");this.hours=e.hours,this.minutes=e.minutes,this.seconds=e.seconds}static fromStartTime(e){const s=new Date(e),u=s.getHours(),r=s.getMinutes(),n=s.getSeconds();return new f({hours:u,minutes:r,seconds:n})}get value(){return`${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`}pad(e){return e.toString().padStart(2,"0")}}class A{constructor(){a(this,"observers",[])}addObserver(e){this.observers.push(e)}removeObserver(e){this.observers=this.observers.filter(s=>s!==e)}notify(e){this.observers.forEach(s=>s(e))}}class P extends A{}class q extends P{constructor(s){super();a(this,"seconds",0);a(this,"minutes",0);a(this,"hours",0);const[u,r,n]=s.getCurrentClock().split(":").map(Number);this.hours=u,this.minutes=r,this.seconds=n}update(){this.seconds++,this.seconds===60&&(this.seconds=0,this.minutes++),this.minutes===60&&(this.minutes=0,this.hours++),this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}display(){this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}}class B extends P{constructor(s){super();a(this,"amountPerSecond");a(this,"amount",0);this.amountPerSecond=s.amountPerHour/60/60,this.amount=Number(s.getCurrentMoney())}update(){this.amount+=this.amountPerSecond,this.notify({amount:this.amount})}display(){this.notify({amount:this.amount})}}class O{constructor(e){a(this,"amount");this.amount=e.amount}get value(){return`${this.amount.toFixed(2)} €`}}class x{constructor(e,s){a(this,"storage");a(this,"clock");a(this,"money");a(this,"clockElement");a(this,"moneyElement");a(this,"intervalId");this.storage=s;const u=document.querySelector("#clock"),r=document.querySelector("#money");if(u===null)throw new Error("No clock element");if(r===null)throw new Error("No money element");this.clockElement=u,this.moneyElement=r,this.clock=new q(e),this.money=new B(e),this.clock.addObserver(this.updateClockElement.bind(this)),this.money.addObserver(this.updateMoneyElement.bind(this)),this.storage.saveTimer(e)}start(){this.intervalId=setInterval(()=>{this.clock.update(),this.money.update()},1e3),this.saveTimerAsPlayed()}pause(){clearInterval(this.intervalId),this.intervalId=void 0,this.saveTimerAsPaused()}display(){this.clock.display(),this.money.display()}updateClockElement(e){this.clockElement.innerText=new f(e).value,this.saveTimerCurrentClock()}updateMoneyElement(e){this.moneyElement.innerText=new O(e).value,this.saveTimerCurrentMoney()}saveTimerCurrentMoney(){const e=this.storage.getTimer();e!==null&&(e.setCurrentMoney(this.moneyElement.innerText.replace(" €","")),this.storage.saveTimer(e))}saveTimerCurrentClock(){const e=this.storage.getTimer();e!==null&&(e.setCurrentClock(this.clockElement.innerText),this.storage.saveTimer(e))}saveTimerAsPlayed(){const e=this.storage.getTimer();e!==null&&(e.setPlayed(),this.storage.saveTimer(e))}saveTimerAsPaused(){const e=this.storage.getTimer();e!==null&&(e.setPaused(),this.storage.saveTimer(e))}}class C{constructor(e){a(this,"isPaused");a(this,"currentClock");a(this,"currentMoney");a(this,"amountPerHour");this.isPaused=e.isPaused??null,this.currentClock=e.currentClock,this.currentMoney=e.currentMoney,this.amountPerHour=e.amountPerHour}setCurrentClock(e){this.currentClock=e}setCurrentMoney(e){this.currentMoney=e}setPaused(){this.isPaused=!0}setPlayed(){this.isPaused=!1}getPausedAt(){return this.isPaused}getCurrentMoney(){return this.currentMoney}getCurrentClock(){return this.currentClock}get snapshot(){return{isPaused:this.isPaused,currentClock:this.currentClock,currentMoney:this.currentMoney,amountPerHour:this.amountPerHour}}}class D{constructor(e="time_spent"){a(this,"storageKey");this.storageKey=e}getTimer(){const e=localStorage.getItem(this.storageKey);if(e===null)return null;const s=JSON.parse(e);return new C({isPaused:s.isPaused,currentClock:s.currentClock,currentMoney:s.currentMoney,amountPerHour:Number(s.amountPerHour.toFixed(2))})}saveTimer(e){localStorage.setItem(this.storageKey,JSON.stringify(e.snapshot))}restoreTimer(){localStorage.removeItem(this.storageKey)}}function N(){const t=document.querySelector("#error-message");if(t===null)throw new Error("Error message not found");return{displayMessage:e=>{const s=t.querySelector(".message-body");s&&(s.innerHTML=e),t.classList.toggle("is-hidden")}}}function v(){const t=document.querySelector("#app");if(t===null)throw new Error("app not found");return{element:t,initDom:()=>{t.insertAdjacentHTML("afterbegin",`
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
    `)}}}function F(){const t=document.querySelector("#hourlyCost");if(t===null)throw new Error("Input for hourly cost not found");return t.value}function g(){const t=document.querySelector(".timer-display");if(t===null)throw new Error("Timer container not found");return{pause:()=>t.classList.add("timer-display--pause"),play:()=>t.classList.remove("timer-display--pause")}}function h(){const t=document.querySelector(".controls");if(t===null)throw new Error("Control button not found");return{pause:()=>{t.classList.remove("button--pause"),t.classList.add("button--play")},play:()=>{t.classList.remove("button--play"),t.classList.add("button--pause")},isPaused:()=>t.classList.contains("button--pause"),isPlayed:()=>t.classList.contains("button--play"),clickHandler:e=>{t.addEventListener("click",e)}}}function _(){const t=document.querySelector(".stop");if(t===null)throw new Error("Stop button not found");return{clickHandler:e=>{t.addEventListener("click",e)}}}function U(){const t=document.querySelector("#timer-container");if(t===null)throw new Error("Timer not found");return{show:()=>t.classList.remove("is-hidden")}}function b(){const t=document.querySelector("#init");if(t===null)throw new Error("Form for initialization not found");return{hide:()=>t.classList.add("is-hidden"),submitHandler:e=>{t.addEventListener("submit",e)}}}function W(){return{getAppElement:()=>v().element,initAppDom:()=>{v().initDom()},displayErrorMessage:t=>{N().displayMessage(t)},setPlayerOnPause:()=>{const t=h(),e=g();t.pause(),e.pause()},setPlayerOnPlay:()=>{const t=h(),e=g();t.play(),e.play()},controlButtonClickHandler:t=>{h().clickHandler(t)},controlButtonIsPaused:()=>h().isPaused(),controlButtonIsPlayed:()=>h().isPlayed(),setStopButtonClickHandler:t=>{_().clickHandler(t)},showTimerContainer:()=>{U().show()},hideFormInit:()=>{b().hide()},formInitSubmitHandler:t=>{b().submitHandler(t)},getAmountPerHourValue:F}}const d=W();function K(t){d.displayErrorMessage(t)}function w(t,e){d.hideFormInit();const s=new x(t,e);t.getPausedAt()?(s.display(),d.setPlayerOnPause()):s.start(),d.showTimerContainer(),d.controlButtonClickHandler(()=>{d.controlButtonIsPaused()?(d.setPlayerOnPause(),s.pause()):d.controlButtonIsPlayed()&&(d.setPlayerOnPlay(),s.start())}),d.setStopButtonClickHandler(()=>{e.restoreTimer(),location.reload()})}function R(){const t=new D;d.initAppDom();const e=t.getTimer();e!==null&&w(e,t),d.formInitSubmitHandler(s=>{s.preventDefault();const u=d.getAmountPerHourValue();if(u.length===0)throw new Error("Invalid form");const r=new C({amountPerHour:Number(u),currentClock:"00:00:00",currentMoney:"0.00",isPaused:!1});w(r,t)}),I(d.getAppElement())}document.addEventListener("DOMContentLoaded",()=>{try{R()}catch(t){K(t.message??"Une erreur est survenue.")}});
