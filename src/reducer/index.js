import {combineReducers} from "redux";
import tasks from "./tasks";
const myreducer=combineReducers({
    tasks:tasks
});
export default myreducer;