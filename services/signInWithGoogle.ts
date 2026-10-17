import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export const SignInWithGoogle = async () => {
    try{
        await authClient.signIn.social({
            provider: "google"
        });
    }catch(err){
        console.log(err);
        toast.error("Google sign in failed");
    }
}