# Data center monitoring
This repository contains the implementation of my Bachelor's Degree Thesis, a system to monitor the status of the service of the laboratory of the Computer Engineering Department at my university (Universidad Carlos III de Madrid), with the aim to simplify the daily work in there.

The origin of this system responds to **a need I identified when I started to work at** the Computer Science Department at my university. I saw some tasks and things that could be improved, then **I got and idea and I shared it** with my superiors. They liked it so much that they encourage me to make it a reality

My thesis report is written in Spanish under the title "Sistema de monitorización y alertas de estado para el laboratorio del Departamento de Informática". However, it contains a ten pages summary in English. My thesis and the summary can be found at [my university digital archive](https://e-archivo.uc3m.es/handle/10016/29695).

**This work has obtained a grade of 10 with a distinction of Honor**, which makes me highly proud of it.

## What does the system do?
The laboratory of the Computer Engineering Department is in charge of maintain a data center with some servers and some computer classrooms. This system was defined to accomplish the following list of goals:

* **To monitor the data center** and server status: temperature, humidity, room light (switched on/off) and power supply.
* **To monitor the classrooms status** and the status of their computers: classroom reservations, classroom occupation, computer occupation, and computer status.
* To present all the system information in a way that should be **understandable and comprehensible at a glance.**
* **To alert the laboratory staff** of every unusual or strange situation and failures on the data center or the classrooms as soon as possible.

## System architecture
The system architecture is composed of the following elements:

* Three Raspberry Pi 3 model B+ computers.
* A SenseHat Raspberry Pi sensors module.
* A camera Raspberry Pi module.
* Two computer monitors.
* A Wi-Fi Philips &reg; Hue &trade; White and Color Ambiance light bulb.

![System architecture diagram](images/system_arch.png)
<p align="center">
Figure 1: system architecture diagram.
</p>

The first raspberry (rpi1) is inside the data center and it's monitoring the room with the SenseHat and camera modules. It sends the information it gets to the inheritance infrastructure (an old Zabbix instance) and to the second raspberry (rpi2, which is in the laboratory office).

Rpi2 gets the data center monitoring data from rpi1 from an authenticated HTTP POST request to an API REST that is running on it (called rpi2_api). Rpi2 is connected to one monitor and the Wi-Fi light bulb. The monitor shows a Grafana instance that gets the data from Zabbix and prints the data center status in a kiosk mode. Rpi2_api controls the alerts and alarms the laboratory staff if there is something that they should attend to. When an alarm is fired, a siren sound plays on the monitor speakers and the Wi-Fi light bulb blinks on red.

Rpi3 has a custom light server written in Go, another API REST (called rpi3_api), and a web dashboard made with GatsbyJS (a framework for React). The web dashboard is shown on the monitor and it prints the classroom reservations for today, the classrooms occupation and the computers' status. All this information is retrieved from its own API REST, which abstracts and centralizes the inheritance infrastructure. The API gets the classroom reservations with a web crawler from the laboratory website (it was a requirement to not connect to the database for that), and the computers status and occupation from a remote command execution via SSH.

## System impact
With this project **I got graduated with honors**, and it supposed a huge improvement to the daily work at the of the laboratory of the Computer Engineering Department. The system is nowadays in productions and it helps the laboratory staff on the most routinely task, saving time for the most important ones. Also, it has allowed to discover some strange situations that were unknown before the system implementation, such that the university heating system is interfering with the cooling system at the Department data center, even when it is supposed to be isolated. This problem was investigated and fixed after the system implementation.

I have had the possibility to see the before and after, and also to keep the system growing and improving to supply the laboratory crew needs and to enhance their work. Furthermore, after its implementation, it is easier to prevent hardware/software failures and to schedule maintenance tasks, which has meant a better quality of the services provided to researchers, teachers and students.

For all the explained above, I'm very proud of this project. A project that from its inception to its implantation was entirely my work.


## Repository architecture
This repository has the following architecture:
```
./
├─ images/
├─ install/
├─ rpi1/
|   └─ scripts/
├─ rpi2/
|   └─ API_REST/
├─ rpi3/
|   ├─ API_REST/
|   └─ GUI/
├─ config.json
└─ install.sh
```
Inside each folder and sub-folder, there is a README.md file that explains the contents of each and the files inside. There is a summary of what we can find in each folder:

* `images/` contais the images showed on this markdown document.
* `install/` contains the systemd daemons, scripts and other utilities used by the installation script `install.sh` to deploy the system.
* `rpi1/` contains the python3 scripts implemented to monitor the data center.
* `rpi2/`contains an API REST written in Go. This API controls the metrics from the data center and fires alarms when the temperature rises or the servers lose power supply.
* `rpi3/` contains another API REST written in Go and a web dashboard written in JavaScript (ReactJS + GatsbyJS). The API asks the inheritance infrastructure for the classrooms and computers status, and the web dashboard retrieves that information from the API and shows it.
* `config.json` contains the configuration values needed for the system with a JSON syntax.
* `install.sh` is a bash installation script. It should be launched on the raspberry that is intended to install. Before that, a non-privileged user must be created, who will run the system. That user can be changed in the script and it's `lab` by default.

## Some images of the system

![Grafana dashboard image](images/grafana.png)
<p align="center">Grafana dashboard</p><br/>

![Rpi3 dashboard reservations view image](images/rpi3_gui_reservations.png)
<p align="center">Rpi3 dashboard. Reservations view.</p><br/>

![Rpi3 dashboard classrooms view image](images/rpi3_gui_classrooms.png)
<p align="center">Rpi3 dashboard. Classroom view.</p><br/>

![Rpi1 image](images/rpi1.jpg)
<p align="center">Rpi1 inside the data center.</p><br/>

![Rpi2 monitor image](images/rpi2.jpg)
<p align="center">Rpi2 monitor on the office.</p><br/>

![Rpi3 monitor image](images/rpi3.jpg)
<p align="center">Rpi3 monitor on the office.</p>
