import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import useSpeechRecognition from '../components/useSpeechRecognition';
import TTS from '../components/useSpeechSythesis';
import axios from 'axios'
import faker from "faker"

import {Container, Form, FormControl, FormLabel, Button} from "react-bootstrap";
const languageOptions = [
  { label: 'Cambodian', value: 'km-KH' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'English', value: 'en-AU' },
  { label: 'Farsi', value: 'fa-IR' },
  { label: 'Français', value: 'fr-FR' },
];

const Home = () => {
  const [users, setUsers] = useState(null)
  const [caption, setCaption] = useState(null)
  const today = new Date()
  const timestamp = today.toISOString()
  const [lang, setLang] = useState('en-AU');
  const [value, setValue] = useState('');
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    // You could do something here after listening has finished
  };

  const onResult = (result) => {
    setValue(result);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  let id = faker.random.uuid()
  let descendingUsers

  //auto populating with dummy data
  const addData = async () => {
    await axios.post('/.netlify/functions/addData')
  }
  const fetchData = async () => {
    const results = await axios.get('/.netlify/functions/posts')
    console.log(results.data)
    setUsers(results.data)
  }

  useEffect(() => {
    addData()
    fetchData()
    
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()

    const data =  {
        id: id,
        caption: value,
        timestamp: timestamp
      }

      axios.post('/.netlify/functions/add', data)
      .then((response) => {
      console.log(response)
      })
    .catch((err) => {
      console.error(err)
  })

  window.location.reload();
  }
  if (users) {
    descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1) 
  }

  return (
    <>
    {descendingUsers && (
     <Container style={{backgroundColor:' #def3f3'}}>
        <div className='col4'>
      
      <form id="speech-recognition-form">
        <h2 style={{color:'blue',textAlign:'center',padding:10,fontWeight:800}}>Speech Recognition</h2>
        {!supported && (
         
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Recognition.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <p style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>Click 'Start Recognition' and start speaking.</p>
               <p style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>Audio will be converted into text.</p> 
               <p style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>Text will be displayed in textarea.</p>
              <p  style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>
              <label htmlFor="language"> Choose Language </label>
           
                  <select
                       form="speech-recognition-form"
                       id="language"
                       value={lang}
                       onChange={changeLang}
                     > 
                       {languageOptions.map((option) => (
                         <option key={option.value} value={option.value}>
                           {option.label}
                         </option>
                       ))}
                  </select> 
              </p>
            
            <label htmlFor="transcript" style={{color:'blue',textAlign:'center',padding:10,fontWeight:600,width:'100%'}}>Displays text generated after converting audio of choosen language into text</label>
          
            <textarea style={{color:'blue',textAlign:'center',padding:10,fontWeight:600,width:'100%'}}
              id="transcript"
              name="transcript"
              placeholder="Waiting to take notes ..."
              value={value}
              rows={10}
            />
            <br/>
            <Button variant="primary" style={{display:'flex',margin:'auto'}} onClick={toggle} disabled={blocked} >   {listening ? 'Stop Recognition' : 'Start Recognition'}</Button>
           
            {blocked && (
              <p style={{ color: 'red' }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
          </React.Fragment>
        )}
        <br/>
        <Button variant="primary" style={{display:'flex',margin:'auto'}}  onClick={handleSubmit} >Post</Button>
      </form>
       
        </div>
        <div className='col4' style={{padding:10}}>
          <h2 style={{color:'blue',textAlign:'center',padding:10,fontWeight:800}}>Displaying Notes Stored</h2>
        <div className='feed'>
          {descendingUsers.map((descendingUser, index) => (
            <Card
              key={index}
              user={descendingUser}
            />
          ))}
        </div>
          </div>
          <div className='col4'>
            <h2  style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>Text Area for Asking Questions</h2>
<TTS/>
            
          </div>   
         
      </Container>
      )}
    </>
  )
}

export default Home