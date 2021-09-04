
import { diasDeLaSemana, Hora } from "./types";

/**
 * Generate a list of the weeks of the year with the first day of the week and the last
 */
export function weekGenerator(): { monday: Date; sunday: Date; current: boolean }[] {
  const weekList: { monday: Date; sunday: Date; current: boolean }[] = [];
  //we obtain the first monday of the year
  const monday = new Date(new Date().getFullYear(), 0, 1);
  //if the day is not monday we go back to the previous monday
  if (diasDeLaSemana[monday.getDay()] !== "Lunes") {
    monday.setDate(monday.getDate() - monday.getDay() + 1);
  }
  //we add seven days to the current date to obtain the last sunday of the year
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  //iterate until both monday and sunday are from the next year
  while (monday.getFullYear() === sunday.getFullYear()) {
    weekList.push({
      monday: monday,
      sunday: sunday,
      current:
        monday.getTime() <= new Date().getTime() &&
        sunday.getTime() >= new Date().getTime(),
    });
    monday.setDate(monday.getDate() + 7);
    sunday.setDate(sunday.getDate() + 7);
  }

  return weekList;
}

export function dateMixer(day: Date, hour: Date): Date {
  const date = new Date(day);
  date.setHours(hour.getHours());
  date.setMinutes(hour.getMinutes());
  return date;
}

export function hourPicker(hour: Date): Hora {
  return {hora: hour.getHours(), minutos: hour.getMinutes()};
}

