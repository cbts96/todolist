import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state={
      keyword:"",
    }
  }
  
  onChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    });
  }
  onsearch=()=>{
   this.props.onsearch(this.state.keyword);
  }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
              <input type="text" className="form-control" name="keyword" value={this.state.keyword} placeholder="Nhập từ khóa..." onChange={this.onChange}/>
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.onsearch}>
                  <span className="fa fa-search mr-5"  />Tìm
                </button>
              </span>
            </div>
          </div>
        )
    }
}
