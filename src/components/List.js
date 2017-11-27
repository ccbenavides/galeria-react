import React, { Component } from 'react'
import ItemList from './ItemList'


export default class List extends Component {
  render() {
    return (
        <div className="row">
            { this.props.data.map( e => 
                <ItemList key={e.id}  
                          onClickImg={this.props.onClickImg}
                          active={this.props.selected.id === e.id ? 
                                  true  : false }
                          baseStorage={this.props.baseStorage}
                          folder={this.props.folder}
                          data={e} /> )}
        </div>
    )
  }
}
