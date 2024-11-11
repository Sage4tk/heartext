import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import View from "../ui/View"
import { useUser } from "../Wrappers/AuthWrapper";

const Nav:React.FC = () => {

    /** STATES */
    const { user } = useUser();

    return (
        <nav className="border-b p-4 sticky top-0 bg-white">

            <View>

                <div className="flex flex-row items-center justify-between">

                    <span className="font-bold text-lg tracking-wide select-none">HEARTEXT</span>

                    <div className="flex-grow items-center lg:flex flex-row gap-8 hidden px-8">

                        <a className="" href="#features">Features</a>

                        <a className="" href="#why">Why HearText</a>
                        
                        <a className="" href="#pricing">Pricing</a>

                    </div>

                    <Link to={"/signup"} className={buttonVariants()}>
                        {user ? "Dashboard":"Try Out"}
                    </Link>

                </div>

            </View>

        </nav>
    )
}

export default Nav;