var T=Object.defineProperty;var k=(t,e,s)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var a=(t,e,s)=>k(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const L="modulepreload",S=function(t){return"/time-spend/"+t},p={},M=function(e,s,c){let r=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),u=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));r=Promise.allSettled(s.map(l=>{if(l=S(l),l in p)return;p[l]=!0;const d=l.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const i=document.createElement("link");if(i.rel=d?"stylesheet":L,d||(i.as="script"),i.crossOrigin="",i.href=l,u&&i.setAttribute("nonce",u),document.head.appendChild(i),d)return new Promise((C,E)=>{i.addEventListener("load",C),i.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(n){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=n,window.dispatchEvent(u),!u.defaultPrevented)throw n}return r.then(n=>{for(const u of n||[])u.status==="rejected"&&o(u.reason);return e().catch(o)})};function $(t={}){const{immediate:e=!1,onNeedRefresh:s,onOfflineReady:c,onRegistered:r,onRegisteredSW:o,onRegisterError:n}=t;let u,l;const d=async(i=!0)=>{await l};async function m(){if("serviceWorker"in navigator){if(u=await M(async()=>{const{Workbox:i}=await import("./workbox-window.prod.es5-B9K5rw8f.js");return{Workbox:i}},[]).then(({Workbox:i})=>new i("/time-spend/sw.js",{scope:"/time-spend/",type:"classic"})).catch(i=>{n==null||n(i)}),!u)return;u.addEventListener("activated",i=>{(i.isUpdate||i.isExternal)&&window.location.reload()}),u.addEventListener("installed",i=>{i.isUpdate||c==null||c()}),u.register({immediate:e}).then(i=>{o?o("/time-spend/sw.js",i):r==null||r(i)}).catch(i=>{n==null||n(i)})}}return l=m(),d}function H(t){const e=t.querySelector("#pwa-toast"),s=e.querySelector(".message #toast-message"),c=e.querySelector("#pwa-close"),r=e.querySelector("#pwa-refresh");let o;const n=()=>o==null?void 0:o(!0);function u(d){if(d){requestAnimationFrame(()=>u(!1));return}e.classList.contains("refresh")&&r.removeEventListener("click",n),e.classList.remove("show","refresh")}function l(d){d||r.addEventListener("click",n),requestAnimationFrame(()=>{u(!1),d||e.classList.add("refresh"),e.classList.add("show")})}window.addEventListener("load",()=>{c.addEventListener("click",()=>u(!0)),o=$({immediate:!0,onOfflineReady(){s.innerHTML="App ready to work offline",l(!0)},onNeedRefresh(){s.innerHTML="New content available, click on reload button to update",l(!1)},onRegisteredSW(d,m){}})})}class h{constructor(e){a(this,"hours");a(this,"minutes");a(this,"seconds");this.hours=e.hours,this.minutes=e.minutes,this.seconds=e.seconds}static fromStartTime(e){const s=new Date(e),c=s.getHours(),r=s.getMinutes(),o=s.getSeconds();return new h({hours:c,minutes:r,seconds:o})}get value(){return`${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`}pad(e){return e.toString().padStart(2,"0")}}class q{constructor(){a(this,"observers",[])}addObserver(e){this.observers.push(e)}removeObserver(e){this.observers=this.observers.filter(s=>s!==e)}notify(e){this.observers.forEach(s=>s(e))}}class g extends q{}class I extends g{constructor(s){super();a(this,"seconds",0);a(this,"minutes",0);a(this,"hours",0);const[c,r,o]=s.getCurrentClock().split(":").map(Number);this.hours=c,this.minutes=r,this.seconds=o}update(){this.seconds++,this.seconds===60&&(this.seconds=0,this.minutes++),this.minutes===60&&(this.minutes=0,this.hours++),this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}display(){this.notify({hours:this.hours,minutes:this.minutes,seconds:this.seconds})}}class x extends g{constructor(s){super();a(this,"amountPerSecond");a(this,"amount",0);this.amountPerSecond=s.amountPerHour/60/60,this.amount=Number(s.getCurrentMoney())}update(){this.amount+=this.amountPerSecond,this.notify({amount:this.amount})}display(){this.notify({amount:this.amount})}}class A{constructor(e){a(this,"amount");this.amount=e.amount}get value(){return`${this.amount.toFixed(2)} €`}}class O{constructor(e,s){a(this,"storage");a(this,"clock");a(this,"money");a(this,"clockElement");a(this,"moneyElement");a(this,"intervalId");this.storage=s;const c=document.querySelector("#clock"),r=document.querySelector("#money");if(c===null)throw new Error("No clock element");if(r===null)throw new Error("No money element");this.clockElement=c,this.moneyElement=r,this.clock=new I(e),this.money=new x(e),this.clock.addObserver(this.updateClockElement.bind(this)),this.money.addObserver(this.updateMoneyElement.bind(this)),this.storage.saveTimer(e)}start(){this.intervalId=setInterval(()=>{this.clock.update(),this.money.update()},1e3),this.saveTimerAsPlayed()}pause(){clearInterval(this.intervalId),this.intervalId=void 0,this.saveTimerAsPaused()}display(){this.clock.display(),this.money.display()}updateClockElement(e){this.clockElement.innerText=new h(e).value,this.saveTimerCurrentClock()}updateMoneyElement(e){this.moneyElement.innerText=new A(e).value,this.saveTimerCurrentMoney()}saveTimerCurrentMoney(){const e=this.storage.getTimer();e!==null&&(e.setCurrentMoney(this.moneyElement.innerText.replace(" €","")),this.storage.saveTimer(e))}saveTimerCurrentClock(){const e=this.storage.getTimer();e!==null&&(e.setCurrentClock(this.clockElement.innerText),this.storage.saveTimer(e))}saveTimerAsPlayed(){const e=this.storage.getTimer();e!==null&&(e.setPlayed(),this.storage.saveTimer(e))}saveTimerAsPaused(){const e=this.storage.getTimer();e!==null&&(e.setPaused(),this.storage.saveTimer(e))}}class b{constructor(e){a(this,"isPaused");a(this,"currentClock");a(this,"currentMoney");a(this,"amountPerHour");this.isPaused=e.isPaused??null,this.currentClock=e.currentClock,this.currentMoney=e.currentMoney,this.amountPerHour=e.amountPerHour}setCurrentClock(e){this.currentClock=e}setCurrentMoney(e){this.currentMoney=e}setPaused(){this.isPaused=!0}setPlayed(){this.isPaused=!1}getPausedAt(){return this.isPaused}getCurrentMoney(){return this.currentMoney}getCurrentClock(){return this.currentClock}get snapshot(){return{isPaused:this.isPaused,currentClock:this.currentClock,currentMoney:this.currentMoney,amountPerHour:this.amountPerHour}}}class N{constructor(e="time_spent"){a(this,"storageKey");this.storageKey=e}getTimer(){const e=localStorage.getItem(this.storageKey);if(e===null)return null;const s=JSON.parse(e);return new b({isPaused:s.isPaused,currentClock:s.currentClock,currentMoney:s.currentMoney,amountPerHour:Number(s.amountPerHour.toFixed(2))})}saveTimer(e){localStorage.setItem(this.storageKey,JSON.stringify(e.snapshot))}restoreTimer(){localStorage.removeItem(this.storageKey)}}function D(){const t=document.querySelector("#error-message");if(t===null)throw new Error("Error message not found");return{displayMessage:e=>{const s=t.querySelector(".message-body");s&&(s.innerHTML=e),t.classList.toggle("is-hidden")}}}function B(){const t=document.querySelector("#app");if(t===null)throw new Error("app not found");return{element:t,initDom:()=>{t.insertAdjacentHTML("afterbegin",`
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
    `)}}}function F(){const t=document.querySelector("#hourlyCost");if(t===null)throw new Error("Input for hourly cost not found");return t.value}function w(){const t=document.querySelector(".timer-display");if(t===null)throw new Error("Timer container not found");return{pause:()=>t.classList.add("timer-display--pause"),play:()=>t.classList.remove("timer-display--pause")}}function f(){const t=document.querySelector(".controls");if(t===null)throw new Error("Control button not found");return{pause:()=>{t.classList.remove("button--pause"),t.classList.add("button--play")},play:()=>{t.classList.remove("button--play"),t.classList.add("button--pause")},isPaused:()=>t.classList.contains("button--pause"),isPlayed:()=>t.classList.contains("button--play"),clickHandler:e=>{t.addEventListener("click",e)}}}function _(){const t=document.querySelector(".stop");if(t===null)throw new Error("Stop button not found");return{clickHandler:e=>{t.addEventListener("click",e)}}}function U(){const t=document.querySelector("#timer-container");if(t===null)throw new Error("Timer not found");return{show:()=>t.classList.remove("is-hidden")}}function P(){const t=document.querySelector("#init");if(t===null)throw new Error("Form for initialization not found");return{hide:()=>t.classList.add("is-hidden"),submitHandler:e=>{t.addEventListener("submit",e)}}}function W(t){D().displayMessage(t)}function y(){const t=w();f().pause(),t.pause()}function K(){const t=w();f().play(),t.play()}function v(t,e){const s=f(),c=_(),r=U();P().hide();const n=new O(t,e);t.getPausedAt()?(n.display(),y()):n.start(),r.show(),s.clickHandler(()=>{s.isPaused()?(y(),n.pause()):s.isPlayed()&&(K(),n.start())}),c.clickHandler(()=>{e.restoreTimer(),location.reload()})}function R(){const t=new N,e=B();e.initDom();const s=t.getTimer();s!==null&&v(s,t),P().submitHandler(r=>{r.preventDefault();const o=F();if(o.length===0)throw new Error("Invalid form");const n=new b({amountPerHour:Number(o),currentClock:"00:00:00",currentMoney:"0.00",isPaused:!1});v(n,t)}),H(e.element)}document.addEventListener("DOMContentLoaded",()=>{try{R()}catch(t){W(t.message??"Une erreur est survenue.")}});
