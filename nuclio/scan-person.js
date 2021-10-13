const { MongoClient } = require("mongodb");
const uri = 'mongodb://root:example@192.168.0.1:27017/'
let repeats = 1;

exports.handler = function(context, event) {
    try {
        const dataString = event.body.toString();
        const personData = JSON.parse(dataString);

        const inputDate = new Date(personData.datetime);
        personData.datetime = inputDate;
        personData.fiscalcode = personData.fiscalcode.toUpperCase();

        const client = context.dbClient;
        if (client) {
            const database = client.db('tracing');
            const people = database.collection('people');

            people.insertOne(personData, {}, (result) => {
                context.logger.info(`Added entry for ${personData.fiscalcode}`);
                context.callback('Added data ' + dataString);
            });
        } else {
            context.logger.info('Cannot write to db: unable to connect');
            context.callback(new context.Response(`Server error`, null, 'text/plain', 500, 'text'));
        }

    } catch (err) {
        context.logger.error(err);
        context.callback(new context.Response(`Malformed input: ${err.message}`, null, 'text/plain', 400, 'text'));
    }
    
};

exports.initContext = tryConnection;

function tryConnection(context) {
    const client = new MongoClient(uri);
    client.connect((err, client) => {
        if (err) {
            setTimeout((context) => tryConnection(context), 2000 * repeats);
            repeats *= 2;
        }
        else
            context.dbClient = client;
    });
}