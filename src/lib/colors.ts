import { ProfileColor } from "@prisma/client";


export const colors = [
  ProfileColor.profileBlue,
  ProfileColor.profileGreen,
  ProfileColor.profileRed,
  ProfileColor.profileYellow,
];

export const colorsToFarger = {
    [ProfileColor.profileBlue]: "Blå",
    [ProfileColor.profileGreen]: "Grønn",
    [ProfileColor.profileRed]: "Rød",
    [ProfileColor.profileYellow]: "Gul",
}