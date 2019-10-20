/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Card, Icon, Avatar, Row, Col, Layout, Form, Input, Button, Radio, Upload, message } from 'antd';
import axios from 'axios';
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function ContribuyentePanel() { //${dataIndex}
    const cuit = localStorage.getItem("cuit");
    const postData = () => axios.get(`http://localhost:8081/api/getInspectorPostForContribuyenteByCuit/${cuit}`)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    postData()
    return (
        <div>
            <Layout style={{ height: "calc(100vh - 55px)" }}>
                <Content style={{ padding: '0 50px' }}>
                    <Row type="flex" gutter={16}>
                        <Col>
                            <Link to={`/verautorizaciones`}>Ver autorizaciones</Link>
                        </Col>
                    </Row>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Red Design ©2019 Created by Hushino</Footer>
            </Layout>
        </div>
    )
}

export default ContribuyentePanel