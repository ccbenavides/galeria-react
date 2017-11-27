import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';

export default class Pagination extends Component {


    render() {
        return (
            this.props.pageCount > 1 ? <ReactPaginate previousLabel={"anterior"}
            nextLabel={"siguiente"}
            breakLabel={ <span>...</span>}
            breakClassName={"break-me"}
            pageCount={this.props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={this.props.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} /> : 
            <div></div>
        )
  }
}
