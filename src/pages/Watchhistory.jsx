
import React, { useEffect, useState } from 'react'
import { getWatchhistory } from '../services/allapi'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'



function Watchhistory() {
const [History,setHistory] = useState([])

const getHistroy = async()=>{
  let {data}= await getWatchhistory()

  setHistory(data)

}
console.log(History)
useEffect(() => {
  getHistroy()

 
}, [])







  return (
    <>
    <div className='d-flex justify-content-center align-utems-center'>
    <h1 className='me-5 '>watch shitory</h1>

    <Link to={'/home'} style={{textDecoration:'none',fontSize:'20px',color:'blue',fontWeight:'bolder'}}> <span><ArrowLeft/></span>
    Back</Link>
    </div>

    <table className='table-shadow border rounded m-3'>

      <thead>
        <tr>
          <th>NO</th>
          <th>Name</th>
          <th>url</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
       {

        History?.map((item,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{item.cardName}</td>
            <td>{item.url}</td>
            <td>{item.Date}</td>
          </tr>
       ))}
      </tbody>

    </table>
    </>
  )
}

export default Watchhistory