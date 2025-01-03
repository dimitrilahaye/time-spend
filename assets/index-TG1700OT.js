var E=Object.defineProperty;var k=(t,e,s)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var l=(t,e,s)=>k(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const L="modulepreload",M=function(t){return"/time-spend/"+t},g={},A=function(e,s,r){let n=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=Promise.allSettled(s.map(d=>{if(d=M(d),d in g)return;g[d]=!0;const m=d.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const a=document.createElement("link");if(a.rel=m?"stylesheet":L,m||(a.as="script"),a.crossOrigin="",a.href=d,c&&a.setAttribute("nonce",c),document.head.appendChild(a),m)return new Promise((T,C)=>{a.addEventListener("load",T),a.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return n.then(i=>{for(const c of i||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};function B(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:r,onRegistered:n,onRegisteredSW:o,onRegisterError:i}=t;let c,d;const m=async(a=!0)=>{await d};async function p(){if("serviceWorker"in navigator){if(c=await A(async()=>{const{Workbox:a}=await import("./workbox-window.prod.es5-B9K5rw8f.js");return{Workbox:a}},[]).then(({Workbox:a})=>new a("/time-spend/sw.js",{scope:"/time-spend/",type:"classic"})).catch(a=>{i==null||i(a)}),!c)return;c.addEventListener("activated",a=>{(a.isUpdate||a.isExternal)&&window.location.reload()}),c.addEventListener("installed",a=>{a.isUpdate||r==null||r()}),c.register({immediate:e}).then(a=>{o?o("/time-spend/sw.js",a):n==null||n(a)}).catch(a=>{i==null||i(a)})}}return d=p(),m}function I(t){const e=t.querySelector("#pwa-toast"),s=e.querySelector(".message #toast-message"),r=e.querySelector("#pwa-close"),n=e.querySelector("#pwa-refresh");let o;const i=()=>o==null?void 0:o(!0);function c(m){if(m){requestAnimationFrame(()=>c(!1));return}e.classList.contains("refresh")&&n.removeEventListener("click",i),e.classList.remove("show","refresh")}function d(m){m||n.addEventListener("click",i),requestAnimationFrame(()=>{c(!1),m||e.classList.add("refresh"),e.classList.add("show")})}window.addEventListener("load",()=>{r.addEventListener("click",()=>c(!0)),o=B({immediate:!0,onOfflineReady(){s.innerHTML="App ready to work offline",d(!0)},onNeedRefresh(){s.innerHTML="New content available, click on reload button to update",d(!1)},onRegisteredSW(m,p){}})})}class v{constructor(e){l(this,"hours");l(this,"minutes");l(this,"seconds");this.hours=e.hours,this.minutes=e.minutes,this.seconds=e.seconds}static fromStartTime(e){const s=new Date(e),r=s.getHours(),n=s.getMinutes(),o=s.getSeconds();return new v({hours:r,minutes:n,seconds:o})}get value(){return`${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`}pad(e){return e.toString().padStart(2,"0")}}class O{constructor(){l(this,"observers",[])}addObserver(e){this.observers.push(e)}removeObserver(e){this.observers=this.observers.filter(s=>s!==e)}notify(e){this.observers.forEach(s=>s(e))}}class P extends O{getElapsedTimeSinceStandby(e){return Date.now()-e}}class H extends P{constructor(s){super();l(this,"seconds",0);l(this,"minutes",0);l(this,"hours",0);const[r,n,o]=s.currentClock.split(":").map(Number);this.hours=r,this.minutes=n,this.seconds=o}update(){this.seconds++,this.seconds===60&&(this.seconds=0,this.minutes++),this.minutes===60&&(this.minutes=0,this.hours++),this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}display(){this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}exitStandby(s){if(s.isPaused)return;const r=s.onStandByAt;if(r===null)return;const n=this.getElapsedTimeSinceStandby(r);this.addElapsedTimeToCurrentClock(n),this.display()}addElapsedTimeToCurrentClock(s){const r=s+this.getCurrentClockInMilliseconds();this.setCurrentClockFromMilliseconds(r)}getCurrentClockInMilliseconds(){return this.hours*60*60*1e3+this.minutes*60*1e3+this.seconds*1e3}setCurrentClockFromMilliseconds(s){const r=Math.floor(s/36e5),n=Math.floor(s%(1e3*60*60)/(1e3*60)),o=Math.floor(s%(1e3*60)/1e3);this.hours=r,this.minutes=n,this.seconds=o}}class _ extends P{constructor(s){super();l(this,"amountPerSecond");l(this,"amount",0);this.amountPerSecond=s.amountPerHour/60/60,this.amount=Number(s.currentMoney)}update(){this.amount+=this.amountPerSecond,this.notify({amount:this.amount})}display(){this.notify({amount:this.amount})}exitStandby(s){if(s.isPaused)return;const r=s.onStandByAt;if(r===null)return;const o=this.getElapsedTimeSinceStandby(r)/1e3;this.amount+=this.amountPerSecond*o,this.display()}}class x{constructor(e){l(this,"amount");this.amount=e.amount}get value(){return`${this.amount.toFixed(2)} €`}}class h{constructor(e){l(this,"_isPaused");l(this,"_currentClock");l(this,"_currentMoney");l(this,"_onStandByAt");l(this,"amountPerHour");this._isPaused=e.isPaused??null,this._currentClock=e.currentClock,this._currentMoney=e.currentMoney,this._onStandByAt=e.onStandByAt,this.amountPerHour=e.amountPerHour}setPlayed(){this._isPaused=!1}setPaused(){this._isPaused=!0}get isPaused(){return this._isPaused}get currentClock(){return this._currentClock}set currentClock(e){this._currentClock=e}get currentMoney(){return this._currentMoney}set currentMoney(e){this._currentMoney=e}get onStandByAt(){return this._onStandByAt}defineOnStandByAt(){this._onStandByAt=Date.now()}removeOnStandByAt(){this._onStandByAt=null}get snapshot(){return{isPaused:this._isPaused,currentClock:this._currentClock,currentMoney:this._currentMoney,onStandByAt:this.onStandByAt,amountPerHour:this.amountPerHour}}static clone(e){return new h(e.snapshot)}}class q{constructor(e,s){l(this,"storage");l(this,"clock");l(this,"money");l(this,"clockElement");l(this,"moneyElement");l(this,"intervalId");this.storage=s;const r=document.querySelector("#clock"),n=document.querySelector("#money");if(r===null)throw new Error("No clock element");if(n===null)throw new Error("No money element");this.clockElement=r,this.moneyElement=n,this.clock=new H(e),this.money=new _(e),this.clock.addObserver(this.updateClockElement.bind(this)),this.money.addObserver(this.updateMoneyElement.bind(this)),this.storage.saveTimer(h.clone(e))}play(){this.start(),this.saveTimerAsPlayed()}pause(){this.stop(),this.saveTimerAsPaused()}display(){this.clock.display(),this.money.display()}defineOnStandby(){const e=this.storage.getTimer();e!==null&&(this.stop(),e.defineOnStandByAt(),this.storage.saveTimer(h.clone(e)))}exitStandby(){const e=this.storage.getTimer();e!==null&&(this.clock.exitStandby(e),this.money.exitStandby(e),this.start(),e.removeOnStandByAt(),this.storage.saveTimer(h.clone(e)))}start(){this.intervalId&&this.stop(),this.intervalId=setInterval(()=>{this.clock.update(),this.money.update()},1e3)}stop(){clearInterval(this.intervalId),this.intervalId=void 0}updateClockElement(e){this.clockElement.innerText=new v(e).value,this.saveTimerCurrentClock()}updateMoneyElement(e){this.moneyElement.innerText=new x(e).value,this.saveTimerCurrentMoney()}saveTimerCurrentMoney(){const e=this.storage.getTimer();e!==null&&(e.currentMoney=this.moneyElement.innerText.replace(" €",""),this.storage.saveTimer(h.clone(e)))}saveTimerCurrentClock(){const e=this.storage.getTimer();e!==null&&(e.currentClock=this.clockElement.innerText,this.storage.saveTimer(h.clone(e)))}saveTimerAsPlayed(){const e=this.storage.getTimer();e!==null&&(e.removeOnStandByAt(),e.setPlayed(),this.storage.saveTimer(h.clone(e)))}saveTimerAsPaused(){const e=this.storage.getTimer();e!==null&&(e.setPaused(),this.storage.saveTimer(h.clone(e)))}}class D{constructor(e="time_spent"){l(this,"storageKey");this.storageKey=e}getTimer(){const e=localStorage.getItem(this.storageKey);if(e===null)return null;const s=JSON.parse(e);return new h({isPaused:s.isPaused,currentClock:s.currentClock,currentMoney:s.currentMoney,amountPerHour:Number(s.amountPerHour.toFixed(2)),onStandByAt:s.onStandByAt??null})}saveTimer(e){localStorage.setItem(this.storageKey,JSON.stringify(e.snapshot))}restoreTimer(){localStorage.removeItem(this.storageKey)}}function F(){const t=document.querySelector("#error-message");if(t===null)throw new Error("Error message not found");return{displayMessage:e=>{const s=t.querySelector(".message-body");s&&(s.innerHTML=e),t.classList.toggle("is-hidden")}}}function b(){const t=document.querySelector("#app");if(t===null)throw new Error("app not found");return{element:t,initDom:()=>{t.insertAdjacentHTML("afterbegin",`
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
    `)}}}function N(){const t=document.querySelector("#hourlyCost");if(t===null)throw new Error("Input for hourly cost not found");return t.value}function w(){const t=document.querySelector(".timer-display");if(t===null)throw new Error("Timer container not found");return{pause:()=>t.classList.add("timer-display--pause"),play:()=>t.classList.remove("timer-display--pause")}}function y(){const t=document.querySelector(".controls");if(t===null)throw new Error("Control button not found");return{pause:()=>{t.classList.remove("button--pause"),t.classList.add("button--play")},play:()=>{t.classList.remove("button--play"),t.classList.add("button--pause")},isPaused:()=>t.classList.contains("button--pause"),isPlayed:()=>t.classList.contains("button--play"),clickHandler:e=>{t.addEventListener("click",e)}}}function W(){const t=document.querySelector(".stop");if(t===null)throw new Error("Stop button not found");return{clickHandler:e=>{t.addEventListener("click",e)}}}function $(){const t=document.querySelector("#timer-container");if(t===null)throw new Error("Timer not found");return{show:()=>{t.classList.remove("is-hidden"),t.offsetWidth,t.classList.add("slide-up--show")}}}function f(){const t=document.querySelector("#init");if(t===null)throw new Error("Form for initialization not found");return{hide:()=>t.classList.add("is-hidden"),show:()=>{t.classList.remove("is-hidden"),t.offsetWidth,t.classList.add("slide-up--show")},submitHandler:e=>{t.addEventListener("submit",e)}}}function U(){return{getAppElement:()=>b().element,initAppDom:()=>{b().initDom()},displayErrorMessage:t=>{F().displayMessage(t)},setPlayerOnPause:()=>{const t=y(),e=w();t.pause(),e.pause()},setPlayerOnPlay:()=>{const t=y(),e=w();t.play(),e.play()},controlButtonClickHandler:t=>{y().clickHandler(t)},isPlayerOnPlay:()=>y().isPaused(),isPlayerOnPause:()=>y().isPlayed(),setStopButtonClickHandler:t=>{W().clickHandler(t)},showTimerContainer:()=>{$().show()},hideFormInit:()=>{f().hide()},showFormInit:()=>{f().show()},formInitSubmitHandler:t=>{f().submitHandler(t)},getAmountPerHourValue:N}}const u=U();function K(){const t=new D;u.initAppDom();const e=t.getTimer();e!==null&&S(e,t),e===null&&u.showFormInit(),u.formInitSubmitHandler(s=>{s.preventDefault();const r=u.getAmountPerHourValue();if(r.length===0)throw new Error("Invalid form");const n=new h({amountPerHour:Number(r),currentClock:"00:00:00",currentMoney:"0.00",isPaused:!1,onStandByAt:null});S(n,t)}),I(u.getAppElement())}function R(t){u.displayErrorMessage(t)}function S(t,e){u.hideFormInit();const s=new q(t,e);t.isPaused?(s.display(),u.setPlayerOnPause()):s.play(),u.showTimerContainer(),u.controlButtonClickHandler(()=>{u.isPlayerOnPlay()?(u.setPlayerOnPause(),s.pause()):u.isPlayerOnPause()&&(u.setPlayerOnPlay(),s.play())}),u.setStopButtonClickHandler(()=>{e.restoreTimer(),location.reload()}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&s.defineOnStandby(),document.visibilityState==="visible"&&s.exitStandby()})}document.addEventListener("DOMContentLoaded",()=>{try{K()}catch(t){R(t.message??"Une erreur est survenue.")}});
