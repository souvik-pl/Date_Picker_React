import styles from "./App.module.css";
import DatePicker from "./DatePicker/DatePicker";

function App() {
  function selectDateHandler(date: Date) {
    console.log(date);
  }

  return (
    <div className={styles.container}>
      <DatePicker onSelect={selectDateHandler} />
      {/* <DatePicker onSelect={selectDateHandler} selectedDate={new Date(2024, 1, 15)} /> */}
    </div>
  );
}

export default App;
