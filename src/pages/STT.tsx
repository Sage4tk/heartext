import SttForm from "@/components/STT/SttForm";
import SttHistory from "@/components/STT/SttHistory";

const SST:React.FC = () => {
    return (
        <div>

            <h1 className="text-2xl font-bold mb-4">Speech to Text</h1>

            <div className="space-y-6">

                <SttForm />

                <SttHistory />

            </div>

        </div>
    )
}

export default SST;