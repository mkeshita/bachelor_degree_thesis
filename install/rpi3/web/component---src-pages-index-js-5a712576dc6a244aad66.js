(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{146:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(152),s=n(7),i=n.n(s),c=n(141),u=n.n(c),l=function(e){function t(t){var n;return(n=e.call(this,t)||this).getCurrentDate=function(){return(new Date).toLocaleDateString("es-ES",{weekday:"long",month:"long",day:"numeric"})},n.getCurrentTime=function(){var e=(new Date).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});return"0:00"===e&&n.setState({date:n.getCurrentDate()}),e},n.state={time:n.getCurrentTime(),date:n.getCurrentDate()},n}i()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;this.timer=setInterval(function(){e.setState({time:e.getCurrentTime()})},1e4)},n.componentWillUnmount=function(){clearInterval(this.timer)},n.render=function(){return r.a.createElement("div",{className:u.a.clock},r.a.createElement("div",{className:u.a.date},this.state.date,","),r.a.createElement("div",{className:u.a.time},this.state.time))},t}(r.a.Component),m=(n(160),n(161),n(78),n(56),n(142)),d=n.n(m),f=function(e){function t(t){var a;(a=e.call(this,t)||this).getReservations=function(){fetch("http://"+a.config.Rpi3APIAddress+":"+a.config.Rpi3APIPort+"/reservations").then(function(e){return e.json()}).then(function(e){return a.setState({reservations:e})}).catch(function(e){return console.log("Request failed",e)})},a.updateCurrentTime=function(){var e=new Date;a.currentHour=e.getHours(),a.currentMinutes=e.getMinutes()},a.getCard=function(e,t){return a.currentHour<e.EndHour||a.currentHour===e.EndHour&&a.currentMinutes<e.EndMinute?r.a.createElement("div",{key:t,className:d.a.card},r.a.createElement("div",{className:d.a.subject},e.Subject),r.a.createElement("div",{className:d.a.study},e.Study),r.a.createElement("div",{className:d.a.classroom},e.Classroom," de ",e.StartHour+":"+(0===e.StartMinute?"00":e.StartMinute)," a ",e.EndHour+":"+(0===e.EndMinute?"00":e.EndMinute)),r.a.createElement("div",{className:d.a.professor},e.Professor)):null},a.createCards=function(){a.updateCurrentTime();var e=[],t=a.state.reservations.entries(),n=Array.isArray(t),o=0;for(t=n?t:t[Symbol.iterator]();;){var s;if(n){if(o>=t.length)break;s=t[o++]}else{if((o=t.next()).done)break;s=o.value}var i=s,c=i[0],u=i[1],l=a.getCard(u,c);if(null!=l&&e.push(l),4===e.length)break}return 0!==e.length?e:r.a.createElement("div",{className:d.a.endCard},"No hay reservas para el día de hoy o ya han finalizado todas las reservas")},a.state={reservations:[]},a.currentHour=0,a.currentMinutes=0;try{a.config=n(!function(){var e=new Error("Cannot find module '/etc/rpi3_conf.json'");throw e.code="MODULE_NOT_FOUND",e}())}catch(o){a.config=n(147)}return a}i()(t,e);var a=t.prototype;return a.render=function(){return this.createCards()},a.componentDidMount=function(){var e=this;this.getReservations(),this.timer=setInterval(function(){e.getReservations()},6e4)},a.componentWillUnmount=function(){clearInterval(this.timer)},t}(r.a.Component),h=n(143),p=n.n(h),v=function(e){function t(t){var a;(a=e.call(this,t)||this).getClassrooms=function(){fetch("http://"+a.config.Rpi3APIAddress+":"+a.config.Rpi3APIPort+"/classrooms").then(function(e){return e.json()}).then(function(e){return a.setState({classrooms:e})}).catch(function(e){return console.log("Request failed",e)})},a.createClassrooms=function(){var e=[],t=0;for(var n in a.state.classrooms)0===a.state.classrooms[n]?e.push(r.a.createElement("div",{key:t,className:p.a.free},n)):1===a.state.classrooms[n]?e.push(r.a.createElement("div",{key:t,className:p.a.occupied},n)):e.push(r.a.createElement("div",{key:t,className:p.a.reserved},n)),t++;return e},a.state={classrooms:[]};try{a.config=n(!function(){var e=new Error("Cannot find module '/etc/rpi3_conf.json'");throw e.code="MODULE_NOT_FOUND",e}())}catch(o){a.config=n(147)}return a}i()(t,e);var a=t.prototype;return a.render=function(){return this.createClassrooms()},a.componentDidMount=function(){var e=this;this.getClassrooms(),this.timer=setInterval(function(){e.getClassrooms()},6e4)},a.componentWillUnmount=function(){clearInterval(this.timer)},t}(r.a.Component),g=n(144),E=n.n(g),C=function(e){function t(t){var a;(a=e.call(this,t)||this).getValues=function(){fetch("http://"+a.config.Rpi2APIAddress+":"+a.config.Rpi2APIPort+"/cpd-status").then(function(e){return e.json()}).then(function(e){return a.setState({cpdStatus:e})}).catch(function(e){return console.log("Request failed",e)})},a.state={cpdStatus:[]};try{a.config=n(!function(){var e=new Error("Cannot find module '/etc/rpi3_conf.json'");throw e.code="MODULE_NOT_FOUND",e}())}catch(r){a.config=n(147)}return a}i()(t,e);var a=t.prototype;return a.componentDidMount=function(){var e=this;this.getValues(),this.timer=setInterval(function(){e.getValues()},6e4)},a.componentWillUnmount=function(){clearInterval(this.timer)},a.render=function(){var e="La temperatura en el CPD es de "+this.state.cpdStatus.temperature+" ºC"+"   •   "+("La humedad en el CPD está al "+this.state.cpdStatus.humidity+" %")+"   •   "+("El estado de la batería del SAI es "+this.state.cpdStatus["ups status (LDI rack)"]+".")+"      •      ";return r.a.createElement("div",{className:E.a.marquee},r.a.createElement("pre",null,e),r.a.createElement("pre",null,e),r.a.createElement("pre",null,e))},t}(r.a.Component);t.default=function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement(o.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"LDI"),r.a.createElement("meta",{"http-equiv":"Content-Language",content:"es"})),r.a.createElement("header",{className:"header"},r.a.createElement("div",{className:"headerTitle"},r.a.createElement("h1",null,"Laboratorio del Departamento de Informática")),r.a.createElement("div",{className:"datetime"},r.a.createElement(l,null))),r.a.createElement("main",{className:"main"},r.a.createElement(f,null)),r.a.createElement("aside",{className:"aside"},r.a.createElement(v,null)),r.a.createElement("footer",{className:"footer"},r.a.createElement(C,null)))}},147:function(e){e.exports={Rpi2APIAddress:"163.117.170.102",Rpi2APIPort:3e3,Rpi3APIAddress:"163.117.170.103",Rpi3APIPort:3e3,Rpi2APIAuthorizedToken:"Bearer top_secret_string",HueBridgeAddress:"192.168.1.123",HueBridgeToken:"top_secret_string",AlarmSoundPath:"/path/to/file/mp3"}}}]);
//# sourceMappingURL=component---src-pages-index-js-5a712576dc6a244aad66.js.map