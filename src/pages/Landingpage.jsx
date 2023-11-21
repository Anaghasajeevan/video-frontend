
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Landingpage() {


    // call useNavigate() hook

    const navigate=useNavigate()
    const handleNavigate=()=>{

      // navigate to home page
      navigate('/home')
      
    }


  return (
    <div>
     <Row className='align-items-center'>
        <Col></Col>
        <Col lg={6}>
            <h1 style={{textAlign:'justify'}}>Welcome to Videoo.com</h1>
            <p>Where user can use their favourite videos user can upload any youtube videos by copy
                paste their url . Videoo.com will allow to add and remove their uploaded videos and
                also arrange them in different categoried by drag and drop.it is free.try it now...!!!!!
                </p>
                <button onClick={handleNavigate} className='btn btn-primary'>Click here to know more!!!</button>
        </Col>
        <Col lg={4}>
            <img className='img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpfPPKHyTXk5sp112gksP2wDXucwZkuDTGhQ&usqp=CAU" alt="" />
        </Col>
        <Col></Col>
     </Row>
    </div>
  )
}

export default Landingpage