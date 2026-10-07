"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubscriberFeedbackForm } from "@/components/ui/subscriber-feedback-form";

export default function PricingSuccess() {
  const router = useRouter();
  const handleClick = () => router.push("/workspace?checkout=success");

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-1 pt-32 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-3xl text-center text-2xl md:text-3xl lg:text-4xl">
            <h1 className="h1 leading-tight">
              Thank you for subscribing to Cortex.
            </h1>
          </div>
          <div className="mx-auto max-w-xl space-y-8">
            <SubscriberFeedbackForm />
            <div className="text-center text-slate-600">
              <p>We hope Cortex helps you move your work forward.</p>
              <Button
                onClick={handleClick}
                className="text-white mt-5 bg-slate-950 hover:bg-slate-800"
              >
                Open workspace
              </Button>
              <p className="mt-4 text-sm">
                Need help?{" "}
                <Link
                  href="https://github.com/Frankenstein-Labs/Cortex-official/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  Contact Cortex on GitHub
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
