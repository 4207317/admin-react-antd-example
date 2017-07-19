// 设备维护 - 设备台帐
import React, {Component} from 'react'
import {Modal, Table, Button, Spin, Select, Input} from 'antd'
import {apiPost} from '../../../api'
// 引入组件
import EquipmentAddUpComponent from './common/EquipmentAddUp'
import EnabledStateComponent from './common/EnabledState'
const Option = Select.Option
// React component
class Account extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            openAdd: false,
            openUpdate: false,
            previewVisible: false,
            equipmentNumber: '',
            imgUrl: '',
            openSS: false,
            columns: [],
            dataSource: [],
            id: 0
        }
    }

    // 弹出框设置
    openSS = (id) => {
        this.setState({
            openUpdate: false,
            openSS: true,
            openAdd: false,
            id: id
        })
    }
    handleUpdateEquipment = (id) => {
        this.setState({
            openAdd: false,
            openSS: false,
            openUpdate: true,
            id: id
        })
    }

    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/equipment/equipmentList'
        )
        let repairList = result.data
        const handleUpdateEquipment = this.handleUpdateEquipment
        const openSS = this.openSS
        this.setState({
            loading: false,
            columns: [{
                title: '序号',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '所属系统',
                width: 150,
                dataIndex: 'systemName',
                key: 'systemName'
            }, {
                title: '设备编号',
                width: 150,
                dataIndex: 'equipmentNumber',
                key: 'equipmentNumber'
            }, {
                title: '设备名称',
                width: 150,
                dataIndex: 'equipmentName',
                key: 'equipmentName'
            }, {
                title: '规格型号',
                width: 150,
                dataIndex: 'equipmentModel',
                key: 'equipmentModel'
            }, {
                title: '设备品牌',
                width: 150,
                dataIndex: 'equipmentBrand',
                key: 'equipmentBrand'
            }, {
                title: '使用年限',
                width: 150,
                dataIndex: 'serviceLife',
                key: 'serviceLife'
            }, {
                title: '设备状态',
                width: 100,
                dataIndex: 'equipmentStatus',
                key: 'equipmentStatus',
                render: function (text, record, index) {
                    let equipmentStatus = '使用'
                    if (text === 1) {
                        equipmentStatus = '闲置'
                    } else if (text === 2) {
                        equipmentStatus = '报废'
                    }
                    return (
                        <span>{equipmentStatus}</span>
                    )
                }
            }, {
                title: '维保责任人',
                width: 150,
                dataIndex: 'maintenanceName',
                key: 'maintenanceName'
            }, {
                title: '巡检责任人',
                dataIndex: 'patrolName',
                key: 'patrolName'
            }, {
                title: '操作',
                width: 250,
                dataIndex: 'opt',
                key: 'opt',
                fixed: 'right',
                render: function (text, record, index) {
                    let url = '/deviceMaintain/equipmentLedger/' + record.id
                    return (
                        <div>
                            <a href={url}><Button >详情</Button></a>
                            <Button onClick={() => handleUpdateEquipment(record.id)}>修改</Button>
                            <Button onClick={() => openSS(record.id)}>启停设备</Button>
                        </div>
                    )
                }
            }],
            dataSource: repairList
        })
    }

    componentDidMount () {
        this.initialRemarks()
    }

    refresh = async (url, equipmentNumber) => {
        // 刷新表格
        if (typeof (url) !== 'undefined') {
            this.info(url, equipmentNumber)
        }
        let result = await apiPost(
            '/equipment/equipmentList',
            {
                'equipmentName': this.equipmentName,
                'equipmentStatus': this.equipmentStatus
            }
        )
        this.setState({
            openAdd: false,
            openUpdate: false,
            openSS: false,
            dataSource: result.data,
            id: 0
        })
    }
    // 弹出框设置
    showModal = () => {
        this.setState({
            openUpdate: false,
            openSS: false,
            openAdd: true
        })
    }
    equipmentName = ''
    entryNameOnChange = (e) => {
        this.equipmentName = e.target.value
    }
    equipmentStatus = ''
    equipmentStatusOne = (value) => {
        this.equipmentStatus = value
    }
    query = () => {
        this.refresh()
    }

    info (url, equipmentNumber) {
        this.setState({
            previewVisible: true,
            loading: false,
            openAdd: false,
            openUpdate: false,
            equipmentNumber: equipmentNumber,
            imgUrl: url
        })
    }

    handleCancel = () => {
        this.setState({
            previewVisible: false,
            loading: false,
            openAdd: false,
            openUpdate: false,
            equipmentNumber: '',
            imgUrl: ''
        })
    }

    render () {
        return (
            <div>
                <EquipmentAddUpComponent
                    title="添加设备"
                    refreshTable={this.refresh}
                    visible={this.state.openAdd}
                />
                <EquipmentAddUpComponent
                    title="修改设备"
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openUpdate}
                />
                <EnabledStateComponent
                    title="启停设备"
                    id={this.state.id}
                    refreshTable={this.refresh}
                    visible={this.state.openSS}
                />
                <span style={{paddingBottom: '10px',
                    display: 'block'}}>
                    <span>设备名称:&nbsp;&nbsp;</span>
                    <Input style={{width: 200}} onChange={this.entryNameOnChange} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;设备状态:&nbsp;&nbsp;</span>
                    <Select
                        showSearch
                        style={{width: 200,
                            marginRight: '5px'}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.equipmentStatusOne}
                    >
                        <Option key="0">使用</Option>
                        <Option key="2">报废</Option>
                        <Option key="1">闲置</Option>
                    </Select>
                    <Button style={{marginRight: '5px'}} type="primary" onClick={this.query}>查询</Button>
                    <Button type="primary" onClick={this.showModal}>添加设备</Button>
                </span>

                <Spin spinning={this.state.loading}>
                    <Table
                        scroll={{x: 1550}}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
                <Modal maskClosable={false} visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={this.state.imgUrl} />
                    <span style={{
                        textAlign: 'center',
                        display: 'block'
                    }}
                    >设备编号：{this.state.equipmentNumber}</span>
                </Modal>
            </div>
        )
    }
}
export default Account


