import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { RabbitConnectAmpq } from './rabbit-connect-ampq';
// import { RabbitConnectMqtt } from './rabbit-connect-mqtt';
import { RabbitStomp } from './rabbit-mq-stomp';

function App() {
  return (
    <>
      {/* <RabbitConnectAmpq /> */}
      {/* <RabbitConnectMqtt /> */}
      <RabbitStomp />
    </>
  );

}

export default App;
