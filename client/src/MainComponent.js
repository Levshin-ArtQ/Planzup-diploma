import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./MainComponent.css";
// import { use } from "../../server/routes/reservations";

const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");

  const getAllNumbers = useCallback(async () => {
    // we will use nginx to redirect it to the proper URL
    const data = await axios.get("/api/values/all");
    setValues(data.data.rows.map(row => row.number));
  }, []);


  const saveNumber = useCallback(
    async event => {
      event.preventDefault();

      await axios.post("/api/values", {
        value
      });

      setValue("");
      getAllNumbers();
    },
    [value, getAllNumbers]
  );
  const newReservation = { 
    userId: '-0', 
    place: 'Home', 
    master: 'Elena', 
    serviceId: null, 
    serviceName: 'Haircut', 
    chosenDTime: Date.now(), 
    tgChat: 'later', 
    note: "note for future life",
  }

  const saveReservation = useCallback(
    async event => {
      event.preventDefault();

      await axios
        .post("/api/reservations/", newReservation)
        .then((response) => setAnswer(response.data));
    },
    [newReservation]
  );

  useEffect(() => {
    getAllNumbers();
  }, []);
  

  return (
    <div>
      <button onClick={getAllNumbers}>Get all numbers</button>
      <br />
      <span className="title">Values</span>
      <div className="values">
        {values.map(value => (
          <div className="value">{value}</div>
        ))}
      </div>
      <form className="form" onSubmit={saveNumber}>
        <label>Enter your value: </label>
        <input
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
      <form className="form" onSubmit={saveReservation}>
      <button>сохрани</button>

      <span className="title">{answer.toString()}</span>
      </form>
    </div>
  );
};

export default MainComponent;
