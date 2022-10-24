import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { RabbitConnectAmpq } from './rabbit-connect-ampq';
// import { RabbitConnectMqtt } from './rabbit-connect-mqtt';
import { RabbitStomp } from './rabbit-mq-stomp';
import { RabbitMqtt } from './rabbit-mqtt';

function App() {
  return (
    <>
      {/* <RabbitConnectAmpq /> */}
      {/* <RabbitConnectMqtt /> */}
      <RabbitStomp />
      {/* <RabbitMqtt /> */}
    </>
  );

}

export default App;
