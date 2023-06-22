import { useCreateMemberReward } from "@/api/client/reward";
import { TextInput, TextAreaInput } from "@/components/static/Inputs";
import { ModalButton } from "@/components/use-client/Modal";
import { Form, FormField, FormItem } from "@/components/use-client/form/Form";
import { FormMessage } from "@/components/use-client/form/FormField";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reward } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  note: z.string().max(200, "Note too long"),
});
export type ClaimRewardFormSchema = z.infer<typeof formSchema>;

export default function ClaimRewardForm(p: {
  onFinished?: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  classId: string;
  pointsLeft: number;
  reward: Reward;
}) {
  const { mutateAsync: createMemberReward } = useCreateMemberReward(
    p.classId,
    p.reward.id
  );
  const form = useForm<ClaimRewardFormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ClaimRewardFormSchema) {
    try {
      await createMemberReward(values.note);
      p.onFinished && p.onFinished();
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  const valid = form.formState.isValid;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <table className="w-full">
          <colgroup>
            <col span={1} className="w-2/5" />
            <col span={1} className="w-3/5" />
          </colgroup>

          <tbody className="table-fixed">
            <tr>
              <td>Name</td>
              <td>{p.reward.name}</td>
            </tr>
            <tr>
              <td>Cost</td>
              <td>{p.reward.pointCost}</td>
            </tr>
            <tr>
              <td>New points</td>
              <td>{p.pointsLeft}</td>
            </tr>
          </tbody>
        </table>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Note</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextAreaInput rows={10} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="Cancel" onClick={() => p.onCancel()} />
          <ModalButton
            label={valid ? `✨ Submit` : `✖️ Submit`}
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
