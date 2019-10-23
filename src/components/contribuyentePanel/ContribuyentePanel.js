/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Table, Card, Icon, Avatar, Row, Col, Layout, Form, Input, Button, Radio, Upload, message } from 'antd';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

function ContribuyentePanel() { //${dataIndex}

    const [state, setState] = useState([])
    const [loading, setLoading] = useState(false)
    let current = 0
    let pageSize = 10
    // eslint-disable-next-line
    let sortField = ''
    let sortOrder = ''
    const handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...loading.pagination };
        pager.current = pagination.current;
        setLoading({
            pagination: pager,
        });
        pageSize = pagination.pageSize
        current = pagination.current - 1
        sortField = sorter.field
        sortOrder = sorter.order
        setLoading({ loading: true });
    };
    const cuit = localStorage.getItem("cuit");
    const postData = () => axios.get(`http://localhost:8081/api/getInspectorPostForContribuyenteByCuit?page=${current}&size=${pageSize}&sortOrder=${sortOrder}&cuit=${cuit}`)
        .then(function (response) {
            console.log(response.data)
            setLoading({ loading: true });
            const pagination = { ...loading.pagination };
            pagination.total = response.data.totalElements; //-10 bad
            setLoading({
                loading: false,
                data: response.data.content,
                pagination,
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    useEffect(() => {
        postData()
        localStorage.setItem("vehiculomodelo", "");
        localStorage.setItem("patente", "");
        localStorage.setItem("celular", "");
    }, []);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

        if (dataIndex === "vehiculomodelo") {
            if (selectedKeys !== "") {
                localStorage.setItem("vehiculomodelo", selectedKeys);
            }
        }
        if (dataIndex === "patente") {
            if (selectedKeys !== "") {
                localStorage.setItem("patente", selectedKeys);
            }
        }
        if (dataIndex === "celular") {
            if (selectedKeys !== "") {
                localStorage.setItem("celular", selectedKeys);
                console.log("celular " + localStorage.getItem("celular"))
            }
        }

        setState({ searchText: selectedKeys[0] });
    };
    const handleReset = clearFilters => {
        clearFilters();
        localStorage.setItem("vehiculomodelo", "");
        localStorage.setItem("patente", "");
        localStorage.setItem("celular", "");
        setState({ searchText: '' });
    };
    let searchInput = null;
    let getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Buscar
        </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reiniciar
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ /* backgroundColor: '#ffc069', */ padding: 0 }}
                searchWords={[state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });
    const columns = [
        {
            title: 'vehiculomodelo',
            dataIndex: 'vehiculomodelo',
            sorter: true,
            render: data => data,
            width: '20%',
            ...getColumnSearchProps('vehiculomodelo'),
        },
        {
            title: 'patente',
            dataIndex: 'patente',
            width: '20%',
            ...getColumnSearchProps('patente'),
        },
        {
            title: 'celular',
            dataIndex: 'celular',
            width: '20%',
            ...getColumnSearchProps('celular'),
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: '20%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Accion',
            key: 'action',
            dataIndex: 'id',
            render: (dataIndex) => <Link to={`/viewpersona/${dataIndex}`}>Ver</Link>,
        }

    ];

    return (
        <div>
            <Layout style={{ height: "calc(100vh - 55px)" }}>
                <Content style={{ padding: '0 50px' }}>
                    <Table
                        columns={columns}
                        rowKey={record => record.id}
                        dataSource={loading.data}
                        pagination={loading.pagination}
                        loading={loading.loading}
                        onChange={handleTableChange}
                    />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Red Design ©2019 Created by Hushino</Footer>
            </Layout>
        </div>
    )
}

export default ContribuyentePanel