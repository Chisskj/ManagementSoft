// import { orderAction } from "@/redux/slice/order";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

function SeatRow({ isBooked, setSeat, seat, seatId, blockName, blockNumber }) {
  // const dispatch = useDispatch();
  // const seatsRedux = useSelector((state) => state.order.dataSeat);
  // const onReduxSeat =
  // console.log(idSeat);
  // console.log;
  // console.log(blockName);
  // console.log(blockNumber);
  // console.log(isBooked);
  // const arr = ["A1", "A2", "A3", undefined, "A5", undefined];
  const filteredArr = isBooked.filter((el) => el !== undefined); // Output: ['A1', 'A2', 'A3', 'A5']

  const onBooking = filteredArr.includes(`${blockName}${blockNumber}`);

  // // console.log(onBooking);
  const [isSelected, setSelected] = useState(false);
  const handleClick = () => {
    if (onBooking) return;

    setSelected(!isSelected);

    if (!isSelected) {
      setSeat((prevSeats) => [...prevSeats, `${blockName}${blockNumber}`]);
    } else {
      setSeat((prevSeats) =>
        prevSeats.filter((seat) => seat !== `${blockName}${blockNumber}`)
      );
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`w-4 h-4 md:w-6 md:h-6 flex justify-center items-center text-xs rounded-md ${
        !onBooking &&
        "hover:scale-125 hover:border-2 hover:border-primary cursor-pointer"
      } ${
        isSelected ? "bg-primary" : onBooking ? "bg-success" : "bg-secondary"
      } transition-all`}></div>
  );
}

function Seat({ setSeat, seat, seatHistory }) {
  const seatA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const seatB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const seatC = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const seatD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const seatE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const seatF = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const seatG = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // console.log(seatHistory);
  const onBooking = seatHistory.map((item) => {
    if (item.status_order === "Sold") {
      return `${item.seat}`;
    }
    // return `${item.status_order === "Sold"}`;
  });
  const idSeat = seatHistory.map((item) => {
    // console.log(item.seat_id);
    return item.seat_id;
  });
  const newArray = [];
  for (let i = 0; i < idSeat.length; i += 12) {
    newArray.push(idSeat.slice(i, i + 12));
  }

  // console.log(newArray);
  return (
    <>
      <div className="w-full flex justify-between gap-2 mb-6">
        <p className="w-3 "></p>
        <div className="w-full h-2 bg-accent rounded-md"></div>
      </div>
      <div className="w-full flex justify-between gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">A</p>
        {seatA.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            seatId={newArray[0].map((number) => number)}
            blockName={"A"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full justify-between flex gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">B</p>
        {seatB.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            blockName={"B"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full flex justify-between gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">C</p>
        {seatC.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            blockName={"C"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full flex justify-between gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">D</p>
        {seatD.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            blockName={"D"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full flex justify-between gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">E</p>
        {seatE.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            blockName={"E"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full flex justify-between gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">F</p>
        {seatF.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            blockName={"F"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full flex justify-between gap-1">
        <p className="w-3 text-black text-xs md:font-semibold">G</p>
        {seatG.map((seatNumber) => (
          <SeatRow
            key={seatNumber}
            setSeat={setSeat}
            isBooked={onBooking}
            seat={seat}
            blockName={"G"}
            blockNumber={seatNumber}
          />
        ))}
      </div>
      <div className="w-full flex justify-between gap-1 mt-2">
        <p className="w-3"></p>
        {seatA.map((seatNumber, idx) => (
          <div
            key={idx}
            className={`w-6 h-6 flex font-bold justify-center items-center text-xs rounded-md`}>
            {seatNumber}
          </div>
        ))}
      </div>
    </>
  );
}

export default Seat;
