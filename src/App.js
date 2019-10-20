/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { PageHeader, Row, Col, Icon, Input, Button, Layout } from 'antd';
import store from './redux/store'
import WrappedNormalLoginForm from './components/login/Login';
const { Header, Content, Footer, Sider } = Layout;


function App() {
  const [data, setData] = useState([])
  const [role, setRole] = useState([])
  useEffect(() => {
    setRole(store.getState().Role)
    let isSubscribed = true
    let reduxsub
    if (isSubscribed) {
      const fetchData = async () => {
        reduxsub = store.subscribe(async () => {
          const response = await axios.get('http://localhost:8081/api/', {
            headers: {
              Authorization: store.getState().Authorization
            }
          })
          setData(response.data)
        });
      }
      fetchData();
    }
    return () => {
      reduxsub()
      isSubscribed = false
    }

  }, []);


  return (
    <React.Fragment>
      <PageHeader onBack={() => null} backIcon={<Icon type="appstore" />} title="Control de Camiones" subTitle="Bienvenido" />

      <Row type="flex">
        <Col span={1} ></Col>
        <Col span={9} >
          <WrappedNormalLoginForm />
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col span={6}>
          <br />
          <br />
          {/*      <Theme></Theme> */}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default App;
