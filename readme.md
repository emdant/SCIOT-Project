# Overview
MQTT client:
- sends a fiscal code to the `iot/scanners/person` topic, along with some information about the location of the (emulated) device, for example:
  ```
    {
      "fiscalcode": "RSSMRA80A01F205X",
      "building": "F3",
      "room": "P6",
      "datetime": "2021-09-06T14:46:29.874Z"
    }
  ```


Serverless Platform:
- MQTT triggered function subscribed to the `iot/scanners/person` topic, will receive people data and store it into a database
- HTTP triggered function that will return a list of locations a person visited (via his fiscal code) in a specific day
  ```
  {
    "fiscalcode": "RSSMRA80A01F205X",
    "datetime": "2021-09-06T14:46:29.874Z" // time does not matter
  }
  ```

Telegram Bot:
- richiedere le informazioni di posizione di una persona in una specifica data
- richiedere le persone che hanno visitato un'aula in una specifica data