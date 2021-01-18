import React, { useState } from 'react';
import useSpeechSynthesis from './Speech';


import { Button} from "react-bootstrap";
const TTS = () => {
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  const styleFlexRow = { display: 'flex', flexDirection: 'row' , color:'blue',textAlign:'center',fontWeight:600};
  const styleContainerRatePitch = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
    color:'blue',textAlign:'center',fontWeight:600
  };

  return (
    <div>
      <form>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <p style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>
              Type a message below then click 'Speak'.</p>
              <p style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}>   Text will be converted into audio.
               
            </p>
            <p style={{color:'blue',textAlign:'center',padding:10,fontWeight:600}}> 
            <label htmlFor="voice">Voice</label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ''}
              onChange={(event) => {
                setVoiceIndex(event.target.value);
              }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>
            </p>
            <div style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="rate">Rate: </label>
                <div className="rate-value">{rate}</div>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                defaultValue="1"
                step="0.1"
                id="rate"
               
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="pitch">Pitch: </label>
                <div className="pitch-value">{pitch}</div>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                defaultValue="1"
                step="0.1"
                id="pitch"
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div>
            <label htmlFor="message" style={{color:'blue',textAlign:'center',padding:10,fontWeight:600,width:'100%'}}>Message</label>
           <br/>
            <textarea style={{color:'blue',textAlign:'center',padding:10,fontWeight:600,width:'100%'}}
              id="message"
              name="message"
              rows={3}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            {speaking ? (
             <Button variant="primary" style={{display:'flex',margin:'auto'}}  type="button" onClick={cancel}>
                Stop
              </Button>
            ) : (
              <Button variant="primary" style={{display:'flex',margin:'auto'}}
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                Speak
              </Button>
            )}
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default TTS;