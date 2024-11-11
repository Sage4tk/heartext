import { Link, useLocation } from "react-router-dom";
import { useUser } from "../Wrappers/AuthWrapper";
import { CreditCardIcon, LayoutDashboard, Menu, Mic2, Volume2 } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const DashboardNav:React.FC<{
    children:React.ReactNode
}> = ({
    children
}) => {

    /** STATE */
    const { user } = useUser();
    const [showNav, setShowNav] = useState<boolean>(false);

    /** HOOKS */
    const location = useLocation();

    /** FUNCTIONS */
    const displayName = ():string => {

        if (user && user.displayName) {

            const names = user.displayName.split(" ");

            return names[0][0] + names[names.length - 1][0]

        }

        return "HT"
    }


    return (
        <div className="w-screen h-screen flex flex-row">

            <button className="fixed lg:hidden right-4 top-4" onClick={() => setShowNav(!showNav)}>
                <Menu width={32} height={32} />
            </button>

            <nav className={`fixed h-screen bg-white lg:relative px-12 flex items-center justify-center border-r lg:left-auto transition-all lg:transition-none ${showNav ? "left-0":"left-[-1000px]"} `}>

                <div className="flex flex-col items-center w-full">

                    <div className="flex flex-col items-center space-y-4 mb-12">

                        <Avatar>
                            <AvatarFallback>{displayName()}</AvatarFallback>
                        </Avatar>
                        <span>{user?.email}</span>

                    </div>

                    <ul className="w-full">

                        <li className={`hover:bg-gray-100 rounded-lg flex ${location.pathname === "/dashboard" && "bg-gray-200 hover:bg-gray-200"}`}>
                            <Link to="/" className="py-3 px-4 w-full flex items-center"><LayoutDashboard size={18} className="mr-2" />Dashboard</Link>
                        </li>

                        <li className={`hover:bg-gray-100 rounded-lg flex ${location.pathname === "/stt" && "bg-gray-200"}`}>
                            <Link to="/" className="py-3 px-4 w-full flex items-center"><Mic2 size={18} className="mr-2" />Speech to Text</Link>
                        </li>

                        <li className={`hover:bg-gray-100 rounded-lg flex ${location.pathname === "/tts" && "bg-gray-200"}`}>                        
                            <Link to="/" className="py-3 px-4 w-full flex items-center"><Volume2 size={18} className="mr-2" />Text to speech</Link>
                        </li>

                        <li className={`hover:bg-gray-100 rounded-lg flex ${location.pathname === "/payments" && "bg-gray-200"}`}>
                            <Link to="/" className="py-3 px-4 w-full flex items-center"><CreditCardIcon size={18} className="mr-2" /> Payments</Link>
                        </li>

                    </ul>

                </div>

            </nav>

            <div className="flex-grow w-1">{children}</div>

        </div>
    )
}

export default DashboardNav;