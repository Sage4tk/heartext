import { Check } from "lucide-react";
import View from "../ui/View";
import { Button } from "../ui/button";

const Pricing:React.FC = () => {
    return (
        <View className="bg-slate-50">

            <div className="flex flex-col py-16 items-center" id="pricing">

                <span className="font-bold text-2xl mb-8 tracking-wide select-none">Pricing</span>

                <p className="lg:w-3/4 text-lg text-center mb-12">HearText operates on a flexible, pay-as-you-go model, designed to give you control over exactly what you need. Instead of a flat-rate subscription, we offer a token-based system where you purchase tokens and use them to access specific features that matter most to you. This approach ensures that you only pay for the tools you require, whether it's voice recognition, transcription, or any other feature within our platform. By tailoring your usage to your needs, HearText makes it easy and cost-efficient to get the best value without unnecessary expenses.</p>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    <div className="bg-white p-8 rounded-lg shadow-md">

                        <h3 className="text-2xl font-semibold mb-4">Text-to-Speech</h3>

                        <p className="text-4xl font-bold mb-6">
                        $0.00005 <span className="text-xl text-gray-600 font-normal">per character</span>
                        </p>

                        <ul className="space-y-3 mb-8">
                                
                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>High-quality voice synthesis</span>
                            </li>

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Multiple voices</span>

                            </li>

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Adjustable speech rate</span>
                            </li>

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Custom voice options</span>
                            </li>

                        </ul>

                        <div className="text-sm text-gray-600 mb-6">
                        Example: A 1000-character text would cost $0.05
                        </div>

                        <Button className="py-6 w-full">GET STARTED</Button>

                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Speech-to-Text</h3>
                        <p className="text-4xl font-bold mb-6">
                        $0.008 <span className="text-xl text-gray-600 font-normal">per minute</span>
                        </p>

                        <ul className="space-y-3 mb-8">

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Accurate speech recognition</span>
                            </li>

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Real-time transcription</span>
                            </li>

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Multiple language support to english</span>
                            </li>

                            <li className="flex items-center">
                                <Check className="text-green-500 mr-2" size={20} />
                                <span>Speaker diarization</span>
                            </li>

                        </ul>

                        <div className="text-sm text-gray-600 mb-6">
                        Example: A 60-minute audio file would cost $0.48
                        </div>
                       
                       <Button className="py-6 w-full">GET STARTED</Button>

                    </div>

                </div>

                <div className="mt-8">

                    <p className="font-semibold">Get free 10 USD on signup and 5 USD each month.</p>

                </div>
      

            </div>

        </View>
    )
}

export default Pricing;