import { useEffect, useState } from "react";
import CalenderIcon from "./common/CalenderIcon";
import { DatePickerProps } from "./common/DatePicker.type";
import styles from "./DatePicker.module.css";

function DatePicker(props: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(props.selectedDate);
  const todaysDate: Date = new Date();
  const [isCalenderOpen, setIsCalenderOpen] = useState<boolean>(false);
  const [monthInCalender, setMonthInCalender] = useState<number>(0);
  const [daysCount, setDaysCount] = useState<number>(0);
  const [yearInCalender, setYearInCalender] = useState<number>(0);
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const year = selectedDate ? selectedDate.getFullYear() : todaysDate.getFullYear();
    const monthIndex = selectedDate ? selectedDate.getMonth() : todaysDate.getMonth();
    setDaysCountByMonth(monthIndex, year);
    setMonthInCalender(monthIndex);
    setYearInCalender(year);
  }, [selectedDate]);

  function setDaysCountByMonth(monthIndex: number, year: number) {
    const monthIndexList31 = [0, 2, 4, 6, 7, 9, 11];
    const monthIndexList30 = [3, 5, 8, 10];

    // for Feb
    if (monthIndex === 1) {
      const leapDate = new Date(year, monthIndex, 29);
      // Check if the month is still February and the date is 29
      if (leapDate.getMonth() === 1 && leapDate.getDate() === 29) {
        setDaysCount(29);
      } else {
        setDaysCount(28);
      }
      return;
    }

    if (monthIndexList31.includes(monthIndex)) {
      setDaysCount(31);
      return;
    }

    if (monthIndexList30.includes(monthIndex)) {
      setDaysCount(30);
      return;
    }
  }

  function selectDateHandler(day: number) {
    const date = new Date(yearInCalender, monthInCalender, day);
    setSelectedDate(date);
    props.onSelect(date);
  }

  function toggleCalendar() {
    setIsCalenderOpen(!isCalenderOpen);
  }

  function prevMonthClickHandler() {
    let month = monthInCalender - 1 < 0 ? 11 : monthInCalender - 1;
    let year = monthInCalender - 1 < 0 ? yearInCalender - 1 : yearInCalender;
    setDaysCountByMonth(month, year);
    setMonthInCalender(month);
    setYearInCalender(year);
  }

  function nextMonthClickHandler() {
    let month = monthInCalender + 1 > 11 ? 0 : monthInCalender + 1;
    let year = monthInCalender + 1 > 11 ? yearInCalender + 1 : yearInCalender;
    setDaysCountByMonth(month, year);
    setMonthInCalender(month);
    setYearInCalender(year);
  }

  function getCSSClassesForDay(day: number): string {
    const isToday =
      monthInCalender === todaysDate.getMonth() &&
      yearInCalender === todaysDate.getFullYear() &&
      day === todaysDate.getDate();
    const isSelected =
      selectedDate &&
      monthInCalender === selectedDate.getMonth() &&
      yearInCalender === selectedDate.getFullYear() &&
      day === selectedDate.getDate();

    if (isToday && isSelected) return `${styles.calenderBtn} ${styles.today} ${styles.selected}`;
    if (isToday) return `${styles.calenderBtn} ${styles.today}`;
    if (isSelected) return `${styles.calenderBtn} ${styles.selected}`;
    return styles.calenderBtn;
  }

  return (
    <div className={styles.container}>
      <button className={styles.picker_btn} onClick={toggleCalendar}>
        <CalenderIcon />
        {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
      </button>
      {isCalenderOpen && (
        <div className={styles.calender}>
          <div className={styles.actionContainer}>
            <button className={styles.navBtn} onClick={prevMonthClickHandler}>
              &lt;
            </button>
            <p>
              {monthList[monthInCalender]} {yearInCalender}
            </p>
            <button className={styles.navBtn} onClick={nextMonthClickHandler}>
              &gt;
            </button>
          </div>
          <div className={styles.gridContainer}>
            {Array.from({ length: daysCount }, (_, index) => (
              <button
                key={index}
                onClick={() => selectDateHandler(index + 1)}
                className={getCSSClassesForDay(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
