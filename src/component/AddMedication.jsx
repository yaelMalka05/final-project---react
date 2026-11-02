import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMed } from "../redux/DaysSlice";
import { useState, useEffect } from "react";

const AddMedication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const days = useSelector(s => s.days || []);

  const [selected, setSelected] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (selectAll) setSelected(new Set(days.map(d => d.id)));
    if (!selectAll) setSelected(new Set());
  }, [selectAll, days]);

  const toggleDay = (id) => {
    if (selectAll) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const valid = (selectAll ? days.length > 0 : selected.size > 0) && name.trim() !== "" && dosage.trim() !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    const baseId = Date.now();
    const targets = selectAll ? days.map(d => d.id) : Array.from(selected);
    targets.forEach((dId, idx) => {
      const med = { id: `${baseId}-${dId}-${idx}`, name: name.trim(), dosage: dosage.trim() };
      dispatch(addMed(dId, med));
    });

    navigate("/table");
  };

  return (
    <div className="card">
      <h3>add medication</h3>
      <form onSubmit={onSubmit}>
        <div >
          <label>
            <input type="checkbox" checked={selectAll} onChange={e => setSelectAll(e.target.checked)} /> all days
          </label>
        </div>

        <div className="checkbox-list">
          {days.map(d => (
            <label key={d.id}>
              <input type="checkbox" checked={selected.has(d.id)} onChange={() => toggleDay(d.id)} disabled={selectAll} />
              <span>{d.name}</span>
            </label>
          ))}
        </div>
            <br /><br />
        <div className="form-row">
          <label>medication name:</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} onBlur={() => setTouched(true)} />
        </div>

        <div className="form-row">
          <label>amount:</label>
          <input className="input" value={dosage} onChange={e => setDosage(e.target.value)} onBlur={() => setTouched(true)} />
        </div>

        {!valid && touched && (
          <div>
            You must fill in the name of the medicine, amount and select at least one day (or "all days").
          </div>
        )}

        <div className="home-button">
          <button className="btn" type="submit" disabled={!valid}>add</button>
          <button type="button" className="btn secondary"  onClick={() => navigate(-1)}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMedication;