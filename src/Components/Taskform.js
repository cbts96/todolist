import React, { Component } from 'react'



export default class Taskform extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      status: false,
      id:""
    }
  }
  componentWillMount(){
    if(this.props.task){
      this.setState({
        id:this.props.task.id,
        name:this.props.task.name,
        status:this.props.task.status,
      });
      
    }
  }
  onChange=(event)=>{
    var target=event.target;
    var name= target.name;
    var value=target.value;
    if(name==="status"){
      value=target.value?true:false
    }
    this.setState({
      [name]:value
    });
  }
  onsubmit=(event)=>{
    event.preventDefault();
    this.props.onsubmit(this.state);
  }
  onclear=()=>{
    this.setState({
      name:"",
      status:false
    });
    this.oncloseform();
  }
  oncloseform=()=>{
    this.props.closeform();
  }
    render() {
      var {id}=this.state;
        return (
            <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id!==""?"Thêm Công Việc":"Cap nhat"} <span className="fa fa-times-circle text-right" onClick={this.props.closeform}></span></h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onsubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control"name="name" value={this.state.name} onChange={this.onChange} />
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onclear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
        )
    }
}
