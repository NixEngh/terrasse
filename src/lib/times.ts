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

const hours: number[] = [];
for (let hour = 0; hour < 24; hour++) {
  hours.push(hour);
}
const minutes: number[] = [];
for (let minute = 0; minute < 60; minute = minute + 15) {
  minutes.push(minute);
}

export { hours, minutes };
