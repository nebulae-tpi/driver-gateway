const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');

module.exports = {

  Query: {
    MqttParams: (root, args, context, info) => {
      return of(
        {
          url: "ws://35.222.170.20",
          port: 8083,
          clientId: context.authToken.preferred_username,
          user: "",
          password: "",
        }
      )
        .toPromise()
    },
  },
}




