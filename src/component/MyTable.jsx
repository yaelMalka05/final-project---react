import { useSelector } from 'react-redux';
import DayItem from './DayItem';
import { Link } from 'react-router-dom';

export const MyTable = () => {
    const days = useSelector((state) => state.days || []);

    return (
        <div>
            <h2>Weekly Table</h2>
            <div className="card table-wrap">
                <table className="table" aria-label="Weekly medications">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Medication</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day) => (
                            <DayItem key={day.id} day={day} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <Link to="/add"><button className="btn">Add Medication</button></Link>
            </div>
        </div>
    );
};

export default MyTable;