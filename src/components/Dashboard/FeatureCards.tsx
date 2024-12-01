import { Mic, VolumeIcon as VolumeUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";

export const FeatureCards:React.FC = () => {
    return (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration: 0.6, delay: 0.3}}
        >
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <VolumeUp className="h-6 w-6" />
                Text-to-Speech
                </CardTitle>
                <CardDescription>Convert text into spoken audio</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Quickly transform written content into natural-sounding speech.</p>
            </CardContent>
            <CardFooter>
                <Button>Start TTS</Button>
            </CardFooter>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Mic className="h-6 w-6" />
                Speech-to-Text
                </CardTitle>
                <CardDescription>Convert spoken words into text</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Accurately transcribe spoken words into written text.</p>
            </CardContent>
            <CardFooter>
                <Button>Start STT</Button>
            </CardFooter>
            </Card>
        </motion.div>
    )
}

export default FeatureCards;