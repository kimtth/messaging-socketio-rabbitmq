var amqp = require('amqplib/callback_api');

function emitAMQP(exchange, msg) {
  //amqp://user:pass@sub.example.com:8080
  amqp.connect('amqp://guest:guest@localhost:5672', function (error0, connection) {
    if (error0) {
      console.log(error0);
      return;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error0);
        return;
      }

      console.log(" [x] Sent %s", msg? msg: `Hello! ${msg} is missing`);

      channel.assertExchange(exchange, 'fanout', {
        durable: true
      });
      channel.publish(exchange, '', Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  });
}

module.exports = {
  emitAMQP
}