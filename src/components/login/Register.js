/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Checkbox, Form, Icon, Input, Button, Row, Col } from 'antd';
import './Login.css';
import store from '../../redux/store';

import { useSelector, useDispatch } from 'react-redux';
//https://stackoverflow.com/questions/44608627/how-to-persist-jwt-token-throughout-session-until-user-logout
function Register(props) {
    const dispatch = useDispatch();
    //const [role, setRole] = useState()
    //const [state, setState] = useState("nani")

    const isAnyRole = localStorage.getItem("role") === 'ADMIN' || localStorage.getItem("role") === "CONTRIBUYENTE" || localStorage.getItem("role") === "INSPECTOR";
    //console.log(props);
    const payload = {
        username: "user@gmail.com",
        password: "123333",
        celular: 34325343243,
        cuit: 954643534,
        apellido: "sad",
        nombre: "sad2"
    };

    function imaginator(stateOfLife) {
        return {
            type: 0,
            stateOfLife
        };
    }

    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        // setRole(store.getState().Role)
        // const sd = isRole ? "Estas conectado" : "No iniciaste sesion"
        // setState(sd)
    });
    function refreshPage() {
        window.location.reload();
    }
    const fetchData = async () => {
       /*  await */ axios.post('http://localhost:8081/api/auth/signup', payload)
        /* dispatch(imaginator(response.data))
        localStorage.getItem("role")
        response.data.roles.forEach(element => {
            localStorage.setItem("role", element.authority);
        }); */
        //console.log(localStorage.getItem("role"))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                payload.username = values.username;
                payload.password = values.password;
                payload.email = values.email;
                payload.cuit = values.cuit;
                payload.celular = values.celular;
                payload.nombre = values.nombre;
                payload.apellido = values.apellido;
                //forceUpdate();
                fetchData();
                //setTimeout(function () { window.location.reload(); }, 1200);
                //window.location.reload();
            }
        });
    };
    const { getFieldDecorator } = props.form;

    const logout = () => {
        localStorage.setItem("role", "");
        //forceUpdate();
        window.location.reload();
    }
    return (
        <Row type="flex">
            <Col span={12}>
                {
                    isAnyRole
                        ? <Button type="danger" size="large" onClick={logout}>
                            Desconectarse
                     </Button>
                        : <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('nombre', {
                                    rules: [{ required: true, message: 'Ingrese su nombre de nombre!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Nombre"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('apellido', {
                                    rules: [{ required: true, message: 'Ingrese su nombre de Apellido!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Apellido"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Ingrese su nombre de usuario!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Nombre de usuario que usara para iniciar sesion"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Ingrese su contraseña!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Contraseña"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Ingrese su email!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="email"
                                        placeholder="Direccion de correo electronico"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('cuit', {
                                    rules: [{ required: true, message: 'Ingrese su CUIT!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="CUIT sin guion y espacios"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('celular', {
                                    rules: [{ required: true, message: 'Ingrese su celular!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="Numero de Celular sin simbolos {caracteristica}{numero} ej: 3718577823"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>

                                <Row></Row>
                                <Button type="primary" htmlType="submit" className="login-form-button" >
                                    Iniciar
                            </Button>
                            </Form.Item>
                        </Form>
                }
            </Col>
        </Row>

    );
}
const WrappedNormalRegisterForm = Form.create({ name: 'normal_login' })(Register);

export default WrappedNormalRegisterForm

