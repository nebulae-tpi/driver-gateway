const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');

module.exports = {

  Query: {
    BusinessContactInfo: (root, args, context, info) => {
      return of(
        {
          whatsapp: 573015033132,
          phone: 3015033132,
          zello: 'zello://nyc?add_channel'
        }
      )
      .toPromise()
    },
  },
}




