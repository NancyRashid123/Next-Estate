import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

interface BaseProps{
    label:string,
    name:string,
    error?:string,
    as?:"input" | "textarea",
    value:string,
    onChange?:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}
 type InputProps = BaseProps & React.InputHTMLAttributes<HTMLInputElement>
 type TextareaProps = BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
export default function Input({
    label,
    name,
    error,
    id,
    as = "input",
    value,
    onChange,
    className,
    ...props
}:InputProps | TextareaProps) {
    const hasValue = value !== "";
    const inputId = id ?? name;
    const sharedClasses = clsx(
        `peer w-full text-gray-600 border bg-white focus:border-2 px-4 text-sm outline-none transition disabled:opacity-70`,
         error ? "border-red-500 focus:border-red-500": "border-gray-400 focus:border-black",
         as === "textarea" ? "min-h-[120px] pt-6 pb-3 resize-none rounded-xl" : "h-14 pt-6 rounded-xl",
         className
    )
  return (
    <div className="w-full">
        <div className="relative">
            {as === "textarea" ? (
               <textarea 
               id={inputId}
               name={name}
               value={value}
               onChange={onChange}
               className={sharedClasses}
               placeholder=" "
               {...props as TextareaHTMLAttributes<HTMLTextAreaElement>}
               />
            ) : (
                <input 
                id={inputId}
                name={name}
                value={value}
                onChange={onChange}
                className={sharedClasses}
                placeholder=" "
                {...props as React.InputHTMLAttributes<HTMLInputElement>}
                />
            )}
                
           <label 
           htmlFor={inputId}
           className={clsx(
               `absolute top-4 left-4 text-sm  text-gray-500 transition-all duration-200 pointer-events-none origin-left`,
               hasValue ? "-translate-y-3 scale-75 font-semibold text-gray-700" : "peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-700"
           )}
           >
               {label}
           </label>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
