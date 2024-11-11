import SignupForm from "../components/Signup/SignupForm";
import useTitle from "../hooks/useTitle";

const Signup:React.FC = () => {

    /** HOOKS */
    useTitle("Signup | HearText")

    return (
        <div className="w-screen h-screen flex items-center justify-center">

            <SignupForm />

        </div>
    )
}

export default Signup;