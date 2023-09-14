"use client";

import { ColorSchema, colorSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColor } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

const ColorSelector = () => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColorSchema>({
    resolver: zodResolver(colorSchema),
  });

  const colors = [
    ProfileColor.profileBlue,
    ProfileColor.profileGreen,
    ProfileColor.profileRed,
    ProfileColor.profileYellow,
  ];

  const onSubmit: SubmitHandler<ColorSchema> = async (data) => {};

  return status === "loading" ? (
    <></>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ol className="flex justify-center gap-3">
        {colors.map((color: ProfileColor) => (
          <li key={color}>
            <ColorRadioButton color={color} register={register} />
          </li>
        ))}
      </ol>
    </form>
  );
};

interface ColorRadioButtonProps {
  color: ProfileColor;
  register: UseFormRegister<ColorSchema>;
}

const ColorRadioButton = ({ color, register }: ColorRadioButtonProps) => {
  return (
    <>
      <input
        className="peer"
        {...register("color")}
        type="radio"
        id={color}
        value={color}
        checked
      />
      <label className="peer-checked:group">
        <div
          className={`h-10 w-10 rounded-full border-2 border-slate-300`}
        />
      </label>
      <div
        className={cn(
          `h-10 w-10 rounded-full border-2 peer-checked:border-sky-700`
        )}
      />
    </>
  );
};

export default ColorSelector;
