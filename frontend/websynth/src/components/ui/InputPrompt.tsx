"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";

const formSchema = z.object({
  prompt: z.string(),
})

const InputPrompt = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  // Submit form on Enter key press (Shift + Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
                <TextareaAutosize
                  placeholder="Ask Claude..." {...field}
                  className="border-solid resize-none border-2 border-gray-300 rounded-md w-full p-2"
                  onKeyDown={handleKeyDown}
                  minRows={1}
                  maxRows={4}
                />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default InputPrompt;