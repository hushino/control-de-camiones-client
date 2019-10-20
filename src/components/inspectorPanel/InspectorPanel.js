/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Card, Icon, Avatar, Row, Col, Layout, Form, Input, Button, Radio, Upload, message } from 'antd';
import axios from 'axios';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function InspectorPanel(props) {

    const [imagestate, setImagestate] = useState({ loading: false })
    //const [state, setState] = useState()
    let state = 0
    let state2 = 0
    const [imagestate2, setImagestate2] = useState({ loading: false })
    const [uploadImage, setUploadImage] = useState({})
    const [uploadImage2, setUploadImage2] = useState({})
    const { getFieldDecorator } = props.form;
    /*   const handleChange = info => {
          let fileList = [...info.fileList];
  
          // 1. Limit the number of uploaded files
          // Only to show two recent uploaded files, and old ones will be replaced by the new
          fileList = fileList.slice(-2);
  
          // 2. Read from response and show file link
          fileList = fileList.map(file => {
              if (file.response) {
                  // Component will show file.url as link
                  file.url = file.response.url;
              }
              return file;
          });
  
          setState({ fileList });
      }; */
    /*  props = {
         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
         onChange: handleChange,
         multiple: true,
     } */
    const payload = {
        patente: "nombrefake",
        cuit: 4321,
        infoadicional: "nombrefakefoto",
        fotocamion: "nombre",
        fotopatente: "nombre",
        vehiculomodelo: "nombre",
        celular: 4324,
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
    function beforeUpload2(file) {
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
    const handleChange2 = info => {
        /* if (payload.nombre === "" || isNaN(payload.nombre) || payload.nombre === null) {
            message.error('Escribe un nombre primero !');
            return;
        } */
        if (info.file.status === 'uploading') {
            setImagestate2({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} imagen cargada exitosamente`);

            bodyFormDataPatente.append('image2', new Blob([info.file.originFileObj], { type: 'image/jpg' }));
            setUploadImage2(bodyFormDataCamion)

            getBase64(info.file.originFileObj, imageUrl2 =>
                setImagestate2({
                    imageUrl2,
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
    const uploadButton2 = (
        <div >
            <Icon type={imagestate2.loading ? 'loading' : 'plus'} />
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
        /* const data = new FormData()
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        } */

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
        /* const data = new FormData()
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        } */

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

    const { imageUrl } = imagestate;
    const { imageUrl2 } = imagestate2;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
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
                /*payload.fotocamion = values.fotocamion
                 payload.fotopatente = values.fotopatente*/
                /* 
                                for (let value of uploadImage.getAll('image')) {
                                    console.log('asd ' + value);
                                    bodyFormDataPatente.append('image', new Blob([value], { type: 'image/jpg' }), payload.cuit + payload.patente);
                                    setUploadImage(bodyFormDataPatente)
                                }
                                for (let value2 of uploadImage2.getAll('image')) {
                                    console.log('asd2 ' + value2);
                                    bodyFormDataCamion.append('image2', new Blob([value2], { type: 'image/jpg' }), payload.cuit + "AAAA" + payload.patente);
                                    setUploadImage2(bodyFormDataCamion)
                                } */
                //postImage(bodyFormDataPatente, bodyFormDataCamion)
                onClickHandler(data, data2)
            }
        });
    };
    const onChangeHandler3 = event => {
        console.log(event.target.files[0])
        //console.log(event.target.files[1])
        //console.log(event.target.files[2])
        state = ({
            selectedFile: event.target.files,
            //selectedFile: event.target.files[0]
        })
    }
    const onChangeHandler2 = event => {
        console.log(event.target.files[0])
        //console.log(event.target.files[1])
        //console.log(event.target.files[2])
        state2 = ({
            selectedFile: event.target.files,
            //selectedFile: event.target.files[0]
        })
    }

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
                            {getFieldDecorator('cuit', {
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
                        {/*  <Form.Item label="Foto de patente" >
                            {getFieldDecorator('fotopatente', {
                                rules: [{ required: true, message: 'Suba un archivo' }],
                            })(
                                <Upload {...props} fileList={state.fileList}>
                                    <Button>
                                        <Icon type="upload" /> Upload
                         </Button>
                                </Upload>
                            )}
                        </Form.Item> */}

                        {/*  <Form.Item label="Foto de patente" >
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
                        <Form.Item label="Foto de camion" >
                            {getFieldDecorator('fotocamion', {
                                rules: [{ required: true, message: 'Suba un archivo' }],
                            })(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload2}
                                    onChange={handleChange2}
                                >
                                    {imageUrl2 ? <img src={imageUrl2} alt="avatar" style={{ width: '100%' }} /> : uploadButton2}
                                </Upload>,
                            )}
                        </Form.Item> */}

                        <div className="form-group files">
                            <label>Subir foto de patente</label>
                            <input onChange={onChangeHandler3} multiple type="file" className="form-control" />
                        </div>
                        <div className="form-group files">
                            <label>Subir foto del camion</label>
                            <input onChange={onChangeHandler2} multiple type="file" className="form-control" />
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