import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown} from "@fortawesome/free-solid-svg-icons";


class TableHeader extends Component {
   raiseSort = (path) => {
      const sortColumn= {...this.props.sortColumn};

      if(sortColumn.path===path)
         sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
      else {
         sortColumn.path = path;
         sortColumn.order = "asc";
      }

      this.props.onSort(sortColumn);
   }

   renderSortIcon = (column) => {
      if(column.path !== this.props.sortColumn.path) return null;

      if(this.props.sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortUp}/>

      return <FontAwesomeIcon icon={faSortDown}/>
   }

   render() {
      return (<thead>
      <tr>
         {this.props.columns.map(column => (
            <th onClick={() => this.raiseSort(column.path)} key={column.path || column.key} className={"clickable"}>
               <div className="row">
                  <div className="col-6">{column.label}</div>
                  <div className="col-6 text-right">{this.renderSortIcon(column)}</div>
               </div>
            </th>
         ))}
      </tr>
      </thead>)
   }
}

export default TableHeader;
