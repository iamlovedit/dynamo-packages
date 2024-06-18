import React from 'react'
import './index.css'

export interface Props {
  content: number;
  title: string;
}

function Overview({content,title}:Props) {
  return (
    <div>
            <p className='stat-metric'>
                {content}
            </p>
            <p className='stat-title'>
                {title}
            </p>
    </div>
  )
}
export default Overview