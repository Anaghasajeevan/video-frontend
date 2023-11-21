
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../services/allapi'
import { Video } from 'react-feather'



function View({serverRes}) {

  const [allVideos,setAllVideos]=useState([])

  const[deleteStatus,setDeleteStatus]=useState(false)

 const getallVideos=async()=>{

  let response= await getVideo()

  // console.log(response.data);

  setAllVideos(response.data)
}

console.log(allVideos);

useEffect(() => {

  getallVideos()

 
}, [serverRes,deleteStatus])

const handleDeleteStatus=(res)=>{
setDeleteStatus(res)
}



  return (
    <div className='border p-3 rounded'>
   <Row>
   { 
   
   allVideos.map(Video=>(
    <Col className='ps-3 mb-3'sm={12} md={6}>
    <Videocard card={Video} handleDeleteStatus={handleDeleteStatus}/>
    </Col>
    
    ))
    
    }
   </Row>
    </div>
  )
}

export default View