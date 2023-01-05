import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) => {
  //Props have to be passed as objects in curly brackets.
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item._id}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
