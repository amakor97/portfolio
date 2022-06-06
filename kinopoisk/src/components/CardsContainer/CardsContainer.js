import { useState, useEffect } from "react";

import Card from "../Card/Card";

import "./_cardsContainer.sass";

function CardsContainer(props) {

  
  return (
    <div className="CardsContainer">
      <Card />
    </div>
  )
}

export default CardsContainer;