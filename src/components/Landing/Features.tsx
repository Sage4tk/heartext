import { Mic, Volume2Icon} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import View from "../ui/View";
import { Button } from "../ui/button";


const Features:React.FC = () => {
    return (
        <View className="" >

            <div className="flex flex-col py-16 items-center" id="features">

                <h2 className="font-bold text-2xl tracking-wide text-center mb-8">POWERFUL FEATURES</h2>

                <div className="grid lg:grid-cols-2 gap-8 w-full">

                    <Card className="">

                        <CardHeader className="text-xl font-semibold flex flex-row items-center"><Volume2Icon className="mr-2" />Text to Speech (TTS)</CardHeader>

                        <CardContent>
                            <p>Transform written text into natural-sounding speech with our advanced Text to Speech feature. Whether reading out loud for accessibility, hands-free use, or creating audio content, this functionality provides a seamless experience, supporting multiple voices. Perfect for users with visual impairments or those who prefer auditory content.</p>
                        </CardContent>

                        <CardFooter className="">
                            
                            <Button>GET STARTED</Button>

                        </CardFooter>

                    </Card>

                    <Card>

                        <CardHeader className="text-xl font-semibold flex flex-row items-center"><Mic className="mr-2" />Speech to Text (STT)</CardHeader>

                        <CardContent>
                            <p>Convert spoken words into accurate text effortlessly with our Speech to Text feature. This tool also includes powerful language translation capabilities, speak in various languages and have words instantly translated into English. Ideal for multilingual communication, accessibility, and transcription, this feature supports a wide range of languages.</p>
                        </CardContent>

                        <CardFooter>
                            
                            <Button>GET STARTED</Button>

                        </CardFooter>

                    </Card>

                </div>

            </div>

        </View>
    )
}

export default Features;