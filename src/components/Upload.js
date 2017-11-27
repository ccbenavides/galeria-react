import React, { Component } from 'react'

export default class Upload extends Component {
  render() {
    return (
    <div>      
        <label htmlFor="fileUpload" className="custom-file-upload btn btn-info btn-rounded btn-outline">
            <i className="ti-cloud-up"></i> Subir Imagen
        </label>
        <input id="fileUpload" 
                type="file" 
                multiple 
                accept="image/png,image/jpg"
                onChange={this.props.changeUpload}
                style={{display : 'none'}}/>
    </div>
    )
  }
}
