"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PricingPageProps, PricingTierData } from "@/types/pricing";
import { useCheckout } from "@/hooks/useCheckout";
import { PRICING_TIERS } from "@/utils/constants";
import Footer from "./footer";
import CTA from "./cta";

function PricingTier({
  tier,
  user,
  index,
}: {
  tier: PricingTierData;
  user: PricingPageProps["user"];
  index: number;
}) {
  const { handleCheckout, isSubmitting } = useCheckout(user);
  const enterprise = tier.title === "Enterprise";

  return (
    <Card
      className={`bg-white flex h-full flex-col border-slate-200 shadow-sm ${index === 1 ? "lg:scale-[1.02] lg:shadow-lg" : ""}`}
    >
      <CardHeader className="min-h-[150px] border-b border-slate-100 p-6">
        <CardTitle className="text-2xl font-semibold text-slate-950">
          {tier.title}
        </CardTitle>
        <div className="mt-2 text-slate-600">
          {tier.isFree ? (
            <p>
              <span className="text-3xl font-semibold text-slate-950">
                Free
              </span>
            </p>
          ) : (
            <p>
              <span className="text-3xl font-semibold text-slate-950">
                ${tier.price}
              </span>
              <span className="ml-1">{tier.priceUnit ?? "/month"}</span>
            </p>
          )}
          {tier.description && (
            <p className="mt-2 text-sm leading-6">{tier.description}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <ul className="space-y-3">
          {(tier.features ?? []).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm leading-6 text-slate-600"
            >
              <CheckIcon
                className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                aria-hidden="true"
              />
              {feature.startsWith("custom-standard") ? (
                <span>
                  Monthly credit allowance for the models configured in this
                  Cortex deployment <CortexCreditsTooltip />
                </span>
              ) : feature.startsWith("custom-enterprise") ? (
                <span>
                  Higher credit allowance for team usage{" "}
                  <CortexCreditsTooltip />
                </span>
              ) : feature === "free" ? (
                <span>
                  Access the Cortex workspace to explore the available features
                </span>
              ) : (
                <span>{feature}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {tier.isFree ? (
          <Button
            asChild
            className="text-white w-full bg-slate-950 hover:bg-slate-800"
          >
            <Link href={user ? "/workspace" : "/signup"}>
              {user ? "Open workspace" : "Get started"}
            </Link>
          </Button>
        ) : enterprise ? (
          <Button asChild variant="outline" className="w-full">
            <Link
              href="https://github.com/Frankenstein-Labs/Cortex-official/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us on GitHub
            </Link>
          </Button>
        ) : (
          <Button
            className="text-white w-full bg-slate-950 hover:bg-slate-800"
            onClick={() => tier.priceId && handleCheckout(tier.priceId)}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Processing…" : (tier.buttonText ?? "Get started")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function PricingPage({ user }: PricingPageProps) {
  const tiers: PricingTierData[] = [
    ...PRICING_TIERS.standard,
    ...PRICING_TIERS.enterprise,
  ];
  return (
    <>
      <main className="mt-28 w-full px-5 sm:px-8">
        <section
          className="mx-auto max-w-[1120px] pb-16"
          aria-labelledby="pricing-heading"
        >
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Cortex plans
            </p>
            <h1
              id="pricing-heading"
              className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
            >
              Plans for your AI workspace.
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-600">
              Choose a plan for the features and model usage enabled in your
              Cortex deployment.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <PricingTier
                key={tier.title}
                tier={tier}
                user={user}
                index={index}
              />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-slate-500">
            Model availability, credits, billing and data handling depend on the
            service configuration. Confirm the current plan details before
            checkout.
          </p>
        </section>
      </main>
      <CTA />
      <Footer />
    </>
  );
}

function CortexCreditsTooltip() {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen} delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="About Cortex credits"
            className="ml-1 inline-flex align-middle text-slate-500"
            onClick={() => setOpen((value) => !value)}
          >
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="max-w-[250px]">
            Credits and available models depend on the pricing configuration for
            this Cortex instance.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
