import PieChart from '@/components/graphs/PieChart'
import React from 'react'

const page = () => {
    const labels = ['Available','Not Available', 'Off work'];
    const data = [300, 50, 100];
    const backgroundColor = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];

  return (
    <div className='w-[400px] h-[400px]'>
         <PieChart labels={labels} data={data} background={backgroundColor}></PieChart>
    </div>
   
  )
}

export default page