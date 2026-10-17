"use client";

import { HiOutlineHomeModern } from "react-icons/hi2";
import Button from "../button/Button";
import { useRouter } from "@/i18n/routing";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  filter?: boolean;
}

export default function EmptyState({
  title = "No matching properties found",
  subtitle = "Try adjusting your search criteria or clearing some filters to see more results.",
  filter,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <div className=" flex h-20 w-20  items-center justify-center rounded-full bg-primary/5">
        <HiOutlineHomeModern size={40} className="text-primary" />
      </div>
      <h2 className="text-3xl font-bold mt-6 text-text">{title}</h2>
      {subtitle && (
        <p className="max-w-md leading-relaxed text-text/60 mt-3">{subtitle}</p>
      )}
      {filter && (
        <div className=" mt-8">
          <Button
            variant="outline"
            onClick={() => router.replace("/marketplace")}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
