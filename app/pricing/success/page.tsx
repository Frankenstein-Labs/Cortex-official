import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";
import PricingSuccess from "@/components/pricing-success";

export const metadata: Metadata = constructMetadata({
  title: "Pricing success",
  description: "Your Cortex subscription is ready.",
  canonical: "/pricing/success",
});

export default function Pricing() {
  return <PricingSuccess />;
}
