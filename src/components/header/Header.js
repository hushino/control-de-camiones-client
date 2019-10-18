/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Row, Menu, Icon, PageHeader, message } from 'antd';
import App from '../../App';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NoPageFound from '../noPageFound/NoPageFound';
import store from '../../redux/store';
import AdminPanel from '../adminPanel/AdminPanel';
import ContribuyentePanel from '../contribuyentePanel/ContribuyentePanel';
import InspectorPanel from '../inspectorPanel/InspectorPanel';

function Header() {

  const isRoleAdmin = localStorage.getItem("role") === 'ADMIN';
  const isRoleCONTRIBUYENTE = localStorage.getItem("role") === 'CONTRIBUYENTE';
  const isRoleINSPECTOR = localStorage.getItem("role") === 'INSPECTOR';

  const [state, setState] = useState();

  //useEffect(() => {}, []);

  return (
    <Router>
      <nav>
        <div className="clearfix" id="header">
          <div className="ant-row">
            <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-5 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4">
            </div>
            <Menu mode="horizontal">
              <Menu.Item key="mail" >
                <Link to="/">
                  <Icon type="home" />
                  Inicio
                </Link>
              </Menu.Item>
              {
                isRoleCONTRIBUYENTE
                  ? <Menu.Item key="contribuyente" >
                    <Link to="/contribuyente">
                      <Icon type="gold" />
                      Panel Contribuyente
                    </Link>
                  </Menu.Item>
                  : ""

              }
              {
                isRoleINSPECTOR
                  ? <Menu.Item key="inspector" >
                    <Link to="/inspector">
                      <Icon type="appstore" />
                      Panel Inspector
                    </Link>
                  </Menu.Item>
                  : ""
              }
              {
                isRoleAdmin
                  ? <Menu.Item key="admin" >
                    <Link to="/admin">
                      <Icon type="appstore" />
                      Panel Administrador
                    </Link>
                  </Menu.Item>
                  : ""
              }
            </Menu>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={App} />
        {
          isRoleCONTRIBUYENTE
            ? <Route path="/contribuyente/" component={ContribuyentePanel} />
            : ""
        }
        {
          isRoleAdmin
            ? <Route path="/admin/" component={AdminPanel} />
            : ""
        }
        {
          isRoleINSPECTOR
            ? <Route path="/inspector/" component={InspectorPanel} />
            : ""
        }
        <Route component={NoPageFound} />
      </Switch>
    </Router>
  )

}


export default Header