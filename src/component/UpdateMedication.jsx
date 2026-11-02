import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateMed } from "../redux/DaysSlice";
import { useState, useEffect } from "react";


const UpdateMedication = () => {
  const { dayId, medId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const day = useSelector(state => (state.days || []).find(d => d.id === dayId));
  const med = day ? (day.meds || []).find(m => m.id === medId) : null;

  const [dosage, setDosage] = useState(med ? med.dosage : "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (med) setDosage(med.dosage);
  }, [med]);

  if (!day || !med) return <div className="card">Medication not found.</div>;

  const valid = dosage.trim() !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    dispatch(updateMed(dayId, medId, { dosage: dosage.trim() }));
    navigate(`/day/${dayId}`);
  };

  return (
    <div className="update-card">
      <h3>Update Dosage</h3>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label>Day:</label>
          <div>{day.name}</div>
        </div>

        <div className="form-row">
          <label>Medication Name:</label>
          <div>{med.name}</div>
        </div>

        <div className="form-row">
          <label>Dosage:</label>
          <input className="input" value={dosage} onChange={e => setDosage(e.target.value)} onBlur={() => setTouched(true)} />
        </div>

        {!valid && touched && (
          <div>
            Please fill in the dosage field.
          </div>
        )}

        <div className="update-buttons">
          <button className="btn" type="submit" disabled={!valid}>Save</button>
          <button type="button" className="btn secondary"  onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMedication;