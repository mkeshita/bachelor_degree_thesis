(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{146:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(152),s=a(7),i=a.n(s),c=a(141),u=a.n(c),l=function(e){function t(t){var a;return(a=e.call(this,t)||this).getCurrentDate=function(){return(new Date).toLocaleDateString("es-ES",{weekday:"short",month:"short",day:"numeric"})},a.getCurrentTime=function(){var e=(new Date).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});return"0:00"===e&&a.setState({date:a.getCurrentDate()}),e},a.state={time:a.getCurrentTime(),date:a.getCurrentDate()},a}i()(t,e);var a=t.prototype;return a.componentDidMount=function(){var e=this;this.timer=setInterval(function(){e.setState({time:e.getCurrentTime()})},1e4)},a.componentWillUnmount=function(){clearInterval(this.timer)},a.render=function(){return r.a.createElement("div",{className:u.a.clock},r.a.createElement("div",{className:u.a.date},this.state.date),r.a.createElement("div",{className:u.a.time},this.state.time))},t}(r.a.Component),m=(a(160),a(78),a(79),a(162),a(163),a(81),a(56),a(142)),d=a.n(m),f=function(e){function t(t){var n;(n=e.call(this,t)||this).getReservations=function(){fetch("http://"+n.config.Rpi3APIAddress+":"+n.config.Rpi3APIPort+"/reservations").then(function(e){return e.json()}).then(function(e){return n.setState({reservations:e})}).catch(function(e){return console.log("Request failed",e)})},n.updateCurrentTime=function(){var e=new Date;n.currentHour=e.getHours(),n.currentMinutes=e.getMinutes()},n.getCard=function(e,t){return n.rotated&&t<4&&n.reservationsNum>4?null:n.currentHour<e.EndHour||n.currentHour===e.EndHour&&n.currentMinutes<e.EndMinute?r.a.createElement("div",{key:t,className:d.a.card},r.a.createElement("div",{className:d.a.subject},e.Subject),r.a.createElement("div",{className:d.a.study},e.Study),r.a.createElement("div",{className:d.a.classroom},e.Classroom," de ",e.StartHour+":"+(0===e.StartMinute?"00":e.StartMinute)," a ",e.EndHour+":"+(0===e.EndMinute?"00":e.EndMinute))):null},n.createCards=function(){n.updateCurrentTime();var e=[],t=n.state.reservations.entries(),a=Array.isArray(t),o=0;for(t=a?t:t[Symbol.iterator]();;){var s;if(a){if(o>=t.length)break;s=t[o++]}else{if((o=t.next()).done)break;s=o.value}var i=s,c=i[0],u=i[1],l=n.getCard(u,c);if(null!=l&&e.push(l),4===e.length)break}return n.rotated?n.rotated=!1:n.rotated=!0,n.globalState=(n.globalState+1)%6,0!==e.length?(n.reservationsNum=n.state.reservations.length,e):r.a.createElement("div",{className:d.a.endCard},"No hay reservas para el día de hoy o ya han finalizado todas las reservas")},n.getOccupation=function(){fetch("http://"+n.config.Rpi3APIAddress+":"+n.config.Rpi3APIPort+"/occupation").then(function(e){return e.json()}).then(function(e){var t=["caca"];console.log(t),t[0]=e.F16.Computers,t[1]=e.F18.Computers,t[2]=e.C05.Computers,t[3]=e.C06.Computers,console.log(t),n.setState({occupation:t})}).catch(function(e){return console.log("Request failed",e)})},n.getComputer=function(e,t,a){var n=t+1;switch(a.includes("C")&&(n+=50),e){case 0:return r.a.createElement("div",{key:t,className:d.a.shutdown},n<10?a+"0"+n.toString():a+n.toString());case 1:return r.a.createElement("div",{key:t,className:d.a.linux},n<10?a+"0"+n.toString():a+n.toString());case 2:return r.a.createElement("div",{key:t,className:d.a.windows},n<10?a+"0"+n.toString():a+n.toString());case 3:return r.a.createElement("div",{key:t,className:d.a.linuxUser},n<10?a+"0"+n.toString():a+n.toString());case 4:return r.a.createElement("div",{key:t,className:d.a.windowsUser},n<10?a+"0"+n.toString():a+n.toString());case 5:return r.a.createElement("div",{key:t,className:d.a.timeout},n<10?a+"0"+n.toString():a+n.toString());default:return r.a.createElement("div",{key:t})}},n.printClassrooms=function(){var e=["F1","F2","C","C1"],t=[r.a.createElement("h2",{className:d.a.title},"Aula ",["4.0.F16","4.0.F18","2.2.C05","2.2.C06"][n.classroomToShow])];console.log(n.classroomToShow),console.log(n.state.occupation),console.log(n.state.occupation[n.classroomToShow]);var a=n.state.occupation[n.classroomToShow].entries(),o=Array.isArray(a),s=0;for(a=o?a:a[Symbol.iterator]();;){var i;if(o){if(s>=a.length)break;i=a[s++]}else{if((s=a.next()).done)break;i=s.value}var c=i,u=c[0],l=c[1];t.push(n.getComputer(l,u,e[n.classroomToShow]))}return n.classroomToShow=(n.classroomToShow+1)%4,n.globalState=(n.globalState+1)%6,t},n.magic=function(){return n.globalState<2?n.createCards():0!==n.state.occupation.length?n.printClassrooms():(n.globalState=0,n.createCards())},n.state={reservations:[],occupation:[]},n.rotated=!1,n.reservationsNum=0,n.currentHour=0,n.currentMinutes=0,n.globalState=0,n.classroomToShow=0;try{n.config=a(!function(){var e=new Error("Cannot find module '/etc/rpi3_conf.json'");throw e.code="MODULE_NOT_FOUND",e}())}catch(o){n.config=a(147)}return n}i()(t,e);var n=t.prototype;return n.render=function(){return this.magic()},n.componentDidMount=function(){var e=this;this.getReservations(),this.getOccupation(),this.timer1=setInterval(function(){e.getReservations()},1e4),this.timer2=setInterval(function(){e.getOccupation()},3e5)},n.componentWillUnmount=function(){clearInterval(this.timer1),clearInterval(this.timer2)},t}(r.a.Component),h=a(143),p=a.n(h),g=function(e){function t(t){var n;(n=e.call(this,t)||this).getClassrooms=function(){fetch("http://"+n.config.Rpi3APIAddress+":"+n.config.Rpi3APIPort+"/classrooms").then(function(e){return e.json()}).then(function(e){return n.setState({classrooms:e})}).catch(function(e){return console.log("Request failed",e)})},n.createClassrooms=function(){var e=[],t=0;for(var a in n.state.classrooms)0===n.state.classrooms[a]?e.push(r.a.createElement("div",{key:t,className:p.a.free},a)):1===n.state.classrooms[a]?e.push(r.a.createElement("div",{key:t,className:p.a.occupied},a)):2===n.state.classrooms[a]?e.push(r.a.createElement("div",{key:t,className:p.a.reserved},a)):e.push(r.a.createElement("div",{key:t,className:p.a.futureOccupied},a)),t++;return e},n.state={classrooms:[]};try{n.config=a(!function(){var e=new Error("Cannot find module '/etc/rpi3_conf.json'");throw e.code="MODULE_NOT_FOUND",e}())}catch(o){n.config=a(147)}return n}i()(t,e);var n=t.prototype;return n.render=function(){return this.createClassrooms()},n.componentDidMount=function(){var e=this;this.getClassrooms(),this.timer=setInterval(function(){e.getClassrooms()},6e4)},n.componentWillUnmount=function(){clearInterval(this.timer)},t}(r.a.Component),v=a(144),E=a.n(v),S=function(e){function t(t){var n;(n=e.call(this,t)||this).getValues=function(){fetch("http://"+n.config.Rpi2APIAddress+":"+n.config.Rpi2APIPort+"/cpd-status").then(function(e){return e.json()}).then(function(e){return n.setState({cpdStatus:e})}).catch(function(e){return console.log("Request failed",e)})},n.state={cpdStatus:[]};try{n.config=a(!function(){var e=new Error("Cannot find module '/etc/rpi3_conf.json'");throw e.code="MODULE_NOT_FOUND",e}())}catch(r){n.config=a(147)}return n}i()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;this.getValues(),this.timer=setInterval(function(){e.getValues()},6e4)},n.componentWillUnmount=function(){clearInterval(this.timer)},n.render=function(){var e="La temperatura en el CPD es de "+this.state.cpdStatus.temperature+" ºC"+"   •   "+("La humedad en el CPD está al "+this.state.cpdStatus.humidity+" %")+"   •   "+("El estado de la batería del SAI es "+this.state.cpdStatus["ups status (LDI rack)"]+".")+"   •   ";return r.a.createElement("div",{className:E.a.marquee},r.a.createElement("pre",null,e),r.a.createElement("pre",null,e),r.a.createElement("pre",null,e))},t}(r.a.Component);t.default=function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement(o.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"LDI"),r.a.createElement("meta",{"http-equiv":"Content-Language",content:"es"})),r.a.createElement("header",{className:"header"},r.a.createElement("div",{className:"headerTitle"},r.a.createElement("h1",null,"Laboratorio del Departamento de Informática")),r.a.createElement("div",{className:"datetime"},r.a.createElement(l,null))),r.a.createElement("main",{className:"main"},r.a.createElement(f,null)),r.a.createElement("aside",{className:"aside"},r.a.createElement(g,null)),r.a.createElement("footer",{className:"footer"},r.a.createElement(S,null)))}},147:function(e){e.exports={Rpi2APIAddress:"163.117.170.102",Rpi2APIPort:3e3,Rpi3APIAddress:"163.117.170.103",Rpi3APIPort:3e3,Rpi2APIAuthorizedToken:"Bearer top_secret_string",HueBridgeAddress:"192.168.1.123",HueBridgeToken:"top_secret_string",AlarmSoundPath:"/path/to/file/mp3"}}}]);
//# sourceMappingURL=component---src-pages-index-js-995b406d134708f5d5a3.js.map