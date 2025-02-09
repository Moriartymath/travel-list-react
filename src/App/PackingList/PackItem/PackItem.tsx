import { useEffect, useRef, useState } from "react";
import "./PackItem.css";
import PackItemType from "./PackItemType";

type PackItemProps = {
  item: PackItemType;
  setItems: Function;
};

function PackItem({ item, setItems }: PackItemProps) {
  const [packed, setPacked] = useState(item.packed);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      setItems((items: Array<PackItemType>) => {
        const copy = items.slice();
        const itemIndex = copy.findIndex((itm) => itm === item);
        copy.splice(itemIndex, 1, { ...item, packed });
        return copy;
      });
    }
    isInitialRender.current = false;
  }, [packed, setItems]);

  return (
    <li className={`item${packed ? " packed" : ""}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={packed}
        onChange={(ev) => setPacked((isPacked) => !isPacked)}
      />
      <p className="item--text">
        <span className="item--count">{item.itemCount}</span>
        {item.itemName}
      </p>
      <button
        className="delete"
        onClick={() =>
          setItems((currItems: Array<PackItemType>) =>
            currItems.filter((currItem) => currItem !== item)
          )
        }
      >
        &#x2715;
      </button>
    </li>
  );
}

export default PackItem;
