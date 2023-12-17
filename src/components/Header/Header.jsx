import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch } from "react-icons/hi";

function Header() {
  const [destination, setDestination] = useState("");
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
          <div className="optionDropDown">
            1 adult &bull; 2 children &bull; 1 room
          </div>
        </div>
        <div className="headerSearchItem headerSearchBtn">
          <HiSearch className="heroIcon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
