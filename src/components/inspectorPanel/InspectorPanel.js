/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Card, Icon, Avatar, Row, Col, Layout, Form, Input, Button, Radio, Upload, message } from 'antd';
import axios from 'axios';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function InspectorPanel(props) {

    const { getFieldDecorator } = props.form;
    const [state, setState] = useState({ selectedFile: null })
    const [state2, setState2] = useState({ selectedFile: null })
    const nameRef = useRef(null);
    const nameRef2 = useRef(null);

    const payload = {
        patente: "nombrefake",
        cuit: 4321,
        infoadicional: "nombrefakefoto",
        fotocamion: "nombre",
        fotopatente: "nombre",
        vehiculomodelo: "nombre",
        celular: 4324,
    }

    let bodyFormDataPatente = new FormData();
    let bodyFormDataCamion = new FormData();
    const reader = new FileReader();
    function getBase64(img, callback) {
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    useEffect(() => {
        nameRef.current = payload.fotocamion
        nameRef2.current = payload.fotopatente
    }, []);

    const postData = () => axios.post(`http://localhost:8081/api/addSolicitudPaseCamion`, payload)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    const postImage2 = (bodyFormDataCamion) => axios.post("http://localhost:3004/upload", bodyFormDataCamion)
        .then(function (response) {
            console.log(response.data.filename)
            //if (response.data.filename !== undefined) {
            payload.fotocamion = response.data.filename
            //}
            postData()
            //payload.foto = response.data.filename
        })
        .catch(function (response) {
            console.log(response);
        })
    const postImage = (bodyFormDataPatente, bodyFormDataCamion) => axios.post("http://localhost:3004/upload", bodyFormDataPatente)
        .then(function (response) {
            console.log(response.data.filename)
            if (response.data.filename !== undefined) {
                // payload.fotocamion = response.data.filename
                payload.fotopatente = response.data.filename
            }

            postData()
            //postImage2(bodyFormDataCamion)
            //payload.foto = response.data.filename
        })
        .catch(function (response) {
            console.log(response);
        })

    const onClickHandler = (data, data2) => {

        axios.post("http://localhost:3004/upload", data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            //console.log(res.statusText)
            console.log(res.data)
            //console.log(res)
            payload.fotopatente = res.data[0].filename
            //payload.fotocamion = res.data[0].filename

            onClickHandler2(data2)
        })
    }
    const onClickHandler2 = (data2) => {

        axios.post("http://localhost:3004/upload", data2, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            //console.log(res.statusText)
            console.log(res.data)
            //console.log(res)
            payload.fotocamion = res.data[0].filename

            postData()
        })
    }
    const onChangeHandler3 = event => {
        let file = event.target.files;
        setState(() => ({
            selectedFile: file
        }));
    }
    const onChangeHandler4 = event => {
        let file = event.target.files;
        setState2(() => ({
            selectedFile: file
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (state.selectedFile != null /* && this.state.selectedFile.length < 1 */) {
                    for (let x = 0; x < state.selectedFile.length; x++) {
                        payload.append('file', state.selectedFile[x])
                    }
                } else {
                    payload.foto = nameRef.current
                }
                if (state.selectedFile != null /* && this.state.selectedFile.length < 1 */) {
                    for (let x = 0; x < state.selectedFile.length; x++) {
                        payload.append('file', state.selectedFile[x])
                    }
                } else {
                    payload.foto = nameRef.current
                }
                payload.patente = values.patente
                payload.cuit = values.cuit
                payload.vehiculomodelo = values.vehiculomodelo
                payload.infoadicional = values.infoadicional
                payload.celular = values.celular

                //  const data = new FormData()
                //data.append('file', state.selectedFile)
                const data = new FormData()
                for (let x = 0; x < state.selectedFile.length; x++) {
                    data.append('file', state.selectedFile[x])
                }
                const data2 = new FormData()
                for (let x = 0; x < state2.selectedFile.length; x++) {
                    data2.append('file', state2.selectedFile[x])
                }

                onClickHandler(data, data2)
            }
        });
    };


    return (
        <div>
            <Layout style={{ height: "calc(100vh + 200px)" }}>
                <Content style={{ padding: '0 50px' }}>
                    {/* <Row type="flex" gutter={16}>
                        <Col>
                            <h2>Panel de contribuyente</h2>
                            <Link to={`/crearSolicitud`}>Crear solicitud de pase de camion</Link>
                        </Col>
                    </Row> */

                    }
                    <Form onSubmit={handleSubmit} className="update-form" >

                        <Form.Item label="Patente" >
                            {getFieldDecorator('patente', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    name="text"
                                    placeholder="Patente"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Cuit">
                            {getFieldDecorator('cuit', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="number"
                                    placeholder="cuit"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Celular">
                            {getFieldDecorator('celular', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="number"
                                    placeholder="Numero de celular"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Informacion adicional">
                            {getFieldDecorator('infoadicional', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="Info adicional"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Vehiculo modelo">
                            {getFieldDecorator('vehiculomodelo', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="Modelo de Vehiculo"
                                />,
                            )}
                        </Form.Item>
                        <div className="form-group files">
                            <label>Subir foto de patente</label>
                            <input onChange={onChangeHandler3} multiple type="file" className="form-control" />
                        </div>
                        <div className="form-group files">
                            <label>Subir foto del camion</label>
                            <input onChange={onChangeHandler4} multiple type="file" className="form-control" />
                        </div>
                        <Form.Item>
                            <Row></Row>
                            <Button /*  onClick={onClickHandler} */ type="primary" htmlType="submit" className="update-form-button" >
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Red Design ©2019 Created by Hushino</Footer>
            </Layout>
            
        </div>
    )
}
const WrappedInspectorPanelForm = Form.create({ name: 'InspectorPanel' })(InspectorPanel);
export default WrappedInspectorPanelForm