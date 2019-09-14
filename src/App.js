import React, { Component } from 'react';

import './App.css';
import Taskform from './Components/Taskform';
import Control from './Components/Control';
import Tasklist from './Components/Tasklist';
import {findIndex} from "lodash";







const uuidv1 = require('uuid/v1');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      tasks:[],
      showform:false,
      taskediting:null,
      filter:{
        name:"",
        status:-1
      },
      keyword:"",
    }  
  }
  ongenratedata=()=>{
    var tasks=[
      {
        id:uuidv1(),
        name:"le van A",
        status: true
      },
      {
        id:uuidv1(),
        name:"le van C ",
        status: false
      },
      {
        id:uuidv1(),
        name:"le van D",
        status: true
      },

    ]
    this.setState({tasks:tasks});
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }
  onfilter=(filtername,filterstatus)=>{
    filterstatus=parseInt(filterstatus,10);
    this.setState({
      filter:{
        name:filtername.toLowerCase(),
        status:filterstatus
      }
    });
    
    
    

  }
  componentWillMount(){
    if(localStorage&&localStorage.getItem("tasks")){
      var tasks=JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks:tasks
      });
    }
  }
  ondelete=(id)=>{
    var {tasks}=this.state;
    var index=this.findindex(id);
    if(index!==-1){
      tasks.splice(index,1);
      this.setState({
        tasks:tasks
      });
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  onupdatestatus=(id)=>{
    var {tasks}=this.state;
    //var index=this.findindex(id);
    var index=findIndex(tasks,(task)=>{
      return task.id===id
    })
    
      tasks[index].status=!tasks[index].status;
      this.setState({
        tasks:tasks
      });
    
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  findindex=(id)=>{
    var result=-1;
    var {tasks}=this.state;
    tasks.map((value,index)=>{
      if(value.id===id){
        result= index;
      }
    })
    return result;
  }
  toggleform=(props)=>{
    this.setState({showform:!this.state.showform});
  }
  onshowform=()=>{
    this.setState({
      showform:true
    });
  }
  oncloseform=(props)=>{
    this.setState({showform:false});
  }
  onsubmit=(data)=>{
    var {tasks}=this.state;
    if(data.id===""){
      data.id=uuidv1();
      tasks.push(data);
    }
    else{
      var index=this.findindex(data.id);
      tasks[index]=data
    }
    
    this.setState({tasks:tasks});
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  onupdate=(id)=>{
    var {tasks}=this.state;
    var index=this.findindex(id);
    var taskediting=tasks[index];
    this.setState({
      taskediting:taskediting
    });
    this.onshowform();
  }
onsearch=(keyword)=>{
  this.setState({
    keyword:keyword
  });
}
  render() { 
    var {tasks,taskediting,filter}=this.state;
    
      if(filter.name){
        tasks=tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name)!==-1;
        })
      }
    
    tasks=tasks.filter((task)=>{
      if(filter.status===-1){
        return task;
      }else{
        return task.status===(filter.status===1?true:false)
      }
    })
    
      tasks=tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(this.state.keyword.toLowerCase())!==-1;
      })
      
    
    var elementform= this.state.showform?<Taskform closeform={this.oncloseform} task={taskediting} onsubmit={this.onsubmit}/>:"";
    
   
    return (
      <div className="container">
    <div className="text-center">
      <h1>Quản Lý Công Việc</h1>
      <hr />
    </div>
    <div className="row">
      <div className={this.state.showform?"col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
        {elementform}
      </div>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <button type="button" className="btn btn-primary" onClick={this.toggleform}>
          <span className="fa fa-plus mr-5" />Thêm Công Việc
        </button>
        <button type="button" className="btn btn-danger" onClick={this.ongenratedata}>
          <span className="fa fa-plus mr-5" />Generate id
        </button>
        <div className="row mt-15">
       <Control onsearch={this.onsearch}/>
        </div>
        <div className="row mt-15">
          <div className={this.state.showform?"col-8":"col-12"}>
           <Tasklist onupdatestatus={this.onupdatestatus} onfilter={this.onfilter} ondelete={this.ondelete} onupdate={this.onupdate}/>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}
}



