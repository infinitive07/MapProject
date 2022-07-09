import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import expenditureData from './expenditure.json';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChartComponent = ({ value }) => {
    let filterexpnditureData;
    let LableData;
    let dataVal;
    let data = {};
    let options = {}
    if (value) {
        filterexpnditureData = expenditureData.find(el => el.pincode === value.attributes.pincode);
        if (filterexpnditureData != undefined || filterexpnditureData != null) {
            debugger;
            LableData = Object.keys(filterexpnditureData);
            LableData = LableData.slice(0, LableData.length - 1)
            dataVal = Object.values(filterexpnditureData);
            dataVal = dataVal.slice(0, dataVal.length - 1)
            dataVal = dataVal.map(item => Math.round(item));
        }



        options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                },
            },
        };
        data = {
            labels: LableData,
            datasets: [{
                label: 'expenditure' + ' ' + value.attributes.pincode,
                data: dataVal,

                backgroundColor: [
                    '#96b6d2',
                ],
                borderColor: [
                    '#96b6d2',
                ],
                borderWidth: 1
            }]
        };
    }
    return (
        <>
            {(() => {
                if (dataVal) {
                    return (
                        <div style={{  margin: 'auto' }}>
                        <Bar options={options} data={data} />
                        </div>
                    )
                }
                else {
                    return (
                        <>
                            <h2 style={{ textAlign: 'center',color:'#85c6ff' }}>No Data Available</h2>
                            <h6 style={{ textAlign: 'center',color:'#85c6ff' }}>expenditure {value ? value.attributes.pincode:''}</h6>
                        </>
                    )
                }

            })()}
        </>
    )

}
export default BarChartComponent;