"use client";
import { LuMinus, LuPlus } from "react-icons/lu";
interface CounterProps {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Counter({ title, subtitle, value, onChange, min = 1, max = 20, }: CounterProps) {
const increment = () => {
  if (value < max) {
    onChange(value + 1);
  }
}
const decrement = () => {
  if (value > min) {
    onChange(value - 1);
  }
}
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 gap-8">
       <div>
         <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
       </div>
       <div className="flex items-center gap-4">
          <button type="button" onClick={decrement} disabled={value <= min} className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition cursor-pointer">
            <LuMinus size={16} />
          </button>
          <span className="text-sm text-gray-600">{value}</span>
          <button type="button" onClick={increment} disabled={value >= max} className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-black transition cursor-pointer">
            <LuPlus size={16} />
          </button>
       </div>
    </div>
  );
}