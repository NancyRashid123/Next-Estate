"use client";
import {  useEffect } from "react";
import { LuX } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {

    useEffect(() => {
       if(isOpen){
        document.body.style.overflow = "hidden";
       }else{
        document.body.style.overflow = "auto";
       } 

       return () => {
        document.body.style.overflow = "auto";
       }
    })
  return (
    <div aria-hidden={isOpen} className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-500  ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      {/* modal container */}
      <div className="z-10  max-w-lg w-full relative rounded-2xl bg-white  shadow-2xl transition duration-300">
        {/* modal header */}
        <div className={`flex items-center justify-between border-b border-gray-200 px-6 py-4 ${isOpen ? "opacity-100 tranlate-y-0" : "opacity-0 translate-y-full"}`}>
          
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            aria-label="Close modal"
          >
            
            <LuX className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto px-6 py-5">
          
          {children}
        </div>
      </div>
    </div>
  );
}
