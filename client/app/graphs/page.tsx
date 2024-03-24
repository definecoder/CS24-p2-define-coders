import BarChart from '@/components/graphs/BarChart';
import PieChart from '@/components/graphs/PieChart'
import React from 'react'

const page = () => {
  // pie chart datas
    const labels = ['Available','Not Available', 'Off work'];
    const data = [300, 50, 100];
    const backgroundColor = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];


    //bar chart datas
    const barLabels = ['Boishakh', 'Joistho', 'March', 'April', 'May', 'June', 'July']; 
    const barData = [165, 159, 80, 81, 56, 55, 40]; 
    const barBackgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)',
    ];

    const barBorderColor = [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
    ];

  return (
    <div className='w-[400px] '>
         <PieChart labels={labels} data={data} background={backgroundColor}></PieChart>
         <BarChart labels={barLabels} data={barData} backgroundColor={barBackgroundColor}
         borderColor={barBorderColor}
         ></BarChart>
    </div>
   
  )
}

export default page