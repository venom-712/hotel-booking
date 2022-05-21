import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faBed,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Header.module.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i"
            ? options[name] + 1
            : options[name] <= 0
            ? options[name]
            : options[name] - 1,
      };
    });
  };

  return (
    <div className={styles.header}>
      <div
        className={
          type === "list"
            ? `${styles.headerContainer} ${styles.listmode}`
            : `${styles.headerContainer}`
        }
      >
        <div className={styles.headerList}>
          <div className={`${styles.headerListItem} ${styles.active}`}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className={styles.headerListItem}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className={styles.headerListItem}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className={styles.headerListItem}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
          <div className={styles.headerListItem}>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            {" "}
            <h1 className={styles.headerTitle}>
              A lifetime of discounts? It's Genius.
            </h1>
            <p className={styles.headerDescription}>
              Get rewarded for your travel - unlock instant savings of 10% or
              more with a free Account
            </p>
            <button className={styles.headerBtn}>Sign In / Register</button>
            <div className={styles.headerSearch}>
              <div className={styles.headerSearchItem}>
                <FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className={styles.headerSearchInput}
                />
              </div>
              <div className={styles.headerSearchItem}>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={styles.headerIcon}
                  onClick={() => setOpenDate(!openDate)}
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className={styles.headerSearchText}
                >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>

                {openDate && (
                  <DateRange
                    className={styles.date}
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                )}
              </div>
              <div className={styles.headerSearchItem}>
                <FontAwesomeIcon
                  icon={faPerson}
                  className={styles.headerIcon}
                  onClick={() => setOpenOptions(!openOptions)}
                />
                <span
                  className={styles.headerSearchText}
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adult - ${options.children} children - ${options.room} room`}
                </span>
                {openOptions && (
                  <div className={styles.options}>
                    <div className={styles.optionItem}>
                      <span className={styles.optionText}>Adult</span>
                      <div className={styles.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={`${styles.optionCounterButton}`}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className={styles.optionCounterNumber}>
                          {options.adult}
                        </span>
                        <button
                          className={styles.optionCounterButton}
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={styles.optionItem}>
                      <span className={styles.optionText}>Children</span>
                      <div className={styles.optionCounter}>
                        <button
                          disabled={options.children <= 0}
                          className={styles.optionCounterButton}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span
                          className={styles.optionCounterNumber}
                        >{`${options.children}`}</span>
                        <button
                          className={styles.optionCounterButton}
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={styles.optionItem}>
                      <span className={styles.optionText}>Room</span>
                      <div className={styles.optionCounter}>
                        <button
                          disabled={options.room <= 1}
                          className={styles.optionCounterButton}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span
                          className={styles.optionCounterNumber}
                        >{`${options.room}`}</span>
                        <button
                          className={styles.optionCounterButton}
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.headerSearchItem}>
                <button className={styles.headerBtn}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
