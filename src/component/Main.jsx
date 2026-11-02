import { Routing } from "./Routing"
import { Provider } from "react-redux"
// import  store  from "../redux/store"
import store  from "../redux/store"






export const Main = () => {
    return <>
        <Provider store={store}>
           <Routing></Routing>
        </Provider>

    </>
}