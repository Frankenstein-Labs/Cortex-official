"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SubscriberFeedback } from "@/types/subscriber-feedback";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  projectDescription: z.string().optional(),
  choiceReason: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof formSchema>;

export function SubscriberFeedbackForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: "",
      choiceReason: "",
    },
  });

  async function onSubmit(values: FeedbackFormValues) {
    if (values.projectDescription || values.choiceReason) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // eslint-disable-next-line no-console
          console.error("No user found");
          router.push("/workspace");
          return;
        }

        const { error } = await supabase.from("subscriber_feedback").insert({
          project_description: values.projectDescription,
          choice_reason: values.choiceReason,
          user_id: user.id,
        } as SubscriberFeedback);

        if (error) {
          // eslint-disable-next-line no-console
          console.error("Error submitting feedback:", error);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error submitting feedback:", error);
      }
    }
    router.push("/workspace");
  }

  return (
    <div className="my-8">
      <div className="mb-6 text-center text-gray-700">
        You can start using Cortex now. If you have a moment, optional feedback
        about your experience helps us improve the workspace.
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you building with Cortex?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I'm working on..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="choiceReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What brought you to Cortex?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I chose Cortex because..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 text-center">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary-700 text-white-main hover:bg-primary-800 hover:shadow-sm"
              >
                Continue to workspace
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
