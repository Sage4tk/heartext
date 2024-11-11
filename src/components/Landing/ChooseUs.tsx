import { Check, Clock } from "lucide-react";
import View from "../ui/View";

const ChooseUs:React.FC = () => {
    return (
        <View className="">

            <div className="flex flex-col py-16 items-center" id="why">

                <h2 className="font-bold text-2xl tracking-wide text-center mb-8">Why Choose Text HearText?</h2>

                <div className="grid gap-8 lg:grid-cols-3 w-full">

                    <div className="flex flex-col items-center justify-center gap-4 py-4">

                        <Check className="mb-2" size={64} />

                        <span className="text-xl text-center font-semibold">99% Accuracy</span>

                        <p className="text-center">Enjoy precise transcriptions and natural-sounding speech synthesis.</p>

                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 py-4">

                        <Clock className="mb-2" size={64} />

                        <span className="text-xl text-center font-semibold">Save Time</span>

                        <p className="text-center">Quickly convert speech to text and vice versa, streamlining your workflow.</p>

                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 py-4">

                        <span className="font-bold text-[3rem] select-none">99%</span>

                        <span className="text-xl text-center font-semibold">User Satisfaction</span>

                        <p className="text-center">Join thousands of happy users who love HearText's performance.</p>

                    </div>

                </div>

            </div>

        </View>
    )
}

export default ChooseUs;