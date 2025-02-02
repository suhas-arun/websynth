"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { captureScreenshot } from "@/utils/captureScreenshot";
import BankerButton from "./BankerButton";

interface InputPromptProps {
  homepageRef?: React.RefObject<HTMLDivElement | null>;
  handleSubmit: (prompt: string, screenshot: string) => void;
}

const formSchema = z.object({
  prompt: z.string(),
})

const InputPrompt: React.FC<InputPromptProps> = ({ homepageRef, handleSubmit }) => {
  const [open, setOpen] = useState(false); 
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setDisabled(true);
    if (homepageRef && homepageRef.current) {
      const screenshot = await captureScreenshot(homepageRef.current);
      handleSubmit(values.prompt, screenshot);
    }
    form.reset(); 
    setOpen(false); 
    setDisabled(false);
  };

  return (
    <div className="w-full h-full" data-html2canvas-ignore="true">
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto px-4 mb-4 flex justify-center items-center">
        <Drawer open={open} onOpenChange={setOpen}> 
          <DrawerTrigger className="w-full outline-none">
            <BankerButton />
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
                        placeholder="Build with WebSynth.ai..." {...field}
                        className="border-solid resize-none border-2 border-blue-900 rounded-md w-full p-2"
                        onKeyDown={handleKeyDown}
                        minRows={2}
                        maxRows={6}
                        autoFocus={true}
                        disabled={disabled}
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
  );
};

export default InputPrompt;
