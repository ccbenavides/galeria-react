import React, { Component } from 'react';
import  { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'
import Pagination from './Pagination';
import ComboFolder from './ComboFolder'
import Upload from './Upload'
import List from './List'
import Loading from './Loading'



const divStyle = {
  marginTop: '22px',
};


class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageCount : 0,
      selected : {
        identificator : 0,
        name : '',
        img_mini : '',
        album : '',                
        image : ''
      },
      folderSelected: this.props.namefolder,
      loading: true,
      images : []
    };
  }


  componentWillMount() {
    let ambito = this;
    setTimeout(function(){
      fetch(ambito.props.uri + ambito.props.namefolder )
        .then((response) => {
          return response.json()
        })
        .then((images) =>  {
          ambito.setState({ 
            images: images.data,
            loading: false,
            pageCount : images.last_page
          })
        });

    }, 1000);

  }

  handlePageClick = e => {
    this.setState({
      loading : true
    });

    let ambito = this;
    setTimeout(function(){
      fetch(ambito.props.uri + ambito.state.folderSelected +'&page=' + (e.selected + 1))
        .then((response) => {
          return response.json()
        })
        .then((images) => {
          ambito.setState({ 
            images: images.data,
            loading: false
          })
        });

    }, 1000);
  }

  
  onClickImg = e => {
    if(e.target.id === "removeImage"){
      let current = e.currentTarget.id;
      let ambito = this;
      confirmAlert({
        title: 'Remover',                        // Title dialog 
        message: 'Estas seguro de esto.',               // Message dialog 
        childrenElement: () => <div>una vez eliminado no se podra recuperar</div>,       // Custom UI or Component 
        confirmLabel: 'Eliminar',                           // Text button confirm 
        cancelLabel: 'Cancelar',                             // Text button cancel 
        onConfirm: () => {
          this.setState({
            loading : true
          });
          let formData = new FormData();
          formData.append("folder", ambito.state.folderSelected);
          formData.append("image", current );
          fetch(ambito.props.deleteurl, {
            method: 'POST',
            body: formData
          }).then(function (response) {
              if(response){
                setTimeout(function(){
                  fetch(ambito.props.uri + ambito.state.folderSelected)
                    .then((response) => {
                      return response.json()
                    })
                    .then((images) =>  {
                      ambito.setState({ 
                        images: images.data,
                        loading: false,
                        pageCount : images.last_page
                      })
                    });
            
                }, 1000);

              }
            });
        },    // Action after Confirm 
        onCancel: () => console.log("cancelo acción"),      // Action after Cancel 
      })
    }else{
      let selected = this.state.images.filter(k => k.id === parseInt(e.currentTarget.id, 0) );
      this.setState({
          selected : {
            id: selected[0].id,
            album: selected[0].album,
            img_mini: selected[0].img_mini,
            name: selected[0].name,
            reference: selected[0].reference,
            created_at: selected[0].created_at,
            updated_at: selected[0].updated_at
          }
      }); 

    }
  }

  changeUpload = e => {
    this.setState({
      loading : true
    });
    let ambito = this;
    let formData = new FormData();
    let ins = e.target.files.length;
    for(let x = 0; x < ins; x++){
      formData.append("image[]", e.target.files[x]);
    }

    formData.append("folder", this.state.folderSelected);
    fetch(this.props.posturl, {
      method: 'POST',
      body: formData
    }).then(function (response) {
      if(response.status === 200){
        setTimeout(function(){
          fetch(ambito.props.uri + ambito.state.folderSelected)
            .then((response) => {
              return response.json()
            })
            .then((images) =>  {
              ambito.setState({ 
                images: images.data,
                loading: false,
                pageCount : images.last_page
              })
            });
    
        }, 1000);
      }else{
        ambito.setState({ 
          loading: false
        })
      }
     // return response
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

  }

  changeFolder = e => {
    this.setState({
      loading : true,
      folderSelected : e.target.value
      
    });
    let ambito = this;
    setTimeout(function(){
      fetch(ambito.props.uri + ambito.state.folderSelected)
        .then((response) => {
          return response.json()
        })
        .then((images) =>  {
          ambito.setState({ 
            images: images.data,
            loading: false,
            pageCount : images.last_page
          })
        });

    }, 1000);
  }

  render() {
    
    return (
      <div className="container-fluid Gallery">
        <div className="row">
            <div className="col-sm-6">
              <Upload 
              changeUpload={this.changeUpload}/>
            </div>
            <div className="col-sm-6">
             <ComboFolder 
             listFolder={ JSON.parse(this.props.folders) }
             folderSelected={this.state.folderSelected}
             changeFolder={this.changeFolder}/>
            </div>
        </div>
        {this.state.loading ? 
          <Loading />
          :
          <List 
          onClickImg={this.onClickImg}
          data={this.state.images}
          selected={this.state.selected}
          baseStorage={this.props.basestorage}
          folder={this.state.folderSelected}
          />
        }
        <div className="row">
          <div className="col-sm-6">
            <Pagination 
              handlePageClick={this.handlePageClick}
              pageCount={this.state.pageCount }
              />
          </div>
          <div className="col-sm-6 text-right" 
              style={divStyle}>
            <input type="hidden" 
                    id="imagenSeleccionada"
                    value={
                       this.state.selected["img_mini"] ? this.props.basestorage + '/'+
                            this.state.selected["album"] + '/' +
                          this.state.selected["name"] : ''} />
            <input type="hidden" 
                    id="imagenSeleccionadaMini"
                    value={
                        this.state.selected["img_mini"] ? this.props.basestorage + '/' +
                            this.state.selected["album"] + '/mini/' +
                            this.state.selected["name"] : ''} />
            <input type="submit" 
                  id="accionSeleccionada"
                  className="btn btn-primary" 
                  value="Aceptar" />
          </div>
        </div>
      
      </div>
    );
  }
}

export default Gallery;
