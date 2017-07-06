// 维修项目 - 详情
import React from 'react'
import '../../../../style/test.less'
import { apiPost } from '../../../../api'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            'upkeep/getRepair',
            {'id': this.props.match.params.id}
        )
        let Repair = resulData.data
        let j = 0
        Repair['repairProjectList'] = Repair.repairProjectList.map(RepairProject => {
            if (RepairProject !== null) {
                j++
                let roomType = '自有'
                if (RepairProject.roomType === 1) {
                    roomType = '出售'
                }
                return <tr key={j}><td>{RepairProject.id}</td><td>{roomType}</td><td>{RepairProject.materialName}</td> <td>{RepairProject.number}</td><td>{RepairProject.money}</td></tr>
            } else {
                return null
            }
        })
        this.setState({
            data: Repair
        })
    }
    componentWillMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <div className="box3">
                <h2>维修项目</h2>
                <p>
                    <b>发起人：</b>{this.state.data.repairedMan}
                </p>
                <p>
                    <b>发起日期：</b>{this.state.data.startDate}
                </p>
                <table className="tb">
                    <tbody>
                        <tr className="hd">
                            <td>序号</td>
                            <td>房屋性质</td>
                            <td>材料名称</td>
                            <td>数量</td>
                            <td>收费小计</td>
                        </tr>
                        {this.state.data.repairProjectList}
                    </tbody>
                </table>
                <p>
                    <b>应收金额：</b> {this.state.data.amountMoney} 元
                </p>
            </div>
        )
    }
}
export default App

