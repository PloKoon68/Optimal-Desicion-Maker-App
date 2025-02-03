import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function PieChart({results, products}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        const colors = ['--blue-500', '--yellow-500', '--green-500', '--purple-500', '--red-500', '--orange-500', '--cyan-500', '--pink-500', '--teal-500', '--lime-500', '--amber-500', '--indigo-500', '--gray-500']
        const data = {
            labels: results.labels,
            datasets: [
                {
                    data: results.scores,
                    backgroundColor:  colors.map((color) => documentStyle.getPropertyValue(color)),
                    hoverBackgroundColor: colors.map((color) => documentStyle.getPropertyValue(color))
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [results]);

    return (
        <div style={{backgroundColor: "pink"}} className="card flex justify-content-center">
            <Chart   type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
        