export default function formatDate(date) {
  const formattedDate = new Date(date);
  const [day, month, hours, minutes] = [
    formattedDate.getDate(),
    formattedDate.getMonth(),
    formattedDate.getHours(),
    (formattedDate.getMinutes() < 10 ? "0" : "") + formattedDate.getMinutes(),
  ];
  return (
    <>
      {hours}:{minutes} ({day}/{month})
    </>
  );
}
