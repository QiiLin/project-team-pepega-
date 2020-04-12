import React from 'react'
import MicRecorder from 'mic-recorder-to-mp3';
import { Button } from "@material-ui/core";
import AdjustIcon from '@material-ui/icons/Adjust';
import StopIcon from '@material-ui/icons/Stop';
import "../style/Main.css"
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

/**
 * This create the Recorder interface to record user voice
 */
class SingleRecorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        };
    }
    // Setting up start function to start the recording
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

    // Setting up stop function to save the file
    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                this.setState({ blobURL, isRecording: false });
                console.log("blobURL: ", blobURL)
                const file = new File(buffer, "record.mp3", {
                    type: blob.type,
                    lastModified: Date.now()
                });
                console.log("file: ", file);
                this.props.saveMP3(file);
            }).catch((e) => console.log(e));
    };

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true },
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

    render() {
        return (
            <div >
                <header className="allignBase" >
                    <audio src={this.state.blobURL} controls="controls" style={{ width: 600 }} />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<AdjustIcon />}
                        disabled={this.state.isRecording}
                        onClick={this.start}>
                        Record
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<StopIcon />}
                        disabled={!this.state.isRecording}
                        onClick={this.stop}>
                        Stop
                    </Button>
                </header>
            </div>
        );
    }
}

export default SingleRecorder;