import React from "react"
import styles from "./main.module.css"
import { string } from "prop-types";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalState: -1
    }
    this.reservations = []
    this.occupation = []
    this.classrooms = []
    this.reservationsNum = 0
    this.currentHour = 0
    this.currentMinutes = 0
    this.classroomToShow = 0
    this.lastShow = 0
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
      .then(json => this.reservations = json)
      .catch(error => console.log('Request HTTP GET /reservations failed', error))
  }

  /**
   * Makes HTTP GET request to rpi3 API to get JSON including classrooms status
   */
  getClassrooms = () => {
    fetch("http://" + this.config.Rpi3APIAddress + ":" + this.config.Rpi3APIPort + "/classrooms")
      .then(response => response.json())
      .then(json => this.classrooms = json)
      .catch(error => console.log('Request HTTP GET /classrooms failed', error))
  }

  /**
   * Makes HTTP GET request to rpi3 API to get JSON including occupation statistics
   */
  getOccupation = () => {
    fetch("http://" + this.config.Rpi3APIAddress + ":" + this.config.Rpi3APIPort + "/occupation")
      .then(response => response.json())
      .then(json => this.occupation = json)
      .catch(error => console.log('Request HTTP GET /occupation failed', error))
  }

  /********** AUXILIARY FUNCTIONS **********/

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
    if (this.state.globalState === 1 && i <= this.lastShow && this.reservationsNum > 4) {
      // if rotating, show next reservations (i >= 4)
      return null
    }
    if (this.currentHour < r["EndHour"] || (this.currentHour === r["EndHour"] && this.currentMinutes < r["EndMinute"])) {
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
    let ip = i
    switch (classroom) {
      case "F16":
        ip += 101
        break;
      case "F18":
        ip += 201
        break;
      case "C05":
        ip += 51
        break;
      case "C06":
        ip += 151
        break;
    }
    switch (c) {
      case 0:
        return <div key={ip} className={styles.shutdown}>{(classroom.includes("F"))? "F" + ip.toString() : "C" + ip.toString()}</div>
      case 1:
        return <div key={ip} className={styles.linux}>{(classroom.includes("F"))? "F" + ip.toString() : "C" + ip.toString()}</div>
      case 2:
        return <div key={ip} className={styles.windows}>{(classroom.includes("F"))? "F" + ip.toString() : "C" + ip.toString()}</div>
      case 3:
        return <div key={ip} className={styles.linuxUser}>{(classroom.includes("F"))? "F" + ip.toString() : "C" + ip.toString()}</div>
      case 4:
        return <div key={ip} className={styles.windowsUser}>{(classroom.includes("F"))? "F" + ip.toString() : "C" + ip.toString()}</div>
      case 5:
        return <div key={ip} className={styles.timeout}>{(classroom.includes("F"))? "F" + ip.toString() : "C" + ip.toString()}</div>
      default:
        return <div key={ip}></div>
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
    switch (this.classrooms[c]) {
      case 0:
        return <div key={i} className={(arrow)? [styles.free, styles.arrow].join(" "): styles.free}>{c}</div>
      case 1:
        return <div key={i} className={(arrow)? [styles.occupied, styles.arrow].join(" "): styles.occupied}>{c}</div>
      case 2:
        return <div key={i} className={(arrow)? [styles.reserved, styles.arrow].join(" "): styles.reserved}>{c}</div>
      default:
        return <div key={i} className={(arrow)? [styles.futureOccupied, styles.arrow].join(" "): styles.futureOccupied}>{c}</div>
    }
  }

  /**
   * Returns an array of html <div>, where every <div> is a reservation card
   */
  getCardsArray = () => {
    this.updateCurrentTime()
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
      this.reservationsNum = this.reservations.length
      return cards
    }
    return <div className={styles.endCard}>No hay reservas para el día de hoy o ya han finalizado todas las reservas</div>
  }

  /**
   * Returns an array of html <div>, where every <div> is a computers of the same classroom
   */
  getComputersArray = () => {
    let classroom = ["F16", "F18", "C05", "C06"]
    let classroomMap = []
    // Get computer status of the classroom
    for (const [i, r] of this.occupation[classroom[this.classroomToShow]].Computers.entries()) {
      classroomMap.push(this.getComputerDiv(r, i, classroom[this.classroomToShow]))
    }
    // Change between classrooms and update global state
    this.classroomToShow = (this.classroomToShow + 1) % 4

    return <div className={styles.classroom}>{classroomMap}</div>
  }

  /********** RENDER FUNCTIONS **********/

  /**
   * Article (left) component. Returns element to show on <article> tab.
   */
  article = () => {
    if (this.state.globalState < 2) {
      return <article className={styles.article}>{this.getCardsArray()}</article>
    } else if (this.occupation.length !== 0) {
      return <article className={styles.article}>{this.getComputersArray()}</article>
    } else {
      return <article className={styles.article}>{this.getCardsArray()}</article>
    }
  }

  /**
   * Aside (right) component. Returns element to show on <aside> tab.
   */
  aside = () => {
    let divs = []
    let i = 0
    for (let c in this.classrooms) {
      divs.push(this.getClassroomDiv(i, c))
      i++
    }
    return <aside className={styles.aside}>{divs}</aside>
  }

  /********** REACT FUNCTIONS **********/

  render() {
    return (
      <main>{this.article()}{this.aside()}</main>
    );
  }

  componentDidMount() {
    this.getReservations()
    this.getClassrooms()
    this.getOccupation()
    console.log(this.state.globalState)
    this.timer1 = setInterval(() => {
      this.setState({globalState: (this.state.globalState + 1) % 6})
      console.log(this.state.globalState)
    }, 10000);
    this.timer2 = setInterval(() => {
      this.getReservations()
      this.getClassrooms()
    }, 10000);
    this.timer3 = setInterval(() => {
      this.getOccupation()
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  }
}

export default Main;