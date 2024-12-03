import { Mic, Table, Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
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
        <div className="space-y-6">
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
            <div>
            <h2 className="text-xl font-semibold mb-2">Transcript History</h2>
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>Transcript</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {transcriptHistory.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.timestamp}</TableCell>
                        <TableCell className="max-w-md truncate">{item.text}</TableCell>
                        <TableCell>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromHistory(item.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete transcript</span>
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))} */}
                </TableBody>
                </Table>
            </div>
            </div>
        </div>
    )
}

export default SttForm;