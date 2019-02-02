const { of, Observable, bindNodeCallback } = require('rxjs');
const { map, tap, mapTo } = require('rxjs/operators');
const request = require('request');
const mqtt = require('mqtt');
const mqttClient = mqtt.connect("mqtt://35.222.170.20:1883");
const uuidv4 = require('uuid/v4');

const senderId = uuidv4();
const businessId = "2849f777-7ee0-4c0d-b280-9a95fb8277ef";

/**
     * Publish data throught a topic
     * Returns an Observable that resolves to the sent message ID
     * @param {string} topicName 
     * @param {string} type message(payload) type
     * @param {Object} data 
     * @param {Object} ops {correlationId} 
     */
const publish$ = (topicName, type, data, { correlationId } = {}) => {
  const uuid = uuidv4();
  const dataBuffer = JSON.stringify(
    {
      id: uuid,//message id
      t: type,//Type
      data,// Payload
      ts: Date.now(),// Timestamp
      ets: Date.now() + 5000,// Expiration Timestamp
      att: {
        sId: this.senderId, //Sender Id
        cId: correlationId,// Correlation Id
        rt: undefined // replyTo Topic
      }
    }
  );

  console.log(`${topicName}`);
  return of({})
    .pipe(
      map(() => {
        mqttClient.publish(`${topicName}`, dataBuffer, { qos: 0 });
        return uuid;
      })
    );
}


const PICO_Y_PLACA_BLOCK = { key: "PICO_y_PLACA", notes: "", startTime: Date.now() - 60000, endTime: Date.now() + 60000 };
const vehicles = [
  { plate: 'DSV006', blocks: [], active: true },
  { plate: 'MNP137', blocks: [PICO_Y_PLACA_BLOCK], active: true }
];
const driver = {
  name: 'Juan Daniel',
  lastname: 'Tobon Santa',
  username: 'drimax',
  blocks: [],
  active: true
};
const shift = {
  state: 'AVAILABLE',
  vehicle: vehicles[0],
  driver
};

const client = {
  name: "Daniel Felipe Santa Uribe",
  tip: 1000,
  tipType: "ON_SITE"
};
const pickUp = {
  marker: [{ lat: 6.2138601, lng: -75.6091695 }],
  polygon: undefined,
  city: 'Medellin',
  zone: 'Belen',
  neighborhood: 'Loma de los Bernal',
  addressLine1: 'Cra 84F # 3D-150',
  addressLine2: 'AVIVA Torre 7 Apto 2422',
  notes: 'detras del euro de los bernal, siguiendo la ruta 3007 de Metroplus'
};
const dropOff = {
  marker: [{ lat: 6.164722, lng: -75.6040307 }],
  polygon: undefined,
  city: 'Envigado',
  zone: 'Las vegas',
  neighborhood: 'Zona 1',
  addressLine1: 'cra 48 # 48sur-75',
  addressLine2: 'Centro multiple las vegas, int 131',
  notes: 'Sobre la Av las vegas (norte->sur) antes del transito de envigado'
};
const service = {
  id: "093321bc-d5fc-4fa6-b39c-14dd859a2124",
  client,
  pickUp,
  dropOff,
  verificationCode: 'Tio Nacho',
  requestedFeatures: ['AC', 'TRUNK'],
  paymentType: 'CASH',
  fareDiscount: 0.10,
  fare: undefined,
  tip: 1000,
  route: undefined,
  state: "ASSIGNED"
};

const commandAck = { accepted: true };
var openShift = undefined;
var assignedService = undefined;


module.exports = {

  Query: {

    DriverAssignedVehicles: (root, args, context, info) => {
      return of(vehicles).toPromise()
    },

    OpenShift: (root, args, context, info) => {
      return of(openShift).toPromise()
    },

    AssignedService: (root, args, context, info) => {
      return of(assignedService).toPromise()
    },

    HistoricalDriverServices: (root, args, context, info) => {
      return of([
        { ...service, id: "093321bc-d5fc-4fa6-b39c-14dd859a2125" },
        { ...service, id: "093321bc-d5fc-4fa6-b39c-14dd859a2126" },
        { ...service, id: "093321bc-d5fc-4fa6-b39c-14dd859a2127" },
        { ...service, id: "093321bc-d5fc-4fa6-b39c-14dd859a2128" },
        { ...service, id: "093321bc-d5fc-4fa6-b39c-14dd859a2129" },
        { ...service, id: "093321bc-d5fc-4fa6-b39c-14dd859a2130" }
      ]).toPromise()
    },

  },

  Mutation: {
    startShift: (root, args, context, info) => {
      openShift = { ...shift };
      return publish$(
        `${businessId}/driver-app/shift/${driver.username}`,
        'ShiftStateChanged',
        openShift
      ).pipe(
        mapTo(commandAck)
      ).toPromise();
    },

    stopShift: (root, args, context, info) => {
      openShift = undefined;
      assignedService = undefined;
      return publish$(
        `${businessId}/driver-app/shift/${driver.username}`,
        'ShiftStateChanged',
        { ...shift, state: 'CLOSED' }
      ).pipe(
        mapTo(commandAck)
      ).toPromise();
    },

    setShifState: (root, args, context, info) => {
      openShift.state = args.state;
      return publish$(
        `${businessId}/driver-app/shift/${driver.username}`,
        'ShiftStateChanged',
        openShift
      ).pipe(
        mapTo(commandAck)
      ).toPromise();
    },

    acceptServiceOffer: (root, args, context, info) => {
      assignedService = { ...service };
      return publish$(
        `${businessId}/driver-app/service/${driver.username}`,
        'ServiceAssigned',
        assignedService
      ).pipe(
        mapTo(commandAck)
      ).toPromise();
    },

  },
}




