const { MongoClient } = require("mongodb");
const uri = 'mongodb://root:example@192.168.0.1:27017/'

exports.handler = function(context, event) {
    let dataString = event.body.toString();

    context.logger.info(dataString);

    if (dataString) {
        let personData = JSON.parse(dataString);

        const client = context.dbClient;
        if (client) {
            const database = client.db('tracing');
            const people = database.collection('people');

            const inputDate = new Date(personData.datetime);

            const cursor = people.find({
                fiscalcode: personData.fiscalcode.toUpperCase(),
                datetime: {
                    $gte: new Date(inputDate.setHours(0, 0, 0, 0,)),
                    $lt: new Date(inputDate.setHours(23, 59, 59))
                }
            }, {projection: {_id: 0}});

            cursor.toArray((error, array) => {
                context.callback(new context.Response({results: array}, null, 'application/json', 200, 'text'));
            });

        } else {
            context.logger.info('Cannot read from db: unable to connect');
            context.callback(new context.Response(`Server error`, null, 'text/plain', 500, 'text'));
        }

    } else {
        context.callback(new context.Response('Malformed request: expected POST', null, 'text/plain', 400, 'text'));
    }

};

exports.initContext = function(context) {
    const client = new MongoClient(uri);
    client.connect((err, client) => {
        if (err) 
            console.log(err);
        else
            context.dbClient = client;
    });   
};