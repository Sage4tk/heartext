import { FileWarning, Mic, Send, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SttForm:React.FC = () => {

    /* STATES */
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentTranscript, setCurrentTranscript] = useState<string>("");
    const mediaRecorderRef = useRef<null | MediaRecorder>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    /* FUNCTIONS */
    const startRecording = async ():Promise<void> => {

        // clear out URL if there's an existing one.
        setAudioUrl(null);

        try {
            // get stream to record
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            audioChunksRef.current = [];

            // push blop into ref
            mediaRecorder.ondataavailable = (event) => {

                audioChunksRef.current.push(event.data);

            }

            // stop event to combine the audio
            mediaRecorder.onstop = () => {

                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);

                // set state to URL
                setAudioUrl(audioUrl);

            }

            // start recording
            mediaRecorder.start();

            // set UI into recording
            setIsRecording(true);

        } catch (err) {
            
            // show user that the microphone isn't allowed
            if (err instanceof DOMException && err.name === "NotAllowedError") {
                toast("Please allow browser to access microphone.");
            } else {
                toast("Something went wrong.")
            }
            

        }


    }

    const stopRecording = () => {

        // stop recording if current recoding is in session.
        if (mediaRecorderRef.current) {

            mediaRecorderRef.current.stop();
            
            setIsRecording(false);

            // stop all tracks and remove mic in use
            const tracks = mediaRecorderRef.current.stream.getTracks();

            tracks.forEach(track => track.stop());
        }


    }

    const uploadAudioFile = (event:React.ChangeEvent<HTMLInputElement>) => {

        // get file
        const files = event.target.files;

        // return out if nothing
        if (!files || files.length === 0) return;

        // get audio file
        const audioFile = files[0];

        if (!audioFile) return;

        // set allowed types
        const allowedTypes = ["audio/mpeg", "audio/mp4", "audio/wav"];

        // check allowed types and return out and display that wrong file type is uploaded
        if (!allowedTypes.includes(audioFile.type)) {

            toast("Wrong file type", {
                important: true,
                icon: <FileWarning className="h-5 w-5" />
            })

            return;
        }


    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration: 0.3}}
        >
            <div className="flex justify-start space-x-4 mb-4">
                <Button
                    className={cn(
                        isRecording && "bg-red-600 hover:bg-red-700"
                    )}
                    onClick={isRecording ? stopRecording : startRecording}
                >
                    <Mic className="mr-2 h-4 w-4" />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                <Button asChild>
                <label>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio
                    <input type="file" accept=".mp3, .mpeg, .mpga, .m4a, .wav" onChange={uploadAudioFile} className="hidden" />
                </label>
                </Button>
                {audioUrl && (
                    <div>
                    <p>Audio Recording:</p>
                    <audio controls>
                        <source src={audioUrl} type="audio/wav" />
                    </audio>
                    </div>
                )}
            </div>
        
            <Textarea
                placeholder="Transcript will appear here..."
                value={isLoading ? 'Transcribing...' : currentTranscript}
                readOnly
                className="w-full h-32 mb-4"
            />
            <Button className="mb-2">
                <Send className="w-4 h-4 mr-2" />
                Submit
            </Button>
            <p className="text-sm text-gray-500">
                Supported audio formats: WAV, MP3, M4A
            </p>
        </motion.div>
    )
}

export default SttForm;