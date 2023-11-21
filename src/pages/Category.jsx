
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getVideos, getallCategory, updateCategory } from '../services/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';




function Category() {

  const[allCategory,setallCategory]=useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  const[categaryItem,setCategoryItem]=useState({

    id:"",
    name:"",
    allVideos:[]
  })

  const addCategoryForm=(e)=>{

    const {name,value}=e.target
    setCategoryItem({...categaryItem,[name]:value})
  }

  console.log(categaryItem);

  const hanldeAddCategory=async(e)=>{


    e.preventDefault()
    const {id,name}=categaryItem

    if(!id||!name){

       toast.warn("please fill the form completely", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      })
    }
    else
    {
  let response=await addCategory(categaryItem)
  toast.success("category add successfully")

  console.log(response);
  getCategoryList()
  setShow(false)
    }
 
  }


  // get all Category 

  const getCategoryList=async()=>{
    const response= await getallCategory()
    console.log(response.data);
    setallCategory(response.data)
  }

  console.log(allCategory);

  useEffect(()=>{
    getCategoryList()
  }, [])

  const handleDeleteCategory=async(e,id)=>{
    e.preventDefault()
    console.log(id);

    await deleteCategory(id)
    getCategoryList()
  }
  
  const dragover=e=>{
    e.preventDefault()
    console.log("drag over the category board !!!!");


    
  }

  const dropped= async (e,categoryId)=>{
    console.log(categoryId);

    let sourceCardId=e.dataTransfer.getData("cardId")
    console.log("source card id",sourceCardId);


    // logic to implement card in the given category

    let {data}= await getVideos(sourceCardId)

    // console.log(response);

    console.log('source video data',data);


    let selectedCategory=allCategory.find(item=>item.id==categoryId)

    console.log("target category details",selectedCategory);

    selectedCategory.allVideos.push(data)

    console.log('updated target category details',selectedCategory);

    await updateCategory(categoryId,selectedCategory)

    getCategoryList()




  }


  return (
   

    <>
    <div className="d-grid">
      <div onClick={handleShow} className='btn btn-dark m-2'>
        Add Category
      </div>
    </div>

    {
      allCategory?.map(item=>(
        <div droppable onDragOver={e=>dragover(e)}
        
        onDrop={e=>dropped(e,item?.id)}
        
        className='d-flex justify-content-between border rounded mt-2 p-3'>
          <h4>{item.name}</h4>


          <span onClick={e=>handleDeleteCategory(e,item?.id)}> <Trash2 color='red'/></span>

          <Row>

            {
              item?.allVideos.map((card)=>(
                <Col className='p-3 mb-1 sm={12}'>

                  <Videocard card={card} insideCategory={true} /> 

              </Col>
              ))
            }

          </Row>

          </div>
      ))
    }

    


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title> 
        </Modal.Header>
        <Modal.Body>

        <FloatingLabel className='mb-3' controlId="floatingLink" label="Id">
        <Form.Control type="text" name='id' onChange={addCategoryForm} placeholder="Id" />
      </FloatingLabel>

      <FloatingLabel className='mb-3' controlId="floatingLink" label="category">
        <Form.Control type="text" name='name' onChange={addCategoryForm} placeholder="categary" />
      </FloatingLabel>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={hanldeAddCategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
   
  )
}

export default Category