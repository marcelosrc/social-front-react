export default function formatDate(date, type) {
  const formattedDate = new Date(date);
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const monthIndex = formattedDate.getMonth();
  const monthName = monthNames[monthIndex];
  const [day, month, hours, minutes, year] = [
    formattedDate.getDate(),
    monthName,
    formattedDate.getHours(),
    (formattedDate.getMinutes() < 10 ? "0" : "") + formattedDate.getMinutes(),
    formattedDate.getFullYear(),
  ];

  return type === "full" ? (
    <>
      {day} de {month} de {year} as {hours}:{minutes}
    </>
  ) : (
    <>{year}</>
  );
}
