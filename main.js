(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{w:()=>N});var t,r=document.querySelector(".profile__title"),n=document.querySelector(".profile__subtitle"),o=document.querySelector(".profile__avatar-img"),c=function(e,t,r){t.classList.remove(r.inputErrorClass);var n=e.querySelector(".".concat(t.id,"-input-error"));n.classList.remove(r.errorClass),n.textContent=""},u=function(e,t,r){return t.validity.valid?c(e,t,r):function(e,t,r,n){t.classList.add(r.inputErrorClass);var o=e.querySelector(".".concat(t.id,"-input-error"));o.textContent=n,o.classList.add(r.errorClass)}(e,t,r,t.validationMessage),t.validity.valid},a=function(e,t){return Array.from(e.querySelectorAll(t.inputSelector)).map((function(r){return u(e,r,t)})).reduce((function(e,t){return e&&t}))},i=function(e,t){var r=e.querySelector(t.submitButtonSelector);Array.from(e.querySelectorAll(t.inputSelector)).some((function(e){return!e.validity.valid}))?r.classList.add(t.inactiveButtonClass):r.classList.remove(t.inactiveButtonClass)},l=function(e){p(e),e.querySelector(".popup__form")&&i(e.querySelector(".popup__form"),N),e.classList.add("popup_opened")},s=function(e){e.classList.remove("popup_opened"),e.querySelector(".popup__form")&&function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){return c(e,r,t)}))}(e.querySelector(".popup__form"),N)},p=function(e){e.classList.contains("overlay")||e.classList.add("overlay")},d=document.querySelector("#viewer-popup"),_=d.querySelector(".viewer__image"),v=d.querySelector(".viewer__caption");d.querySelector(".popup__btn-close").addEventListener("click",(function(){s(d)}));var f=function(e,t){_.src=e,_.alt=t,v.textContent=t,l(d)},y=document.querySelector(".cards__list"),m=document.querySelector("#card-template").content.querySelector(".card"),S=function(e,r,n,o){var c,u=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=m.cloneNode(!0);a.querySelector(".card__title").textContent=r,a.id=e;var i=a.querySelector(".card__image");if(i.src=n,i.alt=r,a.querySelector(".card__image").addEventListener("click",(function(){return f(n,r)})),a.querySelector(".card__btn-like").addEventListener("click",L),null!=o&&o.find((function(e){return e._id===t}))&&a.querySelector(".card__btn-like").classList.add("card__btn-like_active"),E(a,null!==(c=null==o?void 0:o.length)&&void 0!==c?c:0),u){var l=a.querySelector(".card__btn-remove");l.addEventListener("click",(function(t){return b(t,e)})),l.classList.add("card__btn-remove_visible")}return a},q=function(e,t){e.prepend(t)},b=function(e,t){C(t).then((function(t){return e.target.closest(".card").remove()}))},L=function(e){var t=e.target.closest(".card");e.target.classList.contains("card__btn-like_active")?(e.target.classList.remove("card__btn-like_active"),x(t.id).then((function(e){return E(t,e.likes.length)}))):(e.target.classList.add("card__btn-like_active"),g(t.id).then((function(e){return E(t,e.likes.length)})))},E=function(e,t){e.querySelector(".card__likes").textContent=t},k="https://nomoreparties.co/v1/plus-cohort-6",h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",r=arguments.length>2?arguments[2]:void 0;return fetch(e,{method:t,headers:{authorization:"c677fa90-7905-4374-86f2-1b0b7555aa56","Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(t){return t.ok?t.json():Promise.reject("Unable fetch requesting ".concat(e,", reason: ").concat(t.status))}))},C=function(e){return h("".concat(k,"/cards/").concat(e),"DELETE")},g=function(e){return h("".concat(k,"/cards/likes/").concat(e),"PUT")},x=function(e){return h("".concat(k,"/cards/likes/").concat(e),"DELETE")},A=document.querySelector("#avatar-popup"),P=A.querySelector("#avatar-link"),T=document.querySelector(".profile__avatar-img");A.querySelector(".popup__btn-close").addEventListener("click",(function(){s(A)})),A.querySelector(".popup__form").addEventListener("submit",(function(e){if(e.preventDefault(),a(e.target,N)){T.src=P.value;var t,r=e.target.querySelector(".popup__btn-submit");r.textContent="Сохранение...",(t=P.value,h("".concat(k,"/users/me/avatar"),"PATCH",{avatar:t})).then((function(e){r.textContent="Сохранить",s(A)}))}}));var w=document.querySelector("#card-popup"),j=w.querySelector("#title"),B=w.querySelector("#link");w.querySelector(".popup__btn-close").addEventListener("click",(function(){s(w)})),w.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault();var t=j.value,r=B.value,n=e.target.querySelector(".popup__btn-submit");n.textContent="Сохранение...",a(e.target,N)&&function(e,t){return h("".concat(k,"/cards"),"POST",{name:e,link:t})}(t,r).then((function(e){var o;o=S(e._id,t,r),q(y,o),n.textContent="Сохранить",s(w)}))}));var D=document.querySelector("#profile-popup"),O=D.querySelector("#name"),H=D.querySelector("#appointment");D.querySelector(".popup__btn-close").addEventListener("click",(function(){s(D)})),D.querySelector(".popup__form").addEventListener("submit",(function(e){if(e.preventDefault(),a(e.target,N)){r.textContent=O.value,n.textContent=H.value;var t,o=e.target.querySelector(".popup__btn-submit");o.textContent="Сохранение...",(t={name:O.value,about:H.value},h("".concat(k,"/users/me"),"PATCH",t)).then((function(e){o.textContent="Сохранить",s(D)}))}}));var N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn-submit",inactiveButtonClass:"popup__btn-submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"};!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(r){r.addEventListener("input",(function(){u(t,r,e),i(t,e)}))}))}))}(N),document.addEventListener("keyup",(function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");t&&s(t)}})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.stopPropagation(),t.target.classList.contains("overlay")&&s(e)}))})),document.querySelector(".profile__btn-add").addEventListener("click",(function(){j.value="",B.value="",l(w)})),document.querySelector(".profile__btn-edit").addEventListener("click",(function(){O.value=r.textContent,H.value=n.textContent,l(D)})),document.querySelector(".profile__avatar-edit").addEventListener("click",(function(){P.value=T.src,l(A)})),h("".concat(k,"/users/me")).then((function(e){return t=(c=e)._id,r.textContent=c.name,n.textContent=c.about,void(o.src=c.avatar);var c})).then((function(e){return h("".concat(k,"/cards"))})).then((function(e){e.forEach((function(e){var r=e.owner._id===t;q(y,S(e._id,e.name,e.link,e.likes,r))}))}))})();