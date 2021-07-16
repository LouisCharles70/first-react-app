import React, {Component} from "react";
import _ from "lodash";
import PropTypes from "prop-types";


class Pagination extends Component {
   state = {
      numberOfPages: Math.ceil(this.props.itemsCount / this.props.pageSize)
   }

   render(){
      const pages = _.range(1, this.state.numberOfPages +1)

      return(<div>
         <nav aria-label="Page navigation example">
            <ul className="pagination">
               {pages.map((page) => (
                  <li key={page} onClick={() => this.props.onPageSelected(page)}
                      className={`page-item ${this.props.currentPage === page ? 'active' : null}`}>
                     <a className="page-link" href={"#/"}>{page}</a>
                  </li>
               ))}
            </ul>
         </nav>
      </div>)
   }

}

Pagination.propTypes = {
   itemsCount: PropTypes.number.isRequired,
   pageSize: PropTypes.number.isRequired,
   currentPage: PropTypes.number.isRequired,
   onPageSelected: PropTypes.func.isRequired
}

export default Pagination;
