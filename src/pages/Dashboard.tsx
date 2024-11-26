import { signOut } from "firebase/auth";
import { Button } from "../components/ui/button";
import { useUser } from "../components/Wrappers/AuthWrapper";
import { auth } from "../lib/firebase";
import { toast } from "sonner";
import HeaderTabs from "../components/Dashboard/HeaderTabs";

const Dashboard:React.FC = () => {
    const user = useUser();

    return (
        <div>

            <HeaderTabs />

            {/* <h1>DASHBOARD PAGE</h1>

            {user.user ? (
                <div>
                    <p>{user.user.email}</p>
                    <p>{user.user.emailVerified + ""}</p>
                    <Button onClick={() => {signOut(auth); toast("Logged out")}}>LOGOUT</Button>
                </div>
            ): (
                <div>NO USEr</div>
            )} */}

        </div>
    )
}

export default Dashboard;