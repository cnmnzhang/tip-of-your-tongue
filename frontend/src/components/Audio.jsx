//import React from 'react'
import React, { Component, setState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { ReactComponent as Microphone} from '../icons/microphone.svg';
import { ReactComponent as Stop} from '../icons/stop.svg';
import axios from "axios";

//const Audio = () => {
  const Mp3Recorder = new MicRecorder({ bitRate: 128 });
  class Audio extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isRecording: false,
        blobURL: '',
        isBlocked: false,
        transcript: ""
      }
      
    }

    componentDidMount() {
      navigator.getUserMedia({ audio: true },
        () => {
          console.log('Permission Granted');
          this.setState({ isBlocked: false });
        },
        () => {
          console.log('Permission Denied');
          this.setState({ isBlocked: true })
        },
      );
    }
    
    start = () => {
      if (this.state.isBlocked) {
        console.log('Permission Denied');
      } else {
        
        Mp3Recorder
          .start()
          .then(() => {
            this.setState({ isRecording: true });
          }).catch((e) => console.error(e));
      }
    };

    stop = () => {
      Mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob)
          this.setState({ blobURL, isRecording: false });
          this.downloadBlob(blob);
        }).catch((e) => console.log(e));
      
        
    };

    download_num = 1;
    p = "useraudio" + this.download_num + ".mp3";

    // download the audio to mp3 file
    downloadBlob = (blob) => {
      // link element
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      // set link's href to point to the blob url
      link.href = blobURL; 
      link.download = this.p;
      this.download_num += 1;

      // append link to body
      document.body.appendChild(link);

      // dispatch click event on the link
      // necessary bc link.click() doesn't work for firefox
      link.dispatchEvent(
          new MouseEvent('click', {
              bubblies: true,
              cancelable: true,
              view: window
          })
      );

      // remove link from body
      document.body.removeChild(link);

      // send downloaded file to AssemblyAI for
      // transcription
      this.getData();
    }

    //i = 0;
    getData() {
      setTimeout(() => {console.log("Waiting")}, 10000)
      // allow file 6, 2s intervals to finish downloading
      // before deciding that there was an error
      console.log("getData()")
      //while (this.i < 6) {
        axios({
          method: "GET",
          url: `http://127.0.0.1:5000/transcribe/${this.p}`,
        })
          .then((response) => {
            this.setState({ transcript: response });
            //this.i += 6;
            console.log("success")
          }).catch((error) => {
            if (error.response) {
              // console.log(error.response)
              // console.log(error.response.status)
              // console.log(error.response.headers)
              console.log("error")
              //this.i++;
              setTimeout(() => {console.log(this.i)}, 2000)
            }
          })
      //}
    };
  
  

    render() {
      return (
      <div class="Audio-class">
        <button onClick={this.start} disabled={this.state.isRecording}>
          
        <Microphone />
        </button>
        <button onClick={this.stop} disabled={!this.state.isRecording}>
          
        <Stop />
        </button>
        <audio src={this.state.blobURL} controls="controls" />
        {this.state.transcript != "" && <div dangerouslySetInnerHTML={{ __html: this.state.transcript}} />}
      </div>
      
      )
    
    }
  
};

export default Audio