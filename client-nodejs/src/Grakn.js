const Session = require('./Session');
const KeyspaceService = require('./service/Keyspace');
const messages = require("./service/Session/autogenerated/SessionMessages");


function Grakn(uri, credentials) {
    const keyspaceService = new KeyspaceService(uri, credentials);
    let sessionService;
    this.session = (keyspace) => {
        sessionService = new Session(uri, keyspace, credentials);
        return sessionService;
    }
    this.keyspace = {
        delete: (keyspace) => keyspaceService.delete(keyspace),
        retrieve: () => keyspaceService.retrieve()
    };
    this.close = () => { sessionService.close(); keyspaceService.close(); }
}

module.exports = Grakn

/**
 * List of available dataTypes for Grakn Attributes
 */
module.exports.dataType = {
    STRING: messages.AttributeType.DATA_TYPE.STRING,
    BOOLEAN: messages.AttributeType.DATA_TYPE.BOOLEAN,
    INTEGER: messages.AttributeType.DATA_TYPE.INTEGER,
    LONG: messages.AttributeType.DATA_TYPE.LONG,
    FLOAT: messages.AttributeType.DATA_TYPE.FLOAT,
    DOUBLE: messages.AttributeType.DATA_TYPE.DOUBLE,
    DATE: messages.AttributeType.DATA_TYPE.DATE
};

/**
 * List of available transaction types supported by Grakn
 */
module.exports.txType = {
    READ: messages.Transaction.Type.READ,
    WRITE: messages.Transaction.Type.WRITE,
    BATCH: messages.Transaction.Type.BATCH
};