import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import incomeData from './income.json';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ value }) => {
    let filterIncomeData;
    if (value) {
        filterIncomeData = incomeData.find(el => el.locality === value.attributes.locality);
        console.log(incomeData);
        console.log(filterIncomeData)
    }
   const options = {
        responsive: true,
        plugins: {
            title: {
                position: 'bottom',
                display: true,
                text: 'Monthly Income Distribution',
            },
        },
    };
    const state = {
        labels: [filterIncomeData != undefined ? filterIncomeData.locality : ''],
        datasets: [
            {
                // label: 'Rainfall',
                backgroundColor: [
                    '#96b6d2',

                ],
                hoverBackgroundColor: [
                    '#96b6d2',
                ],
                data: [filterIncomeData != undefined ? filterIncomeData.income : ''],
                fill: false
            }
        ]
    }
    return (
        <>
            <div>
                {(() => {
                    if (filterIncomeData != undefined) {
                        return (
                            <div style={{ width: '300px', margin: 'auto' }}>
                                <Pie data={state} options={options}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <>
                                <h2 style={{ textAlign: 'center',color:'#85c6ff' }}>No Data Available</h2>
                                <h6 style={{ textAlign: 'center',color:'#85c6ff' }}>Monthly Income Distribution</h6>
                            </>
                        )
                    }
                })()}
            </div>
        </>
    )
}

export default PieChartComponent;