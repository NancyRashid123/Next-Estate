"use client";

import Image from "next/image";
import { useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { LuSend } from "react-icons/lu";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import axios from "axios";

interface inputValue {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface EmailFormProps {
  name: string;
  email: string;
  propertyTitle: string;
  image: string;
  propertyPrice: number;
}
export default function EmailForm({
  name,
  email,
  propertyTitle,
  image,
  propertyPrice,
}: EmailFormProps) {
  const t = useTranslations("EmailForm");
  const [values, setValues] = useState<inputValue>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.phone || !values.message) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/send-email", {
        ownerEmail: email,
        ownerName: name,
        propertyTitle,
        propertyPrice,
        senderEmail: values.email,
        senderName: values.name,
        senderPhone: values.phone,
        message: values.message,
      });
      toast.success("Message sent successfully!");
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="sticky top-28 rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt="User"
            width={50}
            height={50}
            className=" rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{t("agent")}</p>
          </div>
        </div>
        <form onSubmit={handleSendEmail} className="mt-4 space-y-8">
          <Input
            label="Your Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="contact-name"
            disabled={loading}
          />
          <Input
            label="Your Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="contact-email"
            disabled={loading}
          />
          <Input
            label="Your Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            id="contact-phone"
            disabled={loading}
          />
          <Input
            label="Your Message"
            name="message"
            value={values.message}
            onChange={handleChange}
            id="contact-message"
            as="textarea"
            disabled={loading}
          />
      
        <Button fullWidth className="mt-3" icon={<LuSend />} loading={loading}>
          {t("send")}
        </Button>
      </form>
    </div>
    </div>
  );
}
