import React, { Component } from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';

class Audio extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null
    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }

  onStop = (audioData) => {
    console.log('audioData', audioData);
    this.downloadBlob(audioData);
  }

  download_num = 1;
  // download the audio to mp3 file
  downloadBlob = (audioData) => {
    const blob = audioData["blob"];
    const blobURL = audioData["url"];

    // link element
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
    const { recordState } = this.state

    return (
      <div className='App-audio'>
        <div>
          <AudioReactRecorder
            state={recordState}
            onStop={this.onStop}
            canvasWidth='0'
            canvasHeight='0'
          />
          
          <button onClick={this.start}>
            Start Recording
          </button>
          <button onClick={this.stop}>
            Stop Recording
          </button>
        </div>
      </div>
    )
  }
}

export default Audio