"use client";

import { State, submitQuestionnaire } from "@/app/(main)/questionnaire/actions";
import { SubmitButton } from "./submit-button";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";

type Question = {
  id: number;
  question: string;
};

interface Props {
  questions: Question[];
}

export const QuestionForm: React.FC<Props> = ({ questions }) => {
  const initialState: State = { message: null };
  const [error, dispatch] = useFormState(submitQuestionnaire, initialState);

  return (
    <form
      action={dispatch}
      className="space-y-4 px-1 py-2 text-2xl font-extralight"
    >
      {questions.map((q) => (
        <Input key={q.id} id={q.id} question={q.question} />
      ))}
      <div className="flex w-full justify-end px-1 py-4">
        <SubmitButton />
      </div>
    </form>
  );
};

const Input = ({ id, question }: Question) => {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2">
      <label>
        {id} - {question}
      </label>
      <input
        id={id.toString()}
        name={id.toString()}
        disabled={pending}
        type="text"
        placeholder="Answer..."
        maxLength={300}
        className={clsx(
          "focus-visible:ring-ring w-full flex-1 rounded-none border border-black bg-transparent px-1 py-2 text-xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "cursor-not-allowed text-gray-500": pending,
          },
        )}
        required
      />
    </div>
  );
};
