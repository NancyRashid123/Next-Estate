"use client";
import { IconType } from "react-icons";
import clsx from "clsx";
interface PropertyTypeCardProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: () => void;
}

export default function PropertyTypeCard({
  label,
  icon: Icon,
  selected,
  onClick,
}: PropertyTypeCardProps) {
  return (
      <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-center gap-3 rounded-xl border p-5 transition cursor-pointer text-left",
        selected
          ? "border-black bg-gray-50 font-semibold"
          : "border-gray-200 hover:border-black"
      )}
    >
        <Icon size={28} />
      <span className="font-medium text-sm text-gray-700">{label}</span>
    </button>
  )
}
