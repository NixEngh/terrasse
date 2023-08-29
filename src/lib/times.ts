const weekdays = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
] as const;

type WeekDay = (typeof weekdays)[number];

export { weekdays };
export type { WeekDay };
