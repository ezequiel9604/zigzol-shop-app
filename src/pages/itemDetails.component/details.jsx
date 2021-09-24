import React, { useState } from "react";
import { Link } from "react-router-dom";

function Details(props) {

  const { detail } = props;

  let [itemCapacity, setItemCapacity] = useState(detail.subItem[0].capacity);
  let [itemSize, setItemSize] = useState(detail.subItem[0].size);
  let [itemColor, setItemColor] = useState(detail.subItem[0].color);

  const [itemStock, setItemStock] = useState(detail.subItem[0].stock);
  const [itemCounter, setItemCounter] = useState(0);
  const [itemSelected, setItemSelected] = useState(0);
  const [isTooltipShow, setIsTooltipShow] = useState(false);

  function selectionRender(details, selection) {
    let arr = [];

    if (selection === "Capacity") {
      // creates a new array with a list of capacity values
      details.subItem.map((current) => {
        return arr.push(current.capacity);
      });
    } else if (selection === "Size") {
      // creates a new array with a list of capacity currentues
      details.subItem.map((current) => {
        return arr.push(current.size);
      });
    } else if (selection === "Color") {
      // creates a new array with a list of capacity currentues
      details.subItem.map((current) => {
        return arr.push(current.color);
      });
    }

    // remove dupliques and save it into uniques variable
    const uniques = [...new Set(arr)];

    if (uniques[0] !== null) {
      return (
        <div>
          <strong>{selection}:</strong>

          {uniques.map((current, ind) => {
            return (
              <label htmlFor={selection + current} title={current} key={ind}>
                <input
                  onClick={() => changeSelectionHandler(current, selection)}
                  type="radio"
                  id={selection + current}
                  name={selection}
                  defaultChecked={ind === 0 ? true : false}
                />
                {selection !== "Color" ? (
                  <small>{current}</small>
                ) : (
                  <mark style={{ backgroundColor: current }}></mark>
                )}
                <span className="material-icons-outlined">done</span>
              </label>
            );
          })}
        </div>
      );
    }

    return null;
  }

  function changeItemCounterHandler(simbol) {
    if (simbol === "-") {
      setItemCounter(itemCounter > 0 ? itemCounter - 1 : itemCounter);
    } else if (simbol === "+") {
      setItemCounter(itemCounter < itemStock ? itemCounter + 1 : itemCounter);
    }
  }

  function changeSelectionHandler(value, selection) {

    if (selection === "Capacity") {
      setItemCapacity(value);
    } else if (selection === "Size") {
      setItemSize(value);
    } else if (selection === "Color") {
      setItemColor(value);
    }

    let cont = 0;
    for (let i of props.detail.subItem) {
      if (
        i.capacity === itemCapacity &&
        i.size === itemSize &&
        i.color === itemColor
      ) {
        
        setItemSelected(cont);
        setItemCounter(0);
        setItemStock(i.stock);

        return;
      }

      cont += 1;
    }

    setItemCounter(0);
    setItemStock(0);
  }

  function qualityRender(quality) {
    if (quality <= 1) {
      return (
        <div className="item-details-quality">
          <span className="material-icons">star</span>
          <span className="material-icons">star_outline</span>
          <span className="material-icons">star_outline</span>
          <span className="material-icons">star_outline</span>
          <span className="material-icons">star_outline</span>
          <strong>{parseFloat(quality)}</strong>
        </div>
      );
    } else if (quality <= 2) {
      return (
        <div className="item-details-quality">
          <span className="material-icons">star</span>
          <span className="material-icons">star</span>
          <span className="material-icons">star_outline</span>
          <span className="material-icons">star_outline</span>
          <span className="material-icons">star_outline</span>
          <strong>{parseFloat(quality)}</strong>
        </div>
      );
    } else if (quality <= 3) {
      return (
        <div className="item-details-quality">
          <span className="material-icons">star</span>
          <span className="material-icons">star</span>
          <span className="material-icons">star</span>
          <span className="material-icons">star_outline</span>
          <span className="material-icons">star_outline</span>
          <strong>{parseFloat(quality)}</strong>
        </div>
      );
    } else if (quality <= 4) {
      return (
        <div className="item-details-quality">
          <span className="material-icons">star</span>
          <span className="material-icons">star</span>
          <span className="material-icons">star</span>
          <span className="material-icons">star</span>
          <span className="material-icons">star_outline</span>
          <strong>{parseFloat(quality)}</strong>
        </div>
      );
    }
    return (
      <div className="item-details-quality">
        <span className="material-icons">star</span>
        <span className="material-icons">star</span>
        <span className="material-icons">star</span>
        <span className="material-icons">star</span>
        <span className="material-icons">star</span>
        <strong>{parseFloat(quality)}</strong>
      </div>
    );
  }

  function checkShowTooltip(){
    if(itemCounter>0 || detail.isInCart){
      setIsTooltipShow(false);
    }else{
      setIsTooltipShow(true);
    }
  }

  function changeIsTooltipShow(){
    setIsTooltipShow(false);
  }

  function checkAddToCart(){
    if(itemCounter>0){
      const data = {...props.detail};

    console.log(itemCapacity, itemSize, itemColor);

      data.amount = itemCounter;
      data.retailPrice = props.detail.subItem[itemSelected].retailPrice;
      data.offerPrice = props.detail.subItem[itemSelected].offerPrice;
      data.stock = props.detail.subItem[itemSelected].stock;
      data.subItem = {
        color: itemColor,
        capacity: itemCapacity,
        size: itemSize
      }
      props.onAddItemToCart(data)
    }
  }

  function formatedNumber(num) {
    if (num >= 1000 && num < 10000) {
      let newNum = num + "";
      let formated = "";

      for (let x = 0; x < newNum.length; x++) {
        if (x === 1) {
          formated += ",";
        }
        formated += newNum.charAt(x);
      }

      return formated;
    } else if (num >= 10000) {
      let newNum = num + "";
      let formated = "";

      for (let x = 0; x < newNum.length; x++) {
        if (x === 2) {
          formated += ",";
        }
        formated += newNum.charAt(x);
      }

      return formated;
    }

    return num;
  }

  return (
    <div className="details">
      <h3>{detail.title}</h3>

      <div className="item-details-price">
        <span>${formatedNumber(detail.subItem[itemSelected].offerPrice)}</span>
        <span>${formatedNumber(detail.subItem[itemSelected].retailPrice)}</span>
      </div>

      {qualityRender(detail.quality)}

      <div className="item-details-status">
        <label>
          Estado: <Link to="/">{detail.status}</Link>
        </label>
        <label>
          Departamento: <Link to="/">{detail.department}</Link>
        </label>
      </div>

      <div className="item-details-selection">
        {selectionRender(detail, "Color")}

        {selectionRender(detail, "Size")}

        {selectionRender(detail, "Capacity")}
      </div>

      <div className="item-details-amount">
        <div>
          <button onClick={() => changeItemCounterHandler("-")} className="btn">
            -
          </button>
          <span>{itemCounter}</span>
          <button onClick={() => changeItemCounterHandler("+")} className="btn">
            +
          </button>
        </div>
        <div>{<strong>Quedan {itemStock} disponibles.</strong>}</div>
      </div>

      <div className="button-actions">
        <button className="btn">
          Comprar ahora
        </button>

        <button className={(detail.isInCart)?'btn btn-added-to-cart':'btn'}
          onClick={checkAddToCart}
          onMouseEnter={checkShowTooltip}
          onMouseLeave={changeIsTooltipShow}>
          {(detail.isInCart)? 'Agregado al carrito':'Agregar al carrito'}

          <div style={(isTooltipShow)?{display:"block"}:{display:"none"}}
            className="tooltips-button-actions">
            Selecciona una de las opciones del producto.
          </div>

        </button>

        <button className="btn">
          <span className="material-icons-outlined">favorite_border</span>
        </button>
      </div>
      
    </div>
  );
}

export default Details;
