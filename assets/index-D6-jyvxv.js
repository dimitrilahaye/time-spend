var T=Object.defineProperty;var L=(t,e,s)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var a=(t,e,s)=>L(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const S="modulepreload",M=function(t){return"/time-spend/"+t},v={},H=function(e,s,l){let r=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),u=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(s.map(d=>{if(d=M(d),d in v)return;v[d]=!0;const m=d.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const i=document.createElement("link");if(i.rel=m?"stylesheet":S,m||(i.as="script"),i.crossOrigin="",i.href=d,u&&i.setAttribute("nonce",u),document.head.appendChild(i),m)return new Promise((E,k)=>{i.addEventListener("load",E),i.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(o){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=o,window.dispatchEvent(u),!u.defaultPrevented)throw o}return r.then(o=>{for(const u of o||[])u.status==="rejected"&&n(u.reason);return e().catch(n)})};function I(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:l,onRegistered:r,onRegisteredSW:n,onRegisterError:o}=t;let u,d;const m=async(i=!0)=>{await d};async function p(){if("serviceWorker"in navigator){if(u=await H(async()=>{const{Workbox:i}=await import("./workbox-window.prod.es5-B9K5rw8f.js");return{Workbox:i}},[]).then(({Workbox:i})=>new i("/time-spend/sw.js",{scope:"/time-spend/",type:"classic"})).catch(i=>{o==null||o(i)}),!u)return;u.addEventListener("activated",i=>{(i.isUpdate||i.isExternal)&&window.location.reload()}),u.addEventListener("installed",i=>{i.isUpdate||l==null||l()}),u.register({immediate:e}).then(i=>{n?n("/time-spend/sw.js",i):r==null||r(i)}).catch(i=>{o==null||o(i)})}}return d=p(),m}function O(t){const e=t.querySelector("#pwa-toast"),s=e.querySelector(".message #toast-message"),l=e.querySelector("#pwa-close"),r=e.querySelector("#pwa-refresh");let n;const o=()=>n==null?void 0:n(!0);function u(m){if(m){requestAnimationFrame(()=>u(!1));return}e.classList.contains("refresh")&&r.removeEventListener("click",o),e.classList.remove("show","refresh")}function d(m){m||r.addEventListener("click",o),requestAnimationFrame(()=>{u(!1),m||e.classList.add("refresh"),e.classList.add("show")})}window.addEventListener("load",()=>{l.addEventListener("click",()=>u(!0)),n=I({immediate:!0,onOfflineReady(){s.innerHTML="App ready to work offline",d(!0)},onNeedRefresh(){s.innerHTML="New content available, click on reload button to update",d(!1)},onRegisteredSW(m,p){}})})}class y{constructor(e){a(this,"hours");a(this,"minutes");a(this,"seconds");this.hours=e.hours,this.minutes=e.minutes,this.seconds=e.seconds}static fromStartTime(e){const s=new Date(e),l=s.getHours(),r=s.getMinutes(),n=s.getSeconds();return new y({hours:l,minutes:r,seconds:n})}get value(){return`${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`}pad(e){return e.toString().padStart(2,"0")}}class q{constructor(){a(this,"observers",[])}addObserver(e){this.observers.push(e)}removeObserver(e){this.observers=this.observers.filter(s=>s!==e)}notify(e){this.observers.forEach(s=>s(e))}}class P extends q{}class A extends P{constructor(s){super();a(this,"seconds",0);a(this,"minutes",0);a(this,"hours",0);const[l,r,n]=s.getCurrentClock().split(":").map(Number);this.hours=l,this.minutes=r,this.seconds=n}update(){this.seconds++,this.seconds===60&&(this.seconds=0,this.minutes++),this.minutes===60&&(this.minutes=0,this.hours++),this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}display(){this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}}class x extends P{constructor(s){super();a(this,"amountPerSecond");a(this,"amount",0);this.amountPerSecond=s.amountPerHour/60/60,this.amount=Number(s.getCurrentMoney())}update(){this.amount+=this.amountPerSecond,this.notify({amount:this.amount})}display(){this.notify({amount:this.amount})}}class B{constructor(e){a(this,"amount");this.amount=e.amount}get value(){return`${this.amount.toFixed(2)} €`}}class D{constructor(e,s){a(this,"storage");a(this,"clock");a(this,"money");a(this,"clockElement");a(this,"moneyElement");a(this,"intervalId");this.storage=s;const l=document.querySelector("#clock"),r=document.querySelector("#money");if(l===null)throw new Error("No clock element");if(r===null)throw new Error("No money element");this.clockElement=l,this.moneyElement=r,this.clock=new A(e),this.money=new x(e),this.clock.addObserver(this.updateClockElement.bind(this)),this.money.addObserver(this.updateMoneyElement.bind(this)),this.storage.saveTimer(e)}play(){this.intervalId=setInterval(()=>{this.clock.update(),this.money.update()},1e3),this.saveTimerAsPlayed()}pause(){clearInterval(this.intervalId),this.intervalId=void 0,this.saveTimerAsPaused()}display(){this.clock.display(),this.money.display()}updateClockElement(e){this.clockElement.innerText=new y(e).value,this.saveTimerCurrentClock()}updateMoneyElement(e){this.moneyElement.innerText=new B(e).value,this.saveTimerCurrentMoney()}saveTimerCurrentMoney(){const e=this.storage.getTimer();e!==null&&(e.setCurrentMoney(this.moneyElement.innerText.replace(" €","")),this.storage.saveTimer(e))}saveTimerCurrentClock(){const e=this.storage.getTimer();e!==null&&(e.setCurrentClock(this.clockElement.innerText),this.storage.saveTimer(e))}saveTimerAsPlayed(){const e=this.storage.getTimer();e!==null&&(e.setPlayed(),this.storage.saveTimer(e))}saveTimerAsPaused(){const e=this.storage.getTimer();e!==null&&(e.setPaused(),this.storage.saveTimer(e))}}class C{constructor(e){a(this,"isPaused");a(this,"currentClock");a(this,"currentMoney");a(this,"amountPerHour");this.isPaused=e.isPaused??null,this.currentClock=e.currentClock,this.currentMoney=e.currentMoney,this.amountPerHour=e.amountPerHour}setCurrentClock(e){this.currentClock=e}setCurrentMoney(e){this.currentMoney=e}setPaused(){this.isPaused=!0}setPlayed(){this.isPaused=!1}getIsPaused(){return this.isPaused}getCurrentMoney(){return this.currentMoney}getCurrentClock(){return this.currentClock}get snapshot(){return{isPaused:this.isPaused,currentClock:this.currentClock,currentMoney:this.currentMoney,amountPerHour:this.amountPerHour}}}class N{constructor(e="time_spent"){a(this,"storageKey");this.storageKey=e}getTimer(){const e=localStorage.getItem(this.storageKey);if(e===null)return null;const s=JSON.parse(e);return new C({isPaused:s.isPaused,currentClock:s.currentClock,currentMoney:s.currentMoney,amountPerHour:Number(s.amountPerHour.toFixed(2))})}saveTimer(e){localStorage.setItem(this.storageKey,JSON.stringify(e.snapshot))}restoreTimer(){localStorage.removeItem(this.storageKey)}}function F(){const t=document.querySelector("#error-message");if(t===null)throw new Error("Error message not found");return{displayMessage:e=>{const s=t.querySelector(".message-body");s&&(s.innerHTML=e),t.classList.toggle("is-hidden")}}}function g(){const t=document.querySelector("#app");if(t===null)throw new Error("app not found");return{element:t,initDom:()=>{t.insertAdjacentHTML("afterbegin",`
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
                <form class="is-hidden slide-up" id="init">
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
                <div id="timer-container" class="slide-up is-hidden has-text-grey-light">
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
    `)}}}function W(){const t=document.querySelector("#hourlyCost");if(t===null)throw new Error("Input for hourly cost not found");return t.value}function b(){const t=document.querySelector(".timer-display");if(t===null)throw new Error("Timer container not found");return{pause:()=>t.classList.add("timer-display--pause"),play:()=>t.classList.remove("timer-display--pause")}}function h(){const t=document.querySelector(".controls");if(t===null)throw new Error("Control button not found");return{pause:()=>{t.classList.remove("button--pause"),t.classList.add("button--play")},play:()=>{t.classList.remove("button--play"),t.classList.add("button--pause")},isPaused:()=>t.classList.contains("button--pause"),isPlayed:()=>t.classList.contains("button--play"),clickHandler:e=>{t.addEventListener("click",e)}}}function _(){const t=document.querySelector(".stop");if(t===null)throw new Error("Stop button not found");return{clickHandler:e=>{t.addEventListener("click",e)}}}function $(){const t=document.querySelector("#timer-container");if(t===null)throw new Error("Timer not found");return{show:()=>{t.classList.remove("is-hidden"),t.offsetWidth,t.classList.add("slide-up--show")}}}function f(){const t=document.querySelector("#init");if(t===null)throw new Error("Form for initialization not found");return{hide:()=>t.classList.add("is-hidden"),show:()=>{t.classList.remove("is-hidden"),t.offsetWidth,t.classList.add("slide-up--show")},submitHandler:e=>{t.addEventListener("submit",e)}}}function U(){return{getAppElement:()=>g().element,initAppDom:()=>{g().initDom()},displayErrorMessage:t=>{F().displayMessage(t)},setPlayerOnPause:()=>{const t=h(),e=b();t.pause(),e.pause()},setPlayerOnPlay:()=>{const t=h(),e=b();t.play(),e.play()},controlButtonClickHandler:t=>{h().clickHandler(t)},isPlayerOnPlay:()=>h().isPaused(),isPlayerOnPause:()=>h().isPlayed(),setStopButtonClickHandler:t=>{_().clickHandler(t)},showTimerContainer:()=>{$().show()},hideFormInit:()=>{f().hide()},showFormInit:()=>{f().show()},formInitSubmitHandler:t=>{f().submitHandler(t)},getAmountPerHourValue:W}}const c=U();function K(){const t=new N;c.initAppDom();const e=t.getTimer();e!==null&&w(e,t),e===null&&c.showFormInit(),c.formInitSubmitHandler(s=>{s.preventDefault();const l=c.getAmountPerHourValue();if(l.length===0)throw new Error("Invalid form");const r=new C({amountPerHour:Number(l),currentClock:"00:00:00",currentMoney:"0.00",isPaused:!1});w(r,t)}),O(c.getAppElement())}function R(t){c.displayErrorMessage(t)}function w(t,e){c.hideFormInit();const s=new D(t,e);t.getIsPaused()?(s.display(),c.setPlayerOnPause()):s.play(),c.showTimerContainer(),c.controlButtonClickHandler(()=>{c.isPlayerOnPlay()?(c.setPlayerOnPause(),s.pause()):c.isPlayerOnPause()&&(c.setPlayerOnPlay(),s.play())}),c.setStopButtonClickHandler(()=>{e.restoreTimer(),location.reload()})}document.addEventListener("DOMContentLoaded",()=>{try{K()}catch(t){R(t.message??"Une erreur est survenue.")}});
