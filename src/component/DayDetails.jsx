import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteMed, deleteMedAll } from "../redux/DaysSlice";
import { useState } from "react";


const DeleteConfirm = ({ med, dayId, onCancel, onDone }) => {
    const [mode, setMode] = useState("this");
    const dispatch = useDispatch();

    const confirm = () => {
        if (mode === "this") dispatch(deleteMed(dayId, med.id));
        else dispatch(deleteMedAll(med.name));
        onDone();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>delete medication</h3>
                <p>Are you sure you want to remove "{med.name}"?</p>

                <div>
                    <label>
                        <input type="radio" name="delmode" value="this" checked={mode === "this"} onChange={() => setMode("this")} />
                        delete from this day only
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="delmode" value="all" checked={mode === "all"} onChange={() => setMode("all")} />
                        delete all instances (from all days)
                    </label>
                </div>

                <div className="update-buttons">
                    <button className="btn" onClick={confirm}>confirm</button>
                    <button className="btn secondary" onClick={onCancel} >cancel</button>
                </div>
            </div>
        </div>
    );
};

const DayDetails = () => {
    const { dayId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const day = useSelector(state => (state.days || []).find(d => d.id === dayId));
    const [confirmMed, setConfirmMed] = useState(null);

    if (!day) return <div>Day not found</div>;

    return (
        <div>
            <h2>{day.name}</h2>
            {/* <ul>
                {(day.meds || []).map(m => (
                    <li key={m.id} >
                        <span>{m.name} — {m.dosage}</span>
                        <button className="btn" onClick={() => navigate(`/update/${dayId}/${m.id}`)}>update</button>
                        <button className="btn" onClick={() => setConfirmMed(m)}>delete</button>
                        {/* <Link to={`/update/${dayId}/${m.id}`}><button className="delete-btn">update</button></Link>
            <button className="update-btn" onClick={() => setConfirmMed(m)} >delete</button> */}
            {/* </li>
    ))
} */}
            {/* // </ul > */}

            {/* <div className="day-details-container">
                {(day.meds || []).map(m => (
                    <div key={m.id} className="med-card">
                        <span>{m.name} — {m.dosage}</span>
                        <div className="med-buttons">
                            <button className="btn" onClick={() => navigate(`/update/${dayId}/${m.id}`)}>update</button>
                            <button className="btn secondary" onClick={() => setConfirmMed(m)}>delete</button>
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="day-details-container">
                {(day.meds || []).map(m => (
                    <div key={m.id} className="med-card">
                        <span>{m.name} — {m.dosage}</span>
                        <div className="med-buttons">
                            <button className="btn" onClick={() => navigate(`/update/${dayId}/${m.id}`)}>update</button>
                            <button className="btn secondary" onClick={() => setConfirmMed(m)}>delete</button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="update-buttons bottom-buttons">
                <button className="btn ghost" onClick={() => navigate(-1)}>Back</button>
                <Link to={`/add`}><button className="btn secondary" >add new</button></Link>
            </div>

            {
                confirmMed && (
                    <DeleteConfirm
                        med={confirmMed}
                        dayId={dayId}
                        onCancel={() => setConfirmMed(null)}
                        onDone={() => setConfirmMed(null)}
                    />
                )
            }
        </div >
    );
};

export default DayDetails;