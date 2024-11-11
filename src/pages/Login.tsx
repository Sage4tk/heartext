import LoginForm from "../components/Login/LoginForm";
import useTitle from "../hooks/useTitle";

const Login:React.FC = () => {

    /** HOOKS */
    useTitle("Login | HearText");

    return (
        <div className="w-screen h-screen flex items-center justify-center">

            <LoginForm />
            
        </div>
    )
}

export default Login;