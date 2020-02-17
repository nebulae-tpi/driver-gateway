const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');


const BUSINESS_UNIT_LIST = [
  {
    _id: '75cafa6d-0f27-44be-aa27-c2c82807742d',
    name: 'TxPluz Cali',
    whatsapp: 573004832728,
    phone: 3004832728,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '6.164863, -75.601650'
  },
  {
    _id: 'b19c067e-57b4-468f-b970-d0101a31cacb',
    name: 'TxPlus Manizales',
    whatsapp: 573003546569,
    phone: 3003546569,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '5.067, -75.511688'
  }
]

module.exports = {

  Query: {
    BusinessContactInfo: (root, args, context, info) => {
      const business = BUSINESS_UNIT_LIST.find(bu => bu._id === context.authToken.businessId );
      // console.log('Business found => ', business);
      return of(business).toPromise();
    },
  },
}




