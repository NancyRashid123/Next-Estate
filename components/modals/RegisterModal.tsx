
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

import { useAuthModal } from "@/store/useAuthModaiStore";
import Modal from "./Modal";
import Input from "../input/Input";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SignInWithGoogle } from "@/services/signInWithGoogle";


interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

export default function RegisterModal() {
  const { isRegisterOpen, closeRegister, openLogin } = useAuthModal();
  const t = useTranslations("RegisterModal");
  const router = useRouter();

  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: RegisterErrors = {};

    if (!values.name.trim()) {
      newErrors.name = t("nameRequired");
    } else if (values.name.trim().length < 3) {
      newErrors.name = t("nameMin");
    }

    if (!values.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!values.password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (values.password.length < 6) {
      newErrors.password = t("passwordMin");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);

      const {error}= await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }

      toast.success("Account created successfully");
      router.refresh();
      setValues({name: "", email: "", password: ""});
      closeRegister();
    }catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong, please try again.");
    }
     finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isRegisterOpen}
      onClose={closeRegister}
      title={t("title")}
    >
      <div className="mb-6 space-y-1 text-start">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("welcome")}
        </h2>

        <p className="text-sm text-gray-500">{t("description")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="register-name"
          name="name"
          type="text"
          label={t("name")}
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isLoading}
        />

        <Input
          id="register-email"
          name="email"
          type="email"
          label={t("email")}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
        />

        <Input
          id="register-password"
          name="password"
          type="password"
          label={t("password")}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
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

        <span className="relative bg-white px-2">{t("or")}</span>
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
        {t("haveAccount")}{" "}
        <button
          type="button"
          onClick={openLogin}
          className="cursor-pointer font-semibold text-primary hover:underline"
        >
          {t("login")}
        </button>
      </p>
    </Modal>
  );
}

