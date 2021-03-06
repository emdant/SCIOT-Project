# SimpleTracing
SimpleTracing is a project built for the __Serverless Computing for IOT__ course. It is a simple infrastructure to trace people using IoT sensors, in an environment composed by rooms that are placed into buildings. 
## Components
### MQTT client
Located in the `simulation/` folder, this is the simulated IoT sensor using the MQTT protocol to send people information to the `iot/scanners/person` topic.
In a real environment, the IoT device should store infomation about the building and room identifier and send these along with the people identifier (SSN for example)
and of course the scansion's timestamp.
Data is sent in JSON format, and looks like this: 
  ```
    {
      "fiscalcode": "RSSMRA80A01F205X",
      "building": "F3",
      "room": "P6",
      "datetime": "2021-09-06T14:46:29.874Z"
    }
  ```
### Nuclio
The Nuclio platform is used as a serverless provider, and it will run two functions, located in the `nuclio/` folder.
- `scan-person`, an MQTT triggered function subscribed to the `iot/scanners/person` topic, that will receive people data and store it into a noSQL database. The connection to the database is instantiated when the function context is initialized.
- `get-person`, an HTTP triggered function that will return a list of locations a person visited in a specific day. The connection to the dadabase is manged as before.
The folder contains the `.yaml` file that needs to be deployed on the Nuclio platform as well as the functions' code for an easier consultation.

### Front-end
This is a simple front-end written in __Svelte__ (not a front-end person, so forgive my horrors) made to consult the data in the database using the `get-person` function. There is not any type of authentication and all you need is the fiscal code and a date to gather some person's location. The folder for this component is the `front/` one.

## Running it all
_Note: you need Docker and docker-compose also, because of some nuclio limitations, the default gateway of the docker bridge network must be 172.17.0.1._

Running the project is actually not that hard, in fact, docker-compose helps to make deployment easier,
you just have to run `docker-compose up -d` and all components will be executed on docker, with the simulation container sending data to the queue.
You can look at the logs to check which fiscal codes have been added to the database. Then, you can open `localhost:5000` to get the location for each of those people.

## Notes
The project configuration of course is not production-ready, there are many exposed secrets and the connection between components needs some improvement (use SSL/TLS for example). But I thought this was enough to prove that an infrastructure like this may prove useful in a real-world scenario.