import { Mic, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const SttForm:React.FC = () => {

    /* STATES */
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentTranscript, setCurrentTranscript] = useState<string>("");

    /* FUNCTIONS */
    const stopRecording = () => {

    }

    const startRecording = () => {

    }

    const handleFileUpload = () => {

    }

    return (
        <div>
            <div className="flex justify-start space-x-4 mb-4">
                <Button onClick={isRecording ? stopRecording : startRecording}>
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                <Button asChild>
                <label>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio
                    <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                </label>
                </Button>
            </div>
            <Textarea
                placeholder="Transcript will appear here..."
                value={isLoading ? 'Transcribing...' : currentTranscript}
                readOnly
                className="w-full h-32 mb-4"
            />
            <p className="text-sm text-gray-500">
                Supported audio formats: WAV, MP3, M4A
            </p>
        </div>
    )
}

export default SttForm;