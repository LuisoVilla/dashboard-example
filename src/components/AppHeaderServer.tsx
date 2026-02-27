import { cookies } from "next/headers";
import { AppHeaderClient } from "./AppHeaderClient";

export async function AppHeaderServer() {
  const cookieStore = await cookies();
  const name = cookieStore.get("wealthup_name")?.value;
  return <AppHeaderClient name={name ?? null} />;
}
