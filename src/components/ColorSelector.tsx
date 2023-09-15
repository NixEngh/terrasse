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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-2">
      <ol className="flex justify-center gap-3">
        {colors.map((color: ProfileColor) => (
          <li key={color}>
            <ColorRadioButton color={color} register={register} />
          </li>
        ))}
      </ol>
      <button
        className="w-1/5 py-1 text-center text-white border rounded-lg select-none bg-slate-600 hover:bg-slate-500"
        type="submit"
      >
        velg
      </button>
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
        className="peer hidden"
        {...register("color")}
        type="radio"
        id={color}
        value={color}
        checked
      />
      <label htmlFor={color} className="group peer-checked:text-red-400">
        <div
          className={cn(
            `h-10 w-10 rounded-full border-2 border-slate-300 `,
            color === ProfileColor.profileBlue &&
              "peer-checked:group-[]:bg-profileBlue-primary border-profileBlue-primary hover:bg-profileBlue-secondary",
            color === ProfileColor.profileGreen &&
              "peer-checked:group-[]:bg-profileGreen-primary border-profileGreen-primary hover:bg-profileGreen-secondary",
            color === ProfileColor.profileRed &&
              "peer-checked:group-[]:bg-profileRed-primary border-profileRed-primary hover:bg-profileRed-secondary",
            color === ProfileColor.profileYellow &&
              "peer-checked:group-[]:bg-profileYellow-primary border-profileYellow-primary hover:bg-profileYellow-secondary"
          )}
        />
      </label>
    </>
  );
};

export default ColorSelector;
