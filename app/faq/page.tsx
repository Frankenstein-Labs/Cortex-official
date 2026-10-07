import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";
import React from "react";
import FAQComponent from "@/components/faq";

export const metadata: Metadata = constructMetadata({
  title: "Frequently asked questions",
  description:
    "Answers about the Cortex AI workspace, data handling and deployment.",
  canonical: "/faq",
});

export default async function FAQ() {
  return <FAQComponent />;
}
