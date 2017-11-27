import React, { Component } from 'react'


const pointer = {
    cursor : 'pointer',
    marginTop : '5px',
    display : 'block    '
}

const pointerImg = {
    cursor : 'pointer'
}

const active = {
    background : '#5bc0de'
}

export default class ItemList extends Component {
  render() {

    return (
    <div className="col-sm-3"
        onClick={this.props.onClickImg}
        id={this.props.data.id} >
        <div className="gallery-cover text-right" 
             style={ this.props.active ? active : {} }>
            <img className="img-responsive" 
                alt="#"
                style={pointerImg}
                src={this.props.baseStorage + '/' + this.props.folder  +'/mini/'  + this.props.data.name} />
                <a className="text-danger" 
                id="removeImage"
                style={pointer}>Remover</a>
        </div>
    </div>
    )
  }
}
