import React, { Component } from 'react'
import Search from './Search';
import Sort from './Sort';

export default class Control extends Component {
    render() {
        return (
            <div>
            <Search onsearch={this.props.onsearch}/>
            <Sort/>
          </div>
        )
    }
}
