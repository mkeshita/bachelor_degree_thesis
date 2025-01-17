import React from "react"
import styles from "./main.module.css"
import userIcon from "./img/user.png";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: -1
    }
    this.reservations = []
    this.occupation = []
    this.classrooms = []
    this.currentHour = 0
    this.currentMinutes = 0
    this.classroomToShow = 0
    this.lastShow = 0
    this.failedAttepmsReservations = 0
    this.failedAttepmsClassrooms = 0
    this.failedAttepmsOccupation = 0
    try { // Load config
      this.config = require("/etc/rpi3_conf.json")
    } catch {
      this.config = require("../../../../../config.json")
    }
  }

  /********** RPI3 API FUNCTIONS **********/

  /**
   * Makes HTTP GET request to rpi3 API to get JSON including today reservations
   */
  getReservations = () => {
    fetch("http://" + this.config.Rpi3APIAddress + ":" + this.config.Rpi3APIPort + "/reservations")
      .then(response => response.json())
      .then(json => {
        this.failedAttepmsReservations = 0
        this.reservations = json
      })
      .catch(error =>{
        if (this.failedAttepmsReservations <= 0) {
          this.failedAttepmsReservations++
        }
        console.log("main:js request HTTP GET to rpi3 API /reservations failed:", error)
      })
  }

  /**
   * Makes HTTP GET request to rpi3 API to get JSON including classrooms status
   */
  getClassrooms = () => {
    fetch("http://" + this.config.Rpi3APIAddress + ":" + this.config.Rpi3APIPort + "/classrooms")
      .then(response => response.json())
      .then(json => {
        this.failedAttepmsClassrooms = 0
        this.classrooms = json
      })
      .catch(error => {
        if (this.failedAttepmsClassrooms <= 0) {
          this.failedAttepmsClassrooms++
        }
        console.log("main.js: request HTTP GET to rpi3 API /classrooms failed:", error)
      })
  }

  /**
   * Makes HTTP GET request to rpi3 API to get JSON including occupation statistics
   */
  getOccupation = () => {
    fetch("http://" + this.config.Rpi3APIAddress + ":" + this.config.Rpi3APIPort + "/occupation")
      .then(response => response.json())
      .then(json => {
        this.failedAttepmsOccupation = 0
        this.occupation = json
      })
      .catch(error => {
        if (this.failedAttepmsOccupation <= 0) {
          this.failedAttepmsOccupation++
        }
        console.log("main.js: request HTTP GET to rpi3 API /occupation failed:", error)
      })
  }

  /********** AUXILIARY FUNCTIONS **********/

  /**
   * Returns a loading bubbles svg
   */
  loading = (size, color) => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill={color}>
      <circle cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
      <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
      </circle>
    </svg>
  }

  /**
   * Updates the current time, used to display only future reservations
   */
  updateCurrentTime = () => {
    let date = new Date();
    this.currentHour = date.getHours();
    this.currentMinutes = date.getMinutes();
  }

  /**
   * Returns the html <div> object of a reservation needed by <article>
   * @param {object} r info of a reservation
   * @param {int}    i index to use to calculate react key of the div
   */
  getCardDiv = (r, i) => {
    if (this.state.globalState === 1 && i <= this.lastShow && this.reservations.length > 4 && this.lastShow !== this.reservations.length - 1) {
      // if rotating, show next reservations (i >= 4)
      return null
    }
    if (this.currentHour < r["EndHour"] || (this.currentHour === r["EndHour"] && this.currentMinutes < r["EndMinute"])) {
      if (this.currentHour > r["StartHour"] || (this.currentHour === r["StartHour"] && this.currentMinutes >= r["StartMinute"])) {
        // Currently occupied
        return <div key={256+i} className={[styles.card, styles.cardOccupied].join(" ")}>
          <div className={styles.subject}>{r["Subject"]}</div>
          <div className={styles.study}>{r["Study"]}</div>
          <div className={styles.classroom}>{r["Classroom"]} de {r["StartHour"] + ":" + 
            (r["StartMinute"] === 0 ? "00" : r["StartMinute"])} a {r["EndHour"] + ":" + 
            (r["EndMinute"] === 0 ? "00" : r["EndMinute"])}</div>
        </div>;
      }
      if ((r["StartHour"] === this.currentHour && r["StartMinute"] <= 30 + this.currentMinutes) ||
        (r["StartHour"] === this.currentHour + 1 && 60 - this.currentMinutes + r["StartMinute"] <= 30)) {
        if (60 - this.currentMinutes + r["StartMinute"] <= 10) {
          // Will be occupied in 10 min
          return <div key={256+i} className={[styles.card, styles.cardFutureOccupied].join(" ")}>
            <div className={styles.subject}>{r["Subject"]}</div>
            <div className={styles.study}>{r["Study"]}</div>
            <div className={styles.classroom}>{r["Classroom"]} de {r["StartHour"] + ":" + 
              (r["StartMinute"] === 0 ? "00" : r["StartMinute"])} a {r["EndHour"] + ":" + 
              (r["EndMinute"] === 0 ? "00" : r["EndMinute"])}</div>
          </div>;
        }
        // Will be occupied in 30 min
        return <div key={256+i} className={[styles.card, styles.cardReserved].join(" ")}>
          <div className={styles.subject}>{r["Subject"]}</div>
          <div className={styles.study}>{r["Study"]}</div>
          <div className={styles.classroom}>{r["Classroom"]} de {r["StartHour"] + ":" + 
            (r["StartMinute"] === 0 ? "00" : r["StartMinute"])} a {r["EndHour"] + ":" + 
            (r["EndMinute"] === 0 ? "00" : r["EndMinute"])}</div>
        </div>;
      }
      return <div key={256+i} className={styles.card}>
        <div className={styles.subject}>{r["Subject"]}</div>
        <div className={styles.study}>{r["Study"]}</div>
        <div className={styles.classroom}>{r["Classroom"]} de {r["StartHour"] + ":" + 
          (r["StartMinute"] === 0 ? "00" : r["StartMinute"])} a {r["EndHour"] + ":" + 
          (r["EndMinute"] === 0 ? "00" : r["EndMinute"])}</div>
      </div>;
    }
    return null
  }

  /**
   * Returns the html <div> object of a computer needed by <article>
   * @param {object} c info of a computer
   * @param {int}    i index to use to calculate react key of the div
   * @param {string} classroom classroom name
   */
  getComputerDiv = (c, i, classroom) => {
    const f = [5, 8, 11, 14, 17, 20, 2, 4, 7, 10, 13, 16, 19, 1, 3, 6, 9, 12, 15, 18]
    let ip = 0
    switch (classroom) {
      case "F16":
        ip = 100
        break;
      case "F18":
        ip = 200
        break;
      case "C05":
        ip = 51 + i
        break;
      case "C06":
        ip = 151 + i
        break;
    }
    if (classroom.includes("F")) {
      switch (c) {
        case 0:
          return <div key={ip+f[i]} className={[styles.shutdown, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        case 1:
          return <div key={ip+f[i]} className={[styles.linux, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        case 2:
          return <div key={ip+f[i]} className={[styles.windows, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        case 3:
          return <div key={ip+f[i]} className={[styles.linuxUser, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        case 4:
          return <div key={ip+f[i]} className={[styles.windowsUser, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        case 5:
          return <div key={ip+f[i]} className={[styles.timeout, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        case 6:
          return <div key={ip+f[i]} className={[styles.pxe, styles.classroomF].join(" ")}>{"F" + (ip + f[i]).toString()}</div>
        default:
          return <div key={ip+f[i]}></div>
      }
    } else {
      switch (c) {
        case 0:
          return <div key={ip} className={styles.shutdown}>{"C" + ip.toString()}</div>
        case 1:
          return <div key={ip} className={styles.linux}>{"C" + ip.toString()}</div>
        case 2:
          return <div key={ip} className={styles.windows}>{"C" + ip.toString()}</div>
        case 3:
          return <div key={ip} className={styles.linuxUser}>{"C" + ip.toString()}</div>
        case 4:
          return <div key={ip} className={styles.windowsUser}>{"C" + ip.toString()}</div>
        case 5:
          return <div key={ip} className={styles.timeout}>{"C" + ip.toString()}</div>
        case 6:
          return <div key={ip} className={styles.pxe}>{"C" + ip.toString()}</div>
        default:
          return <div key={ip}></div>
      }
    }
  }

    /**
   * Returns the html <div> object of a classroom needed by <aside>
   * @param {int}    i index to use to calculate react key of the div
   * @param {string} c classroom
   */
  getClassroomDiv = (i, c) => {
    let arrow = false
    if (this.state.globalState-2 === i && this.state.globalState > 1) {
      arrow = true
    }
    let classroom = ""
    switch (i) {
      case 0:
        classroom = "F16"
        break;
      case 1:
        classroom = "F18"
        break;
      case 2:
        classroom = "C05"
        break;
      case 3:
        classroom = "C06"
        break;
    }
    let logins = this.loading(56, "black")
    // Check if errors getting occupation
    if ("error" in this.occupation || this.failedAttepmsOccupation > 0) {
      logins = -1
    } // Else update occupation on aside
    else if (this.occupation !== undefined && this.occupation.length !== 0 && this.occupation[classroom] !== undefined) {
      logins = this.occupation[classroom].LoginsLinux + this.occupation[classroom].LoginsWindows
    }
    switch (this.classrooms[c]) {
      case 0: // Free classroom
        return <span key={c} className={styles.asideClassrom}>
            <div key={i+400} className={(arrow)?
              [styles.free, styles.arrow, styles.indicators, styles.selected].join(" "):
              (this.state.globalState >= 2)?
              [styles.free, styles.indicators, styles.unselected].join(" "):
              [styles.free, styles.indicators].join(" ")}>
                <img className={styles.userIcon} src={userIcon}></img>{logins}
            </div>
            <div key={i} className={(arrow)? [styles.free, styles.selected].join(" ") : (this.state.globalState < 2)? styles.free : [styles.free, styles.unselected].join(" ")}>{c}</div>
          </span>
      case 1: // Currently occupied
        return <span key={c} className={styles.asideClassrom}>
            <div key={i+400} className={(arrow)?
              [styles.occupied, styles.arrow, styles.indicators, styles.selected].join(" "):
              (this.state.globalState >= 2)?
              [styles.occupied, styles.indicators, styles.unselected].join(" "):
              [styles.occupied, styles.indicators].join(" ")}>
                <img className={styles.userIcon} src={userIcon}></img>{logins}
              </div>
              <div key={i} className={(arrow)? [styles.occupied, styles.selected].join(" ") : (this.state.globalState < 2)? styles.occupied : [styles.occupied, styles.unselected].join(" ")}>{c}</div>
          </span>
      case 2: // Will be occupied in 30 min
        return <span key={c} className={styles.asideClassrom}>
            <div key={i+400} className={(arrow)?
              [styles.reserved, styles.arrow, styles.indicators, styles.selected].join(" "):
              (this.state.globalState >= 2)?
              [styles.reserved, styles.indicators, styles.unselected].join(" "):
              [styles.reserved, styles.indicators].join(" ")}>
                <img className={styles.userIcon} src={userIcon}></img>{logins}
              </div>
              <div key={i} className={(arrow)? [styles.reserved, styles.selected].join(" ") : (this.state.globalState < 2)? styles.reserved : [styles.reserved, styles.unselected].join(" ")}>{c}</div>
          </span>
      case 3: // Will be occupied in 10 min
        return <span key={c} className={styles.asideClassrom}>
            <div key={i+400} className={(arrow)?
              [styles.futureOccupied, styles.arrow, styles.indicators, styles.selected].join(" "):
              (this.state.globalState >= 2)?
              [styles.futureOccupied, styles.indicators, styles.unselected].join(" "):
              [styles.futureOccupied, styles.indicators].join(" ")}>
                <img className={styles.userIcon} src={userIcon}></img>{logins}
              </div>
              <div key={i} className={(arrow)? [styles.futureOccupied, styles.selected].join(" ") : (this.state.globalState < 2)? styles.futureOccupied : [styles.futureOccupied, styles.unselected].join(" ")}>{c}</div>
          </span>
    }
  }

  /**
   * Returns an array of html <div>, where every <div> is a reservation card
   */
  getCardsArray = () => {
    this.updateCurrentTime()
    // Check if errors getting reservations
    if ("error" in this.reservations || this.failedAttepmsReservations > 0) {
      return <div key="getCardsArrayError" className={styles.errorCard}>No se ha podido recuperar las reservas para hoy desde la web</div>
    }
    let cards = [];
    // Get reservations to show
    for (const [i, r] of this.reservations.entries()) {
      let card = this.getCardDiv(r, i)
      if (card != null) {
        cards.push(card)
      }
      if (cards.length === 4) {
        this.lastShow = i
        break;
      }
    }
    // Return cards if any
    if (cards.length !== 0) {
      return cards
    }
    if (this.state.globalState >= 0) {
      return <div key="end" className={styles.endCard}>No hay reservas para el día de hoy o ya han finalizado todas las reservas</div>
    }
    return <div key="end" className={styles.endCard}>{this.loading(96, "white")}<br/>Solicitando los recursos a las API's<br/>Por favor, espere</div>
  }

  /**
   * Returns an array of html <div>, where every <div> is a computers of the same classroom
   */
  getComputersArray = () => {
    // Check if errors getting occupation
    if ("error" in this.occupation || this.failedAttepmsOccupation > 0) {
      return <div key="getComputersArrayError" className={styles.errorCard}>No se ha podido recuperar los datos de ocupación desde instalador</div>
    }
    let classroom = ["F16", "F18", "C05", "C06"]
    let classroomMap = []
    // Get computer status of the classroom
    if (this.classroomToShow < 2) {
      // 4.0.F classrooms
      classroomMap.push(<div key={1000} className={styles.classroomF}></div>)
      const f = [5, 8, 11, 14, 17, 20, 2, 4, 7, 10, 13, 16, 19, 1, 3, 6, 9, 12, 15, 18]
      for (const [i, r] of f.entries()) {
        classroomMap.push(this.getComputerDiv(this.occupation[classroom[this.classroomToShow]].Computers[r-1], i, classroom[this.classroomToShow]))
        if (i == 5 || (i > 5 && (i - 5) % 7 === 0)) classroomMap.push(<br key={1000+i}/>)
      }
    } else {
      // 2.2.C classrooms
      for (const [i, r] of this.occupation[classroom[this.classroomToShow]].Computers.entries()) {
        classroomMap.push(this.getComputerDiv(r, i, classroom[this.classroomToShow]))
        if (i === 0) classroomMap.push(<br key={1000+i}/>)
      }
    }
    // Change between classrooms and update global state
    this.classroomToShow = (this.classroomToShow + 1) % 4

    return <div className={styles.classroom}>{classroomMap}</div>
  }

  /********** RENDER FUNCTIONS **********/

  /**
   * main rotative (left article) component. Returns element to show on <article> tab.
   */
  mainRotative = () => {
    if (this.state.globalState < 2) {
      return <article key="mainRotative" className={styles.article}>{this.getCardsArray()}</article>
    } else if (this.occupation.length !== 0) {
      return <article key="mainRotative" className={styles.article}>{this.getComputersArray()}</article>
    } else {
      return <article key="mainRotative" className={styles.article}>{this.getCardsArray()}</article>
    }
  }

  /**
   * Aside (right) component. Returns element to show on <aside> tab.
   */
  aside = () => {
    // Check if errors getting reservations
    if ("error" in this.reservations || this.failedAttepmsReservations > 0) {
      return <aside key="aside" className={styles.aside}>
        <div key="asideError" className={styles.asideError}>No se ha podido recuperar las reservas para hoy desde la web</div>
      </aside>
    }
    let divs = []
    let i = 0
    for (let c in this.classrooms) {
      divs.push(this.getClassroomDiv(i, c))
      i++
    }
    return <aside key="aside" className={styles.aside}>{divs}</aside>
  }

  /********** REACT FUNCTIONS **********/

  render() {
    return (
      <main key="main">{[this.mainRotative(), this.aside()]}</main>
    );
  }

  componentDidMount() {
    this.getReservations()
    this.getClassrooms()
    this.getOccupation()
    this.timer1 = setInterval(() => {
      this.setState(state => ({
        globalState: (state.globalState + 1) % 6}))
    }, 10000);
    this.timer2 = setInterval(() => {
      this.getReservations()
      this.getClassrooms()
      this.getOccupation()
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }
}

export default Main;