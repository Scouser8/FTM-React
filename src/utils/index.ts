import dayjs from "dayjs";

export const convertDateToString = (date: dayjs.Dayjs, format = "DD/MM/YYYY") =>
  dayjs(date).format(format);

export const convertStringToDate = (date: dayjs.Dayjs, format = "DD/MM/YYYY") =>
  dayjs(date, format);

export const getTomorrow = () => dayjs().add(1, "day");
