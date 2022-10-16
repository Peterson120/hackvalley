import React, { useRef, useState} from 'react';
// import '../Cam.css';
// import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import Container from 'react-bootstrap/Container';
// import { useSpeechSynthesis } from "react-speech-kit";

// const videoConstraints = {
//     width: 440,
//     height: 400,
//     facingMode: "user"
// };

export default function Cam() {
    // const webcamRef = React.useRef(null);
    // const [text, setText] = useState("");
    const image_ref = useRef(null);
    const msg = new SpeechSynthesisUtterance();

    async function speech(txt) {
        txt = txt.replace(/ +/g, ' ');
        console.log('speech: ' + txt);
        msg.text = txt;
        window.speechSynthesis.speak(msg);
    }
    
    // async function correct(txt) {
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    //             'X-RapidAPI-Host': 'jspell-checker.p.rapidapi.com'
    //         },
    //         body: '{"language":"enUS","fieldvalues":"thiss is intresting","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}'
    //     };
        
    //     fetch('https://jspell-checker.p.rapidapi.com/check', options)
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err));
    // }

    async function text_rec() {

        const {data: {text}} = await Tesseract.recognize(
            image_ref,
            'eng',
            { logger: m => console.log(m) }
        );
        console.log(text);
        speech(text);
    }

    return (
        <Container style={{marginTop: "40px", marginBottom: "40px", justifyContent: "center", alignItems: "center", display: "flex"}}>
            <div className="App">
                <main className="App-main">
                    <h1>Extracted text</h1>
                    <img
                        width="600"
                        height="400"
                        alt="stream"
                        src="http://192.168.4.1/mjpeg/1"
                        ref={image_ref}
                    />
                    <button onClick={text_rec} style={{height:50}}> convert to text</button>
                </main>
            </div>
        </Container>
    );
}
