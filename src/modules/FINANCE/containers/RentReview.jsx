// 收费管理 - 应收租金
import React from 'react'
import { Tabs } from 'antd'
import CollectRentFinanceConduct from './CollectRent/CollectRentFinanceConduct'
import CollectRentFinanceFail from './CollectRent/CollectRentFinanceFail'
import CollectRentFinanceSuccess from './CollectRent/CollectRentFinanceSuccess'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class RentReview extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    callback = (key) => {
        console.log(key)
    }
    render () {
        return (<Tabs defaultActiveKey="1" onChange={() => this.callback}>
            <TabPane tab="待审核" key="1"><CollectRentFinanceConduct pro={this.props} /></TabPane>
            <TabPane tab="审核失败" key="2"><CollectRentFinanceFail pro={this.props} /></TabPane>
            <TabPane tab="审核成功" key="3"><CollectRentFinanceSuccess pro={this.props} /></TabPane>
        </Tabs>
        )
    }
}
export default RentReview


