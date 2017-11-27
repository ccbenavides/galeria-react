import React, { Component } from 'react'

export default class ComboFolder extends Component {
  render() {

    return (
      <div className="form-group">      
        <select 
          className="form-control"
          onChange={this.props.changeFolder}
          value={this.props.folderSelected}>
            { this.props.listFolder.map(e => 
                  <option                   
                    key={"folder_"+ e.id }
                    value={e.name_folder} > 
                    {e.name} </option> ) }
        </select>
      </div>
    )
  }
}
