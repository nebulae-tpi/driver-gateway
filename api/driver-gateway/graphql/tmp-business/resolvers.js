const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const request = require('request');
const broker = require("../../broker/BrokerFactory")();


const BUSINESS_UNIT_LIST = [
  {
    _id: '75cafa6d-0f27-44be-aa27-c2c82807742d',
    name: 'TxPluz Cali',
    whatsapp: 573014879363,
    phone: 3014879363,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '6.164863, -75.601650'
  },
  {
    _id: 'b19c067e-57b4-468f-b970-d0101a31cacb',
    name: 'Zona Cafetera',
    whatsapp: 573042979304,
    phone: 3042979304,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '5.067, -75.511688'
  },
  {
    _id: '2af56175-227e-40e7-97ab-84e8fa9e12ce',
    name: 'Free Driver', 
    whatsapp: 573042877747,
    phone: 3042877747,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '6.164863, -75.601650'
  },
  {
    _id: '7d95f8ef-4c54-466a-8af9-6dd197dd920a',
    name: 'TxPlus Bogota',
    whatsapp: 573112328086,
    phone: 3112328086,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '4.666024, -74.111783'
  },
  {
    _id: 'ec600f7f-1b57-4c47-af77-c6750a8649bd',
    name: 'Villavicencio',
    whatsapp: 573114485469,
    phone: 3114485469,
    zello: 'zello://nyc?add_channel',
    defaultLocation: '4.133937, -73.636462'
  },
]   

module.exports = {

  Query: {
    BusinessContactInfo: (root, args, context, info) => {
      const business = BUSINESS_UNIT_LIST.find(bu => bu._id === context.authToken.businessId);
        return broker.forwardAndGetReply$("Business", "drivergateway.graphql.query.BusinessAttributes", { root, args: {id: context.authToken.businessId}, jwt: context.encodedToken }, 2000).pipe(
          map(response => {
            console.log('Business found ===> ', JSON.stringify(response)); 
            return { ...business, attributes: (response.data || {}).attributes }
          })
        ).toPromise();
    },
  },
}




