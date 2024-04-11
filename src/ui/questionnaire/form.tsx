"use client";

import { State, submitQuestionnaire } from "@/app/(app)/questionnaire/actions";
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
      className="text-2xl font-extralight py-2 space-y-4 px-1"
    >
      {questions.map((q) => (
        <Input key={q.id} id={q.id} question={q.question} />
      ))}
      <div className="w-full flex justify-end px-1 py-4">
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
          "text-xl py-2 px-1 border border-black w-full flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 rounded-none",
          {
            "cursor-not-allowed text-gray-500": pending,
          },
        )}
        required
      />
    </div>
  );
};
