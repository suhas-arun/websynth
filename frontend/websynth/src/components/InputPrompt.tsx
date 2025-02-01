"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import TextareaAutosize from "react-textarea-autosize";
import { Input } from "@/components/ui/input";

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
    <div className="w-full h-full">
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto px-4 mb-4 flex justify-center items-center">
        <Drawer>
          <DrawerTrigger className="w-full">
            <Input
              placeholder="Ask Claude..."
              className="border-solid resize-none border-2 border-blue-900 rounded-md w-full p-2"
            />
          </DrawerTrigger>
          <DrawerContent className="max-w-[60%] mx-auto left-0 right-0 flex items-center text-center">
            <DrawerHeader>
              <DrawerTitle className="text-center">Overall Structure</DrawerTitle>
              <DrawerDescription>Describe how you want the components to interact.</DrawerDescription>
            </DrawerHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 pb-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <TextareaAutosize
                        placeholder="Ask Claude..." {...field}
                        className="border-solid resize-none border-2 border-blue-00 rounded-md w-full p-2"
                        onKeyDown={handleKeyDown}
                        minRows={2}
                        maxRows={6}
                        autoFocus={true}
                      />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DrawerContent>
        </Drawer>
      </div>
    </div>

  )
}

export default InputPrompt;