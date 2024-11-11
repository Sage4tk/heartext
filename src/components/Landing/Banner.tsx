import { Button } from "../ui/button";
import View from "../ui/View";

const Banner:React.FC = () => {
    return (
        <div className="flex items-center justify-center h-[500px] bg-gray-50">

            <View>

                <div className="flex flex-col items-center">

                    <h1 className="text-3xl font-bold mb-1 text-center">TRANSFORM YOUR VOICE AND TEXT</h1>

                    <p className="text-xl mb-6 text-center">Seamlessly convert speech to text and text to speech with HEARTEXT</p>

                    <Button className="text-lg py-4 tracking-wide">TRY NOW</Button>

                </div>

            </View>

        </div>
    )
}

export default Banner;