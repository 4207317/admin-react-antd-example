import React from 'react'
import moneyLogo from '../../assets/images/money.png'
import {DatePicker} from 'antd'
import {apiPost} from '../../api/api.dev'
import moment from 'moment'
const { MonthPicker } = DatePicker
class HomeOtherFee extends React.Component {
    state = {
        otherFees: {
            rentPenal: 0,
            powerPenal: 0,
            waterPenal: 0,
            propertyPenal: 0,
            workWatch: 0
        }
    }
    componentWillReceiveProps (nextPorps) {
        this.setState({otherFees: nextPorps.otherFees})
    }
    componentDidMount () {
        this.setState({})
    }

    formatMoney = (number) => {
        if (number) {
            let negative = number < 0 ? '-' : ''
            let numberString = parseInt(number, 0)
            negative = negative + (numberString || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            return negative + '.' + number.toFixed(2).slice(-2)
        }
        return 0
    }
    loadData = async (date) => {
        let otherFeeData = await apiPost(
            '/otherFees',
            {
                startDate: date
            }
        )
        console.log(otherFeeData)
        this.setState({
            otherFees: {
                rentPenal: otherFeeData.data.otherFees.rentPenal > 0 ? otherFeeData.data.otherFees.rentPenal : 0,
                powerPenal: otherFeeData.data.otherFees.powerPenal > 0 ? otherFeeData.data.otherFees.powerPenal : 0,
                waterPenal: otherFeeData.data.otherFees.waterPenal > 0 ? otherFeeData.data.otherFees.waterPenal : 0,
                propertyPenal: otherFeeData.data.otherFees.propertyPenal > 0 ? otherFeeData.data.otherFees.propertyPenal : 0,
                workWatch: otherFeeData.data.otherFees.workWatch > 0 ? otherFeeData.data.otherFees.workWatch : 0
            }
        })
    }
    datePickerChange = (date, dateString)=> {
        console.log(dateString)
        this.loadData(dateString)
    }

    render () {
        const monthFormat = 'YYYY-MM'
        return (
            <div className="otherFee">
                <div className="otherFee-top">
                    <div className="otherFee-top-title">
                        其他费用
                    </div>
                    <div className="otherFee-top-picker">
                        选择月份：<MonthPicker onChange={this.datePickerChange} defaultValue={moment('2017-08', monthFormat)} format={monthFormat} placeholder="请选择月份" />
                    </div>
                </div>
                <div className="otherFee-bottom" >
                    <div className="otherFee-bottom-left">
                        <div className="otherFee-bottom-left-box">
                            <img className="otherFee-bottom-image" src={moneyLogo} alt="" />
                        </div>
                    </div>
                    <div className="otherFee-bottom-right">
                        <div className="otherFee-bottom-right-parent" >
                            <div className="otherFee-bottom-right-child" >
                                <div className="otherFee-bottom-right-child-title">租金违约金</div>
                                <div className="otherFee-bottom-right-child-subtitle">{this.formatMoney(this.state.otherFees.rentPenal)}</div>
                            </div>
                            <div className="otherFee-bottom-right-child" >
                                <div className="otherFee-bottom-right-child-title">电费违约金</div>
                                <div className="otherFee-bottom-right-child-subtitle">{this.formatMoney(this.state.otherFees.powerPenal)}</div>
                            </div>
                            <div className="otherFee-bottom-right-child" >
                                <div className="otherFee-bottom-right-child-title">水费违约金</div>
                                <div className="otherFee-bottom-right-child-subtitle">{this.formatMoney(this.state.otherFees.waterPenal)}</div>
                            </div>
                            <div className="otherFee-bottom-right-child" >
                                <div className="otherFee-bottom-right-child-title">物业费违约金</div>
                                <div className="otherFee-bottom-right-child-subtitle">{this.formatMoney(this.state.otherFees.propertyPenal)}</div>
                            </div>
                            <div className="otherFee-bottom-right-child" >
                                <div className="otherFee-bottom-right-child-title">施工监管费</div>
                                <div className="otherFee-bottom-right-child-subtitle">{this.formatMoney(this.state.otherFees.workWatch)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeOtherFee
