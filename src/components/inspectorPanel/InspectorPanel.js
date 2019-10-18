/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Card, Icon, Avatar, Row, Col, Layout, Form, Input, Button, Radio, Upload, message } from 'antd';
import axios from 'axios';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function InspectorPanel(props) {

    const [imagestate, setImagestate] = useState({ loading: false })
    const [uploadImage, setUploadImage] = useState({})
    const { getFieldDecorator } = props.form;

    const payload = {
        patente: "nombrefake",
        cuit: "nombrefake",
        infogeneral: "nombrefakefoto",
        fotocamion: "nombre",
        fotopatente: "nombre",
        vehiculomodelo: "nombre",
    }

    function beforeUpload(file) {
        /* if (data.nombre === "" || data.nombre == undefined || data.nombre === null || data.nombre == NaN) {
            message.error('Escribe un nombre primero !');
        } */

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo puedes subir archivos JPG/PNG !');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('La imagen debe pesar menos de 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    let bodyFormDataPatente = new FormData();
    let bodyFormDataCamion = new FormData();
    const reader = new FileReader();
    function getBase64(img, callback) {

        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    //useEffect(() => { }, []);
    const handleChange = info => {
        /* if (payload.nombre === "" || isNaN(payload.nombre) || payload.nombre === null) {
            message.error('Escribe un nombre primero !');
            return;
        } */
        if (info.file.status === 'uploading') {
            setImagestate({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} imagen cargada exitosamente`);

            bodyFormDataPatente.append('image', new Blob([info.file.originFileObj], { type: 'image/jpg' }));
            setUploadImage(bodyFormDataPatente)

            getBase64(info.file.originFileObj, imageUrl =>
                setImagestate({
                    imageUrl,
                    loading: false,
                }),
            );
        }

    };

    const uploadButton = (
        <div >
            <Icon type={imagestate.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Subir</div>
            {/*  <img src={`http://localhost:3003/upload/image/` + data.foto} alt="avatar" style={{ width: '100%' }} /> */}
        </div>
    );

    const postData = () => axios.post(`http://localhost:8081/api/addSolicitudPaseCamion`, payload)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })

    const postImage = (bodyFormData) => axios.post("http://localhost:3004/upload", bodyFormData)
        .then(function (response) {
            //console.log(response.data.filename)
            if (response.data.filename !== undefined) {
                //data.foto = response.data.filename
                payload.fotopatente = response.data.filename
                payload.fotocamion = response.data.filename
            }
            //payload.foto = response.data.filename
            postData()
        })
        .catch(function (response) {
            console.log(response);
        })


    const { imageUrl } = imagestate;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                payload.patente = values.patente
                payload.cuit = values.cuit
                payload.vehiculomodelo = values.vehiculomodelo
                payload.infogeneral = values.infogeneral
               /*  payload.fotocamion = values.fotocamion
                payload.fotopatente = values.fotopatente */

                for (let value of uploadImage.getAll('image')) {
                    //console.log('asd ' + value);
                    bodyFormDataPatente.append('image', new Blob([value], { type: 'image/jpg' }), payload.cuit + payload.patente);
                    setUploadImage(bodyFormDataPatente)
                    
                    bodyFormDataCamion.append('image', new Blob([value], { type: 'image/jpg' }), payload.cuit + payload.patente);
                    setUploadImage(bodyFormDataCamion)
                }
                postImage(bodyFormDataPatente)
                postImage(bodyFormDataCamion)
            }
        });
    };


    return (
        <div>
            <Layout style={{ height: "calc(100vh - 55px)" }}>
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
                                    placeholder="patente"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Cuit">
                            {getFieldDecorator('cuit', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="cuit"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Informacion adicional">
                            {getFieldDecorator('infogeneral', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="infogeneral"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Vehiculo modelo">
                            {getFieldDecorator('vehiculomodelo', {
                                rules: [{ required: true, message: 'Ingrese un dato!' }],
                            })(
                                <Input
                                    type="text"
                                    placeholder="vehiculomodelo"
                                />,
                            )}
                        </Form.Item>

                        <Form.Item label="Foto de patente" >
                            {getFieldDecorator('fotopatente', {
                                rules: [{ required: true, message: 'Suba un archivo' }],
                            })(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>,
                            )}
                        </Form.Item>
                        <Form.Item label="Foto del camion" >
                            {getFieldDecorator('fotocamion', {
                                rules: [{ required: true, message: 'Suba un archivo' }],
                            })(
                                <Upload
                                    name="avatar2"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar2" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Row></Row>
                            <Button type="primary" htmlType="submit" className="update-form-button" >
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