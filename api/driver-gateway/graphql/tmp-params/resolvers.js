const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');




module.exports = {

  Query: {

    MqttParams: (root, args, context, info) => {
      const mqttParamsCount = process.env.DRIVER_APP_MQTT_DRIVER_URL.split(';').length;
      let i;
      let params = [];
      for (i = 0; i < mqttParamsCount; i++) {
        params.push(
          {
            url: process.env.DRIVER_APP_MQTT_DRIVER_URL.split(';')[i],
            port: parseInt(process.env.DRIVER_APP_MQTT_DRIVER_PORT.split(';')[i]),
            clientId: context.authToken.preferred_username,
            user: process.env.DRIVER_APP_MQTT_DRIVER_USER.split(';')[i],
            password: process.env.DRIVER_APP_MQTT_DRIVER_PASSWORD.split(';')[i],
            order: i
          },
        );
      }
      return of(params).toPromise()
    },


    GoogleMapsParams: (root, args, context, info) => {
      return of({
        googleMapsAndroidKey: process.env.GOOGLE_MAPS_ANDROID_KEY,
        googleMapsBrowserKey: process.env.GOOGLE_MAPS_BROWSER_KEY
      }).toPromise()
    },
  },
}




