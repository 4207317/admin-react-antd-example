// 财务管理 - 电费审核
import React from 'react'
import {Table, Spin, Popconfirm, Tabs} from 'antd'
import PowerBillHeadComponent from '../../Charge/pages/components/PowerBillHead'
import { apiPost } from '../../../api'
import PowerInfomation from '../../Charge/pages/components/PowerInfomation'


const TabPane = Tabs.TabPane
class PowerBill extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            columns1: [],
            columns2: [],
            columns3: [],
            dataSource1: [],
            dataSource2: [],
            dataSource3: [],
            ListBuildingInfo: [],
            order: 1,
            RowKeys: [],
            openInfo: false,
            id: 0
        }
    }

    refreshTwo = async (activeKey) => {
        this.setState({loading: true,
            openInfo: false})
        let result = await apiPost(
            '/ElectricityFees/list'
        )
        console.log(result)
        console.log(result.data)
        let PowerBillList = result.data
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '1') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource3.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource2.push(PowerBill)
            }
            return ''
        })
        this.setState({
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            order: activeKey ? activeKey : 1
        })
    }
    refresh = async (pagination, filters, sorter) => {
        this.setState({loading: true,
            openInfo: false})
        let result = await apiPost(
            '/ElectricityFees/list',
            filters
        )
        let PowerBillList = result.data
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '1') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource3.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource2.push(PowerBill)
            }
            return ''
        })
        this.setState({
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3
        })
    }
    async initialRemarks () {
        this.setState({loading: true})
        let result = await apiPost(
            '/ElectricityFees/list',
        )
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo',
        )
        let PowerBillList = result.data
        let dataSource1 = []
        let dataSource2 = []
        let dataSource3 = []
        PowerBillList.map(PowerBill => {
            if (PowerBill.examineState.toString() === '1') {
                dataSource1.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '2') {
                dataSource3.push(PowerBill)
            } else if (PowerBill.examineState.toString() === '3') {
                dataSource2.push(PowerBill)
            }
            return ''
        })

        const arr = [
            {
                title: '序号',
                width: 100,
                dataIndex: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '所属楼宇',
                width: 100,
                dataIndex: 'buildName'
            }, {
                title: '房间编号',
                width: 100,
                dataIndex: 'roomNumber'
            }, {
                title: '客户名称',
                width: 100,
                dataIndex: 'clientName'
            }, {
                title: '收费类型',
                width: 200,
                dataIndex: 'wattHourType',
                render: function (text, record, index) {
                    let dataIndex = '固定单价'
                    if (text.toString() === '1') {
                        dataIndex = '差额单价'
                    } else if (text.toString() === '2') {
                        dataIndex = '功峰平谷'
                    }
                    return (
                        <p>{dataIndex}</p>
                    )
                }
            }, {
                title: '本期电费周期',
                width: 200,
                dataIndex: 'cycle'
            }, {
                title: '本次用电量',
                width: 100,
                dataIndex: 'sumElectricity'
            }, {
                title: '本次应收',
                width: 100,
                dataIndex: 'thisReceivable'
            }, {
                title: ' 交费期限',
                width: 100,
                dataIndex: 'overdueDate'

            }]
        let info = this.info
        this.setState({
            ListBuildingInfo: ListBuildingInfo.data,
            loading: false,
            dataSource1: dataSource1,
            dataSource2: dataSource2,
            dataSource3: dataSource3,
            columns1: arr.slice().concat([{
                title: ' 操作',
                width: 200,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <a onClick={() => info(record.id)}>审核</a>
                        </span>
                    )
                }
            }]),
            columns2: arr.slice().concat([{
                title: '审核说明',
                width: 100,
                dataIndex: 'auditExplain'
            }, {
                title: '审核时间',
                width: 100,
                dataIndex: 'auditDate'
            }, {
                title: '审核人',
                width: 100,
                dataIndex: 'auditName'
            }, {
                title: ' 操作',
                width: 200,
                dataIndex: 'opt',
                render: function (text, record, index) {
                    return (
                        <span>
                            <Popconfirm />
                            <a onClick={() => info(record.id)}>明细</a>
                        </span>
                    )
                }
            }]),
            columns3: arr.slice().concat([{
                title: '实交日期',
                width: 100,
                dataIndex: 'principalCollectionDate'
            }, {
                title: '逾期天数',
                width: 100,
                dataIndex: 'overdueDays'
            }, {
                title: '延期下月电费',
                width: 100,
                dataIndex: 'penaltyType',
                render: function (text, record, index) {
                    let penaltyType = '否'
                    if (text.toString() === '1') {
                        penaltyType = '是'
                    }
                    return (
                        <p>{penaltyType}</p>
                    )
                }
            }, {
                title: '打印状态',
                width: 100,
                dataIndex: 'printStatus',
                render: function (text, record, index) {
                    let printStatus = '否'
                    if (text.toString() === '1') {
                        printStatus = '是'
                    }
                    return (
                        <p>{printStatus}</p>
                    )
                }
            }, {
                title: '开票状态',
                width: 100,
                dataIndex: 'principalPrincipalBilling',
                render: function (text, record, index) {
                    text = text ? text : ''
                    let billingState = '未开票'
                    if (text.toString() === '1') {
                        billingState = '已开票'
                    }
                    return (
                        <p>{billingState}</p>
                    )
                }
            }, {
                title: '操作',
                width: 200,
                render: function (text, record, index) {
                    let url = '/financial/CollectionPowerDetails/' + record.id
                    return (
                        <span>
                            <a href={url}>明细</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Popconfirm title="确定撤回吗?">
                                <a>撤回</a>
                            </Popconfirm>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a>打印单据</a>
                        </span>
                    )
                }
            }])
        })
    }
    info = (id) => {
        this.setState({
            openInfo: true,
            id: id
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({
            RowKeys: selectedRowKeys
        })
    }
    render () {
        return (
            <Spin spinning={this.state.loading}>
                <Tabs defaultActiveKey="1" onChange={this.refreshTwo}>

                    <TabPane tab="审核中" key="1">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={1}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            dataSource={this.state.dataSource1}
                            columns={this.state.columns1}
                        />
                    </TabPane>
                    <TabPane tab="审核失败" key="2">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={2}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            dataSource={this.state.dataSource2}
                            columns={this.state.columns2}
                        />
                    </TabPane>
                    <TabPane tab="审核成功" key="3">
                        <PowerBillHeadComponent
                            RowKeys={this.state.RowKeys}
                            refresh={this.refresh}
                            type={3}
                            order={this.state.order}
                            ListBuildingInfo={this.state.ListBuildingInfo}
                        />
                        <Table
                            rowSelection={{
                                onChange: this.onSelectChange
                            }}
                            scroll={{ x: 1450 }}
                            dataSource={this.state.dataSource3}
                            columns={this.state.columns3}
                        />
                    </TabPane>
                </Tabs>
                <PowerInfomation
                    id={this.state.id}
                    Finance={1}
                    visible={this.state.openInfo}
                    refresh={this.refreshTwo}
                />
            </Spin>

        )
    }
}

export default PowerBill
