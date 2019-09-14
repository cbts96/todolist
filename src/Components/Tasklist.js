import React, { Component } from 'react'
import Taskitem from './Taskitem';
import {connect} from "react-redux";


class Tasklist extends Component {
  constructor(props) {
    super(props);
    this.state={
      filtername:"",
      fliterstatus:-1,
    }
  }
  onChange=(event)=>{
        this.props.onfilter(event.target.name==="filtername"?event.target.value:this.state.filtername,event.target.status==="filterstatus"?event.target.value:this.state.filterstatus)
        this.setState({
          [event.target.name]:event.target.value
        });
      }
    render() {
        
      
        var {tasks}=this.props;
        var elementtasks=tasks.map((value,key)=>{
            return <Taskitem key={key} index={key} task={value} name={value.name} status={value.status} onupdate={this.props.onupdate} ondelete={this.props.ondelete} onupdatestatus={this.props.onupdatestatus}/>
        })
        return (
            <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input type="text" className="form-control" name="filtername" value={this.state.filtername} onChange={this.onChange} />
                </td>
                <td>
                  <select className="form-control" name="filterstatus" value={this.state.filterstatus} onChange={this.onChange}>
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              
              {elementtasks}
            </tbody>
          </table>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);