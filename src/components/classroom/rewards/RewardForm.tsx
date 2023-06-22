import { TextInput, TextAreaInput } from "@/components/static/Inputs";
import { ModalButton } from "@/components/use-client/Modal";
import { Form, FormField, FormItem } from "@/components/use-client/form/Form";
import { FormMessage } from "@/components/use-client/form/FormField";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("can't be empty").max(64, "too long"),
  cost: z.number().min(1),
});
export type RewardFormSchema = z.infer<typeof formSchema>;

export default function RewardForm(p: {
  mutateFunction: (data: RewardFormSchema) => unknown;
  onFinished?: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  defaultValues?: RewardFormSchema;
  label: string;
}) {
  const form = useForm<RewardFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: p.defaultValues?.name ?? "",
      cost: p.defaultValues?.cost ?? 0,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: RewardFormSchema) {
    try {
      await p.mutateFunction(values);
      p.onFinished && p.onFinished();
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  const valid = form.formState.isValid;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Reward Name</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({ field }: any) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Cost</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput
                  type="number"
                  {...field}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === "" ? null : +event.target.value
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="Cancel" onClick={() => p.onCancel()} />
          <ModalButton
            label={valid ? `✨ ${p.label}` : `✖️ ${p.label}`}
            onClick={() => {}}
            primary
            submit
            disabled={!valid}
          />
        </div>
      </form>
    </Form>
  );
}
