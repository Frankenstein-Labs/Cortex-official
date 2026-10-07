import DashboardPage from "@/components/dashboard";
import { getUserAndSubscription } from "@/lib/data-fetching";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your account, billing, and team preferences.",
  canonical: "/dashboard",
});

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { callback?: string };
}) {
  // The web experience ends on the presentation page after authentication.
  // Keep this protected compatibility route only for the desktop-app callback.
  if (!searchParams.callback) {
    return redirect("/ai-manus");
  }

  const {
    user,
    subscription,
    redirect: redirectTo,
    openAppQueryParams,
  } = await getUserAndSubscription();

  if (redirectTo || !user) {
    return redirect(redirectTo ?? "/signin");
  }

  // Extract access token from openAppQueryParams
  const accessToken = openAppQueryParams.split("&")[0].split("=")[1];

  return (
    <DashboardPage
      subscription={subscription}
      openAppQueryParams={openAppQueryParams}
      user={user}
      accessToken={accessToken}
    />
  );
}
