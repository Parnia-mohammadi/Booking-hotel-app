import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOptions = (type, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [type]: operation == "inc" ? prev[type] + 1 : prev[type] - 1,
      };
    });
  };
  return (
    <div className="header">
      Home
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            className="headerSearchInput"
            placeholder="where to go?"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/05/06</div>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {options.adult}adult &bull; {options["children"]} children &bull;
            {options["room"]} room
          </div>
          {openOption && (
              <GuestOptionList
                handleOptions={handleOptions}
                options={options}
              />
            )}
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="heroIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions }) {
  return (
    <div className="guestOptions">
      <GuestOptionItem
        type="adult"
        options={options}
        minLimit={2}
        handleOptions={handleOptions}
      />
      <GuestOptionItem
        type="children"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <GuestOptionItem
        type="room"
        options={options}
        minLimit={2}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function GuestOptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] < minLimit}
          onClick={() => {
            handleOptions(type, "dec");
          }}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => {
            handleOptions(type, "inc");
          }}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
