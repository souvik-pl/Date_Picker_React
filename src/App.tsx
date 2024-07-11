import styles from "./App.module.css";
import DatePicker from "./DatePicker/DatePicker";

function App() {
  function selectDateHandler(date: Date) {
    console.log(date);
  }

  return (
    <div className={styles.container}>
      <DatePicker onSelect={selectDateHandler} />
    </div>
  );
}

export default App;
