"use client";

import { ColorSchema, colorSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColor } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { colors, colorsToFarger } from "@/lib/colors";

const ColorSelector = () => {
  const { data: session, status } = useSession();
  

  const [loading, setLoading] = useState(false);
  const [fetchResult, setFetchResult] = useState<{
    isError?: boolean;
    message?: string;
  }>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColorSchema>({
    defaultValues: {
      color: session?.user.profileColor,
    },
    resolver: zodResolver(colorSchema),
  });

  const onSubmit: SubmitHandler<ColorSchema> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("api/colors", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setLoading(false);
      const res = await response.text();
      if (!response.ok) throw res;

      setFetchResult({
        isError: false,
        message: `Byttet farge til ${colorsToFarger[data.color]}!`,
      });
    } catch (e) {
      console.log(e);
      setFetchResult({ isError: true, message: e as string });
    }
  };

  return status === "loading" ? (
    <div role="status" className="animate-pulse">
      <div className="flex items-center justify-center mt-4 gap">
        <div className="w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-700"></div>
        <div className="w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-700"></div>
        <div className="w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-700"></div>
        <div className="w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-700"></div>

      </div>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-2"
    >
      <ol className="flex justify-center gap-3">
        {colors.map((color: ProfileColor) => (
          <li key={color}>
            <ColorRadioButton color={color} register={register}/>
          </li>
        ))}
      </ol>

      {loading ? (
        <Spinner />
      ) : (
        <button
          className="w-1/5 py-1 text-center text-white border rounded-lg select-none bg-slate-600 hover:bg-slate-500"
          type="submit"
        >
          velg
        </button>
      )}
      <p
        className={cn("text-green-500", {
          "text-red-500": fetchResult.isError,
        })}
      >
        {fetchResult.message}
      </p>
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
        className="hidden peer"
        {...register("color")}
        type="radio"
        id={color}
        value={color}
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
