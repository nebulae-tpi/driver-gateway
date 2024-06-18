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
    name: 'TxPlus Manizales',
    whatsapp: 573003546569,
    phone: 3003546569,
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
  }
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




