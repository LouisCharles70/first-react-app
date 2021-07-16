import React, {Component} from "react";

class ListGroup extends Component {
   render() {
      const {
         items,
         selectedItem,
         valueProperty,
         textProperty,
         onItemSelected
      } = this.props;

      return (<div>
         <ul className={"list-group"}>
            {items.map((item) => (
               <li key={item[valueProperty]}
                   className={`list-group-item ${selectedItem === item[textProperty] ? "active" : null}`}
                   onClick={() => onItemSelected(item)}>
                  {item[textProperty]}
               </li>
            ))}
         </ul>
      </div>)
   }
}

ListGroup.defaultProps = {
   textProperty: "name",
   valueProperty: "_id"
}

export default ListGroup;
