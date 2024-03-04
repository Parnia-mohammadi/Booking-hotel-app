import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiMinus,
  HiPlus,
  HiSearch,
  HiLogout,
} from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  NavLink,
} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const handleOptions = (type, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [type]: operation == "inc" ? prev[type] + 1 : prev[type] - 1,
      };
    });
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
    // setSearchParams({date:JSON.stringify(date), destination, options:JSON.stringify(options)})
  };
  const { isAuthenicated, user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
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
          <div
            className="dateDropDown"
            id="dateDropDown"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
            {openDate && (
              <DateDropDown
                date={date}
                setDate={setDate}
                setOpenDate={setOpenDate}
              />
            )}
          </div>
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
              setOpenOption={setOpenOption}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="heroIcon" />
          </button>
        </div>
        <div>
          <NavLink to="/login">
            <span>{isAuthenicated ? user.name : "Login"} </span>
            <HiLogout onClick={handleLogout} />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOption }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
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

function DateDropDown({ date, setDate, setOpenDate }) {
  const dateRef = useRef();
  useOutsideClick(dateRef, "date", () => setOpenDate(false));
  return (
    <div className="date" ref={dateRef}>
      <DateRange
        ranges={date}
        onChange={(item) => setDate([item.selection])}
        minDate={new Date()}
      />
    </div>
  );
}
