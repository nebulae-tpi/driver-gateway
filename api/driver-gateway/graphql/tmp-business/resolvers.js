const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');
const broker = require("../../broker/BrokerFactory")();


const BUSINESS_UNIT_LIST = [
  {
    _id: '75cafa6d-0f27-44be-aa27-c2c82807742d',
    name: 'TxPluz Cali',
    whatsapp: 573013392291,
    phone: 3013392291,
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
      const business = BUSINESS_UNIT_LIST.find(bu => bu._id === context.authToken.businessId);
      if (context.authToken.businessId === "bf2807e4-e97f-43eb-b15d-09c2aff8b2ab") {
        return broker.forwardAndGetReply$("Business", "drivergateway.graphql.query.BusinessAttributes", { root, args, jwt: context.encodedToken }, 2000).pipe(
          map(response => {
            console.log('Business found => ', response.data); 
            return { ...business, attributes: (response.data || {}).attributes }
          })
        ).toPromise();
      }else {
        return of(business).toPromise();
      }
    },
  },
}




