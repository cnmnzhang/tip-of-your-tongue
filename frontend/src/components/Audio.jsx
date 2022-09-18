//import React from 'react'
import React, { Component } from 'react' 
import MicRecorder from 'mic-recorder-to-mp3'

//const Audio = () => {
  const Mp3Recorder = new MicRecorder({ bitRate: 128 });
  class Audio extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isRecording: false,
        blobURL: '',
        isBlocked: false,
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
    // download the audio to mp3 file
    downloadBlob = (blob) => {
      // link element
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      // set link's href to point to the blob url
      link.href = blobURL;
      link.download = "useraudio" + this.download_num + ".wav";
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
    }

    render() {
      return (
      <div class="Audio-class">
        <button onClick={this.start} disabled={this.state.isRecording}>
          Record
        </button>
        <button onClick={this.stop} disabled={!this.state.isRecording}>
          Stop
        </button>
        <audio src={this.state.blobURL} controls="controls" />
      </div>
      )
    
    }
  
}

export default Audio