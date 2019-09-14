import React, { Component } from 'react'


export default class Taskitem extends Component {
  onupdatestatus=()=>{
   
      this.props.onupdatestatus(this.props.task.id);  
  }
  ondelete=()=>{
    this.props.ondelete(this.props.task.id);
  }
  onupdate=()=>{
    this.props.onupdate(this.props.task.id);
  }
    render() {
      
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td>{this.props.name}</td>
                <td className="text-center">
                  <span className={this.props.status?"label label-success":"label label-danger"}
                  onClick={this.onupdatestatus}>
                    {this.props.status?"kich hoat" :"an"}
                  </span>
                </td>
                <td className="text-center">
                  <button type="button" className="btn btn-warning" onClick={this.onupdate}>
                    <span className="fa fa-pencil mr-5" />Sửa
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-danger" onClick={this.ondelete}>
                    <span className="fa fa-trash mr-5" />Xóa
                  </button>
                </td>
              </tr>
        )
    }
}
