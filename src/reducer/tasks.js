import * as types from "./../constant/actiontype";
var data=JSON.parse(localStorage.getItem("tasks"));
var initialstate= data ? data: []
var myreducer=(state=initialstate,action)=>{
    switch(action.type){
        case types.list_all:
            return [...state];
        default: return state;
    }
    
};
export default myreducer;