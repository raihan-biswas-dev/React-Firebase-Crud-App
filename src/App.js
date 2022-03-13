import { useState, useEffect } from 'react';

import { db } from './firebaseConfig';
import style from './style.module.css'

import { Container, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash, App as AppIcon, PersonFill, BookmarkStar } from 'react-bootstrap-icons';

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';





function App() {

  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [updateDesignation, setUpdateDesignation] = useState('');
  const address = collection(db, "useer")

  useEffect(() => {
    let storedData = async () => {
      let info = await getDocs(address);

      setUser(info.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    storedData();
  }, [])


  const handleDataPost = async () => {
    await addDoc(address, { name, designation })
  }


  const handleUpdateDesignation = async (id) => {
    let prevAddress = doc(db, "useer", id)
    await updateDoc(prevAddress, { designation: updateDesignation })
  }

  const handleDelete = async (id) => {
    let prevAddress = doc(db, "useer", id)
    await deleteDoc(prevAddress)
  }

  return (
    <div className={style.main}>
      <Container>
      <h1 className={style.heading}> <AppIcon /> CRUD Application</h1>
        <Row>
          <Col xs={12} sm={6} lg={12} md={12}>
            <div className={style.inputFild}>
              <input className={style.innerInput} required={true} type="text" name='name' placeholder='name' onChange={e => setName(e.target.value)} />

              <input className={style.innerInput} required={true} type="text" name='designation' placeholder='designation' onChange={e => setDesignation(e.target.value)} />

              <Button className={style.pstBtn} onClick={handleDataPost}>Post</Button>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={12} md={12}>
            <div className={style.inputData}>
              {
                user.map((info, index) => (
                  <div key={index}>
                    <h4 className={style.name}>< PersonFill /> {info.name}</h4> <p className={style.designation}><BookmarkStar /> {info.designation}</p>

                    <input className={style.innerInput} type="text" required={true} name='updateDesignation' placeholder='update designation' onChange={e => setUpdateDesignation(e.target.value)} />

                    <Button className={style.updateBtn} onClick={() => (handleUpdateDesignation(info.id))}>update</Button>
                    <Button className={style.updateBtn} onClick={() => (handleDelete(info.id))}> <Trash /></Button>
                  </div>
                ))
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
