"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface SidesheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComponentSubmit?: (name: string, description: string) => void;
  componentName?: string;
  componentDescription?: string;
}

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const Sidesheet: React.FC<SidesheetProps> = ({ open, onOpenChange, onComponentSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onComponentSubmit?.(values.name, values.description);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>Generate New Component</SheetTitle>
          <SheetDescription>
            Describe the component that you want to generate in the selected area.
            You can then refer to this component by name in the overall structure.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Component name form field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Name</FormLabel>
                  <FormControl>
                    <Input placeholder="MyButton" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your component a simple name that you can refer to in the overall structure.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Component description form field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Description</FormLabel>
                  <FormControl>
                    <Input placeholder="blue button containing the text..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Briefly describe the component's desired appearance and functionality.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <Button type="submit">Create Component</Button>
              <Button
                type="reset"
                variant="destructive"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                className="mt-2"
              >
                Delete Component
              </Button>
            </div>

          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default Sidesheet;