
const initialState = {
  days: [
    { id: "sunday", name: "sunday", meds: [] },
    { id: "monday", name: "monday", meds: [] },
    { id: "tuesday", name: "tuesday", meds: [] },
    { id: "wednesday", name: "wednesday", meds: [] },
    { id: "thursday", name: "thursday", meds: [] },
    { id: "friday", name: "friday", meds: [] },
    { id: "saturday", name: "saturday", meds: [] }
  ]
};

export const ADD_MED = "ADD_MED";
export const UPDATE_MED = "UPDATE_MED";
export const DELETE_MED = "DELETE_MED";
export const DELETE_MED_ALL = "DELETE_MED_ALL";

export const addMed = (dayId, med) => ({ type: ADD_MED, payload: { dayId, med } });
export const updateMed = (dayId, medId, updated) => ({ type: UPDATE_MED, payload: { dayId, medId, updated } });
export const deleteMed = (dayId, medId) => ({ type: DELETE_MED, payload: { dayId, medId } });
export const deleteMedAll = (medName) => ({ type: DELETE_MED_ALL, payload: { medName } });

export default function daysReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MED: {
      const { dayId, med } = action.payload;
      return {
        ...state,
        days: state.days.map(d => d.id === dayId ? { ...d, meds: [...(d.meds || []), med] } : d)
      };
    }
    case UPDATE_MED: {
      const { dayId, medId, updated } = action.payload;
      return {
        ...state,
        days: state.days.map(d =>
          d.id === dayId ? { ...d, meds: (d.meds || []).map(m => m.id === medId ? { ...m, ...updated } : m) } : d
        )
      };
    }
    case DELETE_MED: {
      const { dayId, medId } = action.payload;
      return {
        ...state,
        days: state.days.map(d => d.id === dayId ? { ...d, meds: (d.meds || []).filter(m => m.id !== medId) } : d)
      };
    }
    case DELETE_MED_ALL: {
      const { medName } = action.payload;
      return {
        ...state,
        days: state.days.map(d => ({ ...d, meds: (d.meds || []).filter(m => m.name !== medName) }))
      };
    }
    default:
      return state;
  }
}
