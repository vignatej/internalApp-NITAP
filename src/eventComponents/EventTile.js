
const EventTile = (props) => {
  const imgUrl = `http://127.0.0.1:8000${props.item.image}`;
  const date = new Date(props.item.startDateTime);
  const currDate = new Date();
  const endDate = new Date(props.item.endDateTime);
  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const startHours = date.getHours();
  const AmorPm = startHours <= 12 ? "AM" : "PM";
  const hours = startHours % 12;
  return (
    <>
      <div className="bg-cardCol rounded-xl mb-10 mx-4 max-w-lg overflow-hidden">
        <img src={imgUrl} alt="event img" className="w-full" />
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-extrabold capitalize">
              {props.item.name}
            </h3>
            <h3 className="text-xl font-extrabold capitalize">
              {currDate >= date && currDate <= endDate && "(Live)"}
            </h3>
          </div>
          {/* <p className="font-semibold capitalize">{props.item.subname}</p> */}

          <p>
            {/* starts at:{" "} */}
            <span className="font-bold">
              {months[date.getMonth()]} {date.getDate()}, {hours}:
              {date.getMinutes()} {AmorPm}
            </span>{" "}
            at <span className="font-bold">{props.item.venue}</span>
          </p>
          <div className="my-4"></div>
          <p>{props.item.description.slice(0, 100)}</p>
        </div>
      </div>
    </>
  );
};
export default EventTile;
