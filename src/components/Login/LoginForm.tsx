import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { FirebaseError } from "firebase/app";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../Wrappers/AuthWrapper";

const formValidation = z.object({
    email: z.string().min(1, { message: "Required"}).email({message: "Invalid E-mail"}),
    password: z.string().min(1, { message: "Required"}).max(20, {message: "20 characters max."}),
})


const LoginForm:React.FC = () => {

    /** HOOKS */
    const navigate = useNavigate();

    /** STATE */
    const [form, setForm] = useState<typeof formValidation._type>({
        email: "",
        password: ""
    });
    const [formError, setFormError] = useState<typeof form>({
        email: "",
        password: "",
    });
    const [mainError, setMainError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const user = useUser();

    /** USEEFFECTS */
    
    // if there is a user redirect to dashboard
    useEffect(() => {

        if (!user.loading && user.user) {

            navigate("/dashboard");

        }

    }, [user.loading, user.user]);

    /** FUNCTIONS */

    // input listener
    const inputListener = (event:React.ChangeEvent<HTMLInputElement>) => {

        setForm((state) => ({
            ...state,
            [event.target.name]: event.target.value
        }));

    }

    // LOGIN USER
    const registerUser = async (event:React.FormEvent):Promise<void> => {
        
        event.preventDefault();

        // clear up error state
        setFormError({
            email: "",
            password: "",
        });

        setMainError("");

        try {

            formValidation.parse(form);

            // block UI
            setLoading(true);

            // call firebase to login
            await signInWithEmailAndPassword(auth, form.email, form.password);

            // unblock UI
            setLoading(false);

            toast("Log in successful")

            // redirect to dashboard to which it should show confirm email.
            navigate("/dashboard");


        } catch (err) {

            // unblock UI on catch
            setLoading(false);

            // catch zod errors and put them into the UI
            if (err instanceof ZodError) {

                //  set in error state to display in ui
                setFormError((state) => {

                    const flattened = err.flatten().fieldErrors;

                    let newErrors:typeof state = {
                        email: "",
                        password: "",
                    };

                    for (const key in flattened) {

                        if (flattened[key] && flattened[key][0]) {
                            
                            // @ts-ignore
                            newErrors[key] = flattened[key][0];

                        }

                    }


                    return newErrors;
                });

            }

            if (err instanceof FirebaseError ) {
                
                setMainError(err.message.split("Error ")[1]);

            }

        }

    }

    // sign in with google
    const signInWithGoogle = async ():Promise<void> => {

        // clear up error state
        setFormError({
            email: "",
            password: "",
        });

        setMainError("");

        // block UI
        setLoading(true);

        try {

            const user = await signInWithPopup(auth, googleProvider);
            
            // check if new user
            const info = getAdditionalUserInfo(user);

            toast(info?.isNewUser ? "Sign up successful" :"Signed in!");

            // redirect to dashboard.
            navigate("/dashboard");

        } catch (err) {

            // display error in the bottom of form
            if (err instanceof FirebaseError ) {
                
                setMainError(err.message.split("Error ")[1]);

            }

        }

        // unblock UI AFTERWARDS
        setLoading(false);

    }


    return (
        <Card className="w-[360px]">

            <CardHeader>

                <CardTitle className="font-bold">LOGIN</CardTitle>

                <CardDescription>Login HearText with E-mail</CardDescription>

            </CardHeader>            

            <CardContent>

                <form className="space-y-4">

                    <div className="grid gap-2">

                        <Label htmlFor="email">E-mail:</Label>

                        <Input placeholder="Enter E-mail" value={form.email} name="email" onChange={inputListener} />

                        {formError.email && <span className="text-red-600 text-xs">{formError.email}</span>}

                    </div>

                    <div className="grid gap-2 pb-1">

                        <Label htmlFor="password">Password:</Label>

                        <Input placeholder="Enter password" type="password" value={form.password} name="password" onChange={inputListener} />

                        {formError.password && <span className="text-red-600 text-xs">{formError.password}</span>}

                    </div>

                    <Button disabled={loading} onClick={registerUser} className="w-full py-5">LOGIN</Button>

                    {mainError && (
                        <Alert className="" variant="destructive">

                            <AlertCircle className="w-4 h-4" />

                            <AlertTitle>Login error</AlertTitle>

                            <AlertDescription>{mainError}</AlertDescription>

                        </Alert>
                    )}

                </form>

                <div className="">

                    <Separator className="my-4" />

                    <Button onClick={signInWithGoogle} disabled={loading} className="w-full py-5" variant="outline"><img draggable={false} className="select-none h-auto mr-2 w-6" src="/img/icons/google.svg" />SIGN IN WITH GOOGLE</Button>

                </div>

            </CardContent>

            <CardFooter>
                
                <div className="text-sm mx-auto">
                    Don't have an account?
                    <Link className="ml-1 underline" to={"/signup"}>Signup here.</Link>
                </div>

            </CardFooter>
            
        </Card>
    )
}

export default LoginForm;