import React from "react";
import { useEffect, useState } from "react";
import ClayTable from "@clayui/table";
import useModalProductStore from "http://127.0.0.1:5500/modules/idispenser/src/main/resources/META-INF/resources/lib/stores/modalProductStore";

function SelectableSingleItemRow(props) {
  const replacementItem = useModalProductStore((state) => state.replaceBy);
  const setReplacement = useModalProductStore((state) => state.setReplaceBy);

  const handleClick = () => {
    setReplacement(props);
  };
  const [isSelected, setIsSelected] = useState(replacementItem.id === props.id);

  useEffect(() => {
    setIsSelected(replacementItem.id === props.id);
  }, [replacementItem]);

  return (
    <ClayTable.Row
      className={"modal--replacetable--body--" + props.id + props.estadoClass}
      onClick={handleClick}
    >
      <ClayTable.Cell className="selectable-item--checkbox">
        {isSelected ? (
          <span className="icon icon-circle"></span>
        ) : (
          <span className="icon icon-circle-o"></span>
        )}
      </ClayTable.Cell>
      {props.children}
    </ClayTable.Row>
  );
}

export default SelectableSingleItemRow;
