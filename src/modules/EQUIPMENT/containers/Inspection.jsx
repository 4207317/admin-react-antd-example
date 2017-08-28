// 设备管理 - 设备巡检
import React from 'react'
import '../style/Inspection.less'
import airConditionerLogo from '../../../assets/images/Inspection/airConditioner.png'
import waterHeatingLogo from '../../../assets/images/Inspection/waterHeating.png'
import electricityLogo from '../../../assets/images/Inspection/electricity.png'
import elevatorLogo from '../../../assets/images/Inspection/elevator.png'
import fireStationLogo from '../../../assets/images/Inspection/fireStation.png'
class Inspection extends React.Component {
    state= {
        li1: 'pro-list pro-list active js-pro-list',
        li2: 'pro-list pro-list js-pro-list',
        li3: 'pro-list pro-list js-pro-list',
        li4: 'pro-list pro-list js-pro-list',
        li5: 'pro-list pro-list js-pro-list',
        titles1: ['配电房记录', '弱电间记录', '发电机记录'],
        titles2: ['电梯机房', '日常巡检'],
        titles3: ['空调机房', '新风机房', '中央空调'],
        titles4: ['热交换设备', '水暖管道', '水暖基建', '太阳能巡检', '换热站巡检'],
        titles5: ['高位消防水箱', '气体灭火巡检', '消防维保记录'],
        urls1: ['distributionRoom', 'WeakRoom', 'GeneratorLog'],
        urls2: ['ElevatorRoom', 'DailyInspection'],
        urls3: ['AirConditioningRoom', 'NewWindRoom', 'CentralAirConditioning'],
        urls4: ['HeatExchange', 'PlumbingPipeline', 'PlumbingInfrastructure', 'GeneratorLog', 'HeatTransferStation'],
        urls5: ['WaterTank', 'GasFireExtinguishing', 'MaintenanceRecords'],
        iconBackGound1: {backgroundColor: '#2fb26a'},
        iconBackGound2: {backgroundColor: '#31A324'},
        iconBackGound3: {backgroundColor: '#27ACE1'},
        iconBackGound4: {backgroundColor: '#E8942D'},
        iconBackGound5: {backgroundColor: '#D62119'}
    }
    defaultState = () => {
        const defaultClassName = 'pro-list pro-list js-pro-list'
        this.setState({
            li1: defaultClassName,
            li2: defaultClassName,
            li3: defaultClassName,
            li4: defaultClassName,
            li5: defaultClassName,
            iconBackGound1: {backgroundColor: '#152678'},
            iconBackGound2: {backgroundColor: '#31A324'},
            iconBackGound3: {backgroundColor: '#27ACE1'},
            iconBackGound4: {backgroundColor: '#E8942D'},
            iconBackGound5: {backgroundColor: '#D62119'}
        })
    }
    themeGreen = () => {
        return {backgroundColor: '#2fb26a'}
    }
    activeClassName = () => {
        return 'pro-list pro-list active js-pro-list'
    }
    move1 = (e) => {
        this.defaultState()
        this.setState({
            li1: this.activeClassName(),
            iconBackGound1: this.themeGreen()
        })
    }
    move2 = (e) => {
        this.defaultState()
        this.setState({
            li2: this.activeClassName(),
            iconBackGound2: this.themeGreen()
        })
    }
    move3 = (e) => {
        this.defaultState()
        this.setState({
            li3: this.activeClassName(),
            iconBackGound3: this.themeGreen()
        })
    }
    move4 = (e) => {
        this.defaultState()
        this.setState({
            li4: this.activeClassName(),
            iconBackGound4: this.themeGreen()
        })
    }
    move5 = (e) => {
        this.defaultState()
        this.setState({
            li5: this.activeClassName(),
            iconBackGound5: this.themeGreen()
        })
    }

    pushNewPage = (url) => {
        this.props.history.push(url)
    }
    render () {
        return (
            <div>
                <div>
                    <h1 className="h1-title">查看设备巡检情况入口</h1>
                </div>
                <div style={{marginTop: '50px'}} className="idx_box_wp index-product">
                    <div className="pro-content">
                        <ul className="clearfix first-ul">
                            <li className={this.state.li1} onMouseOver={this.move1}>
                                <Card pushNewPage={this.pushNewPage} title="电器系统" logo={electricityLogo} urls={this.state.urls1} titles={this.state.titles1} bgColor={this.state.iconBackGound1} />
                            </li>
                            <li className={this.state.li2} onMouseOver={this.move2}>
                                <Card pushNewPage={this.pushNewPage} title="电梯系统" logo={elevatorLogo} urls={this.state.urls2} titles={this.state.titles2} bgColor={this.state.iconBackGound2} />
                            </li>
                            <li className={this.state.li3} onMouseOver={this.move3}>
                                <Card pushNewPage={this.pushNewPage} title="空调系统" logo={airConditionerLogo} urls={this.state.urls3} titles={this.state.titles3} bgColor={this.state.iconBackGound3} />
                            </li>
                            <li className={this.state.li4} onMouseOver={this.move4}>
                                <Card pushNewPage={this.pushNewPage} title="水暖系统" logo={waterHeatingLogo} urls={this.state.urls4} titles={this.state.titles4} bgColor={this.state.iconBackGound4} />
                            </li>
                            <li className={this.state.li5} onMouseOver={this.move5}>
                                <Card pushNewPage={this.pushNewPage} title="消防系统" logo={fireStationLogo} urls={this.state.urls5} titles={this.state.titles5} bgColor={this.state.iconBackGound5} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Inspection

function Card (props) {
    let list = (arr, urls) => {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            res.push(<li><a className="main-li-a" onClick={() => props.pushNewPage(urls[i])}>{arr[i]}</a></li>)
        }
        return res
    }
    return (
        <div className="con-card">
            <div className="card-t">
                <div className="icon-box" style={props.bgColor}>
                    <img className="card-icon" src={props.logo} alt="" />
                </div>
                <h3>{props.title}</h3>
            </div>
            <div className="card-about">
                <ul>
                    {list(props.titles, props.urls)}
                </ul>
            </div>
        </div>
    )
}
