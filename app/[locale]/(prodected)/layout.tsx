
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { redirect } from "next/navigation";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return <>{children}</>;
}
