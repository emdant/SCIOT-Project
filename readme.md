# Overview
AMQP client:
- sends a fiscal code to the /iot/scanners queue , along with some information about the location of the (emulated) device, for example:
  ```
    {
      "fiscalcode": "RSSMRA80A01F205X",
      "building": "F3",
      "room": "P6",
      "datetime": "2021-09-06T14:46:29.874Z"
    }
  ```

Serverless Platform:
- AMQP triggered function that will read data from the /iot/scanners queue and add the information inside a database
- HTTP triggered function that will return a list of locations a person visited (via his fiscal code)

HTTP Client:
- makes requests about a specific person