// "use client";
// import { useAuthModal } from "@/store/useAuthModaiStore";
// import Modal from "./Modal";
// import { useState } from "react";
// import Input from "../input/Input";
// import Button from "../button/Button";
// import { FcGoogle } from "react-icons/fc";

// interface loginModalProps {
//   email: string;
//   password: string;
// }

// type LoginErrors = Partial<Record<keyof loginModalProps, string>>;

// export default function LoginModal() {
//   const { isLoginOpen, closeLogin, openRegister } = useAuthModal();
//   const [loginValues, setLoginValues] = useState<loginModalProps>({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<LoginErrors>({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLoginValues((prev) => ({ ...prev, [name]: value }));
//     setError((prev) => ({ ...prev, [name]: undefined }));
//   };
//   const validate = () => {
//     const newErrors: LoginErrors = {};
//     if (!loginValues.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValues.email)) {
//       newErrors.email = "Enter a valid email address!";
//     }
//     if (!loginValues.password.trim()) {
//       newErrors.password = "password is required";
//     } else if (loginValues.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     setError(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setIsLoading(true);
//     try {
//       closeLogin();
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <Modal isOpen={isLoginOpen} onClose={closeLogin} title="Login">
//       <div className="mb-6 space-y-1">
//         <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>{" "}
//         <p className="text-sm text-gray-500">Login to your account</p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           id="login-email"
//           name="email"
//           type="email"
//           label="Email"
//           value={loginValues.email}
//           onChange={handleChange}
//           error={error.email}
//           disabled={isLoading}
//         />
//         <Input
//           id="login-password"
//           name="password"
//           type="password"
//           label="Password"
//           value={loginValues.password}
//           onChange={handleChange}
//           error={error.password}
//           disabled={isLoading}
//         />
//         <Button type="submit" loading={isLoading} fullWidth>
//           Continue
//         </Button>
//       </form>
//       {/* divider */}
//       <div className="relative my-6 text-center text-xs uppercase text-gray-400">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200" />{" "}
//         </div>
//         <span className="relative bg-white px-2">OR</span>{" "}
//       </div>
//       <Button
//         type="button"
//         variant="outline"
//         fullWidth
//         icon={<FcGoogle size={20} />}
//         disabled={isLoading}
//       >
//         Continue with Google
//       </Button>
//       <p className="mt-5 text-center text-sm text-gray-600">
//         Don&apos;t have an account?{" "}
//         <button
//           type="button"
//           onClick={openRegister}
//           className="font-semibold text-primary hover:underline cursor-pointer"
//         >
//           Register
//         </button>
//       </p>
//     </Modal>
//   );
// }


"use client";

import { useAuthModal } from "@/store/useAuthModaiStore";
import Modal from "./Modal";
import { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignInWithGoogle } from "@/services/signInWithGoogle";

interface LoginModalProps {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginModalProps, string>>;

export default function LoginModal() {
  const { isLoginOpen, closeLogin, openRegister } = useAuthModal();
  const t = useTranslations("LoginModal");
  const router = useRouter();

  const [loginValues, setLoginValues] = useState<LoginModalProps>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginValues((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!loginValues.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValues.email)
    ) {
      newErrors.email = t("emailInvalid");
    }

    if (!loginValues.password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (loginValues.password.length < 6) {
      newErrors.password = t("passwordMin");
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!validate()) return;
  
      try {
        setIsLoading(true);
  
        const {error}= await authClient.signIn.email({
          email: loginValues.email,
          password: loginValues.password
        });
  
        if (error) {
          toast.error(error.message as string);
          return;
        }
  
        toast.success("Logged in successfully");
        router.refresh();
        setLoginValues({ email: "", password: ""});
        closeLogin();
      }catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong, please try again.");
      }
       finally {
        setIsLoading(false);
      }
    };

  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={closeLogin}
      title={t("title")}
    >
      <div className="mb-6 space-y-1 text-start">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("welcome")}
        </h2>

        <p className="text-sm text-gray-500">
          {t("description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="login-email"
          name="email"
          type="email"
          label={t("email")}
          value={loginValues.email}
          onChange={handleChange}
          error={error.email}
          disabled={isLoading}
        />

        <Input
          id="login-password"
          name="password"
          type="password"
          label={t("password")}
          value={loginValues.password}
          onChange={handleChange}
          error={error.password}
          disabled={isLoading}
        />

        <Button type="submit" loading={isLoading} fullWidth>
          {t("continue")}
        </Button>
      </form>

      <div className="relative my-6 text-center text-xs text-gray-400">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>

        <span className="relative bg-white px-2">
          {t("or")}
        </span>
      </div>

      <Button
        onClick={SignInWithGoogle}
        type="button"
        variant="outline"
        fullWidth
        icon={<FcGoogle size={20} />}
        disabled={isLoading}
      >
        {t("google")}
      </Button>

      <p className="mt-5 text-center text-sm text-gray-600">
        {t("noAccount")}{" "}
        <button
          type="button"
          onClick={openRegister}
          className="font-semibold text-primary hover:underline cursor-pointer"
        >
          {t("register")}
        </button>
      </p>
    </Modal>
  );
}

