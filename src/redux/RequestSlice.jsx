
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: []
}

const RequestSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            state.list.push(action.payload)
        },
        remove: (state, action) => {
            state.list = state.list.filter(m => m.id !== action.payload.id)
        }
       
    }
})

export const {add, remove} = RequestSlice.actions

export default RequestSlice.reducer

