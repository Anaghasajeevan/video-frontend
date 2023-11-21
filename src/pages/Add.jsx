import React from 'react'
import { PlusCircle } from 'react-feather'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
// import { upload } from '@testing-library/user-event/dist/upload';
import { addVideo } from '../services/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleRes}) {

  const [UploadData, setuploadData] = useState({
    id: "", caption: "", thumpnail: "", url: ""



  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e) => {

    const { name, value } = e.target

    // console.log(e.target.value);

    //  (...) is called spread operator / 

    setuploadData({ ...UploadData, [name]: value })
  }
  console.log(UploadData);

  // original url : 

  const extracturl = (e) => {
    let youtubeurl = e.target.value
    if (youtubeurl.includes("v=")) {

      let index = youtubeurl.indexOf("v=")
      console.log(index);

      let videourl = youtubeurl.substring(index + 2, index + 13)
      console.log(videourl);

      let videoData = UploadData

      videoData.url = `http://www.youtube.com/embed/${videourl}`
      setuploadData(videoData)

    }

    console.log(UploadData);

  }


  //define handleAdd

  const handleAdd = async () => {

    // destructure upload data state 

    const { id, caption, thumpnail, url } = UploadData

    if (!id || !caption || !thumpnail || !url) {
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
    else {

      const response = await addVideo(UploadData)

      if (response.status >= 200 && response.status < 300) {

        handleRes(response.data)
        toast.success("succesfully added", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

        })
        setShow(false)

      }
      else {
        toast.warn("please provide the unique id", {
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

    }

  }

  return (
    <>
      <div onClick={handleShow}>
        <PlusCircle color='blue' size={90} />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Uploading video id">
              <Form.Control type="text" placeholder="Video id" name='id' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading video id">
              <Form.Control type="text" placeholder="Video caption" name='caption' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingImage" label="Uploading video cover image url">
              <Form.Control type="text" placeholder="Video cover image url" name='thumpnail' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingLink" label="Uploading video link">
              <Form.Control type="text" placeholder="Video Link" name='url' onChange={extracturl} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
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

export default Add




// https://www.youtube.com/watch?v=nYEoxne_20Y&pp=ygURbmVlbGEgbmlsYXZlIHNvbmc%3D

// https://youtu.be/tYm_Zq5yKFo