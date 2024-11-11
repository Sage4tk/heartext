import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { createUserWithEmailAndPassword, getAdditionalUserInfo, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { FirebaseError } from "firebase/app";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../Wrappers/AuthWrapper";

const formValidation = z.object({
    email: z.string().min(1, { message: "Required"}).email({message: "Invalid E-mail"}),
    password: z.string().min(1, { message: "Required"}).max(20, {message: "20 characters max."}),
    cPassword: z.string().min(1, { message: "Required"}).max(20, {message: "20 characters max."})
})
.superRefine((state, ctx) => {

    // check if passwrod is not same
    if (state.password !== state.cPassword) {

        ctx.addIssue({
            code: "custom",
            message: "Password does not match.",
            path: ["cPassword"]
        });

    }

    // if passwrod are the same check if passwrod contains basisc rules
    if (state.password === state.cPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(state.cPassword)) {

        ctx.addIssue({
            code: "custom",
            message: "Password must contain an uppercase, lowercase, number, and 6 characters long.",
            path: ["cPassword"]
        });

    }

})

const SignupForm:React.FC = () => {

    /** HOOKS */
    const navigate = useNavigate();

    /** STATE */
    const [form, setForm] = useState<typeof formValidation._type>({
        email: "",
        password: "",
        cPassword: ""
    });
    const [formError, setFormError] = useState<typeof form>({
        email: "",
        password: "",
        cPassword: ""
    });
    const [mainError, setMainError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const user = useUser();

    /** USE EFFECTS */

    // if there is a user redirect to dashboard
    useEffect(() => {

        if (!user.loading && user.user) {

            navigate("/dashboard")        

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

    // register user
    const registerUser = async (event:React.FormEvent):Promise<void> => {
        event.preventDefault();

        // clear up error state
        setFormError({
            email: "",
            password: "",
            cPassword: ""
        });

        setMainError("");

        try {

            formValidation.parse(form);

            // block UI
            setLoading(true);

            // call firebase registration
            const { user } = await createUserWithEmailAndPassword(auth, form.email, form.cPassword);

            // send verification email.
            await sendEmailVerification(user);

            // unblock UI
            setLoading(false);

            toast("Sign up successful", {
                description: "Please confirm your E-mail with the E-mail we've sent."
            })

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
                        cPassword: ""
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
            cPassword: ""
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

                <CardTitle className="font-bold">SIGNUP</CardTitle>

                <CardDescription>Create an accounts</CardDescription>

            </CardHeader>            

            <CardContent>

                <form className="space-y-4">

                    <div className="grid gap-2">

                        <Label htmlFor="email">E-mail:</Label>

                        <Input placeholder="Enter E-mail" value={form.email} name="email" onChange={inputListener} />

                        {formError.email && <span className="text-red-600 text-xs">{formError.email}</span>}

                    </div>

                    <div className="grid gap-2">

                        <Label htmlFor="password">Password:</Label>

                        <Input placeholder="Enter password" type="password" value={form.password} name="password" onChange={inputListener} />

                        {formError.password && <span className="text-red-600 text-xs">{formError.password}</span>}

                    </div>

                    <div className="grid gap-2">

                        <Label htmlFor="cPassword">Confirm Password:</Label>

                        <Input placeholder="Confirm password" type="password" value={form.cPassword} name="cPassword" onChange={inputListener} />

                        {formError.cPassword && <span className="text-red-600 text-xs">{formError.cPassword}</span>}

                    </div>

                    <Button disabled={loading} onClick={registerUser} className="w-full py-5">SIGN UP</Button>

                    {mainError && (
                        <Alert className="" variant="destructive">

                            <AlertCircle className="w-4 h-4" />

                            <AlertTitle>Sign up error</AlertTitle>

                            <AlertDescription>{mainError}</AlertDescription>
                            
                        </Alert>
                    )}

                </form>

                <div className="">

                    <Separator className="my-4" />

                    <Button onClick={signInWithGoogle} disabled={loading} className="w-full py-5" variant="outline"><img draggable={false} className="select-none h-auto mr-2 w-6" src="/img/icons/google.svg" />SIGNUP WITH GOOGLE</Button>

                </div>

            </CardContent>

            <CardFooter>
                
                <div className="text-sm mx-auto">
                    Already have an account?
                    <Link className="ml-1 underline" to={"/login"}>Sign in here</Link>
                </div>

            </CardFooter>
            
        </Card>
    )
}

export default SignupForm;