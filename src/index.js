import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Table';

let rowHeader = document.getElementById("row-header");
let cellsFixed = document.getElementsByClassName("c-1");
window.addEventListener("scroll", function () {
  if (this.pageYOffset > 0) {
    rowHeader.classList.add("row-fixed");
    rowHeader.style.cssText = "left: -" + this.pageXOffset + "px;";
  } else {
    rowHeader.classList.remove("row-fixed");
  }

  for (let i = 0; i < cellsFixed.length; i++) {
    let cell = cellsFixed[i];
    cell.style.cssText = "top: " + (i * 200 - this.pageYOffset) + "px;";
    cell.classList.add("col-fixed");
  }
});

ReactDOM.render(<Table />, document.getElementById('root'));