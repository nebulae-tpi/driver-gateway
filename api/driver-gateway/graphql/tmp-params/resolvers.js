const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');

module.exports = {

  Query: {
    MqttParams: (root, args, context, info) => {
      return of(
        {
          url: process.env.DRIVER_APP_MQTT_DRIVER_URL,
          port: parseInt(process.env.DRIVER_APP_MQTT_DRIVER_PORT),
          clientId: context.authToken.preferred_username,
          user: process.env.DRIVER_APP_MQTT_DRIVER_USER,
          password: process.env.DRIVER_APP_MQTT_DRIVER_PASSWORD,
        }
      )
        .toPromise()
    },
  },
}




