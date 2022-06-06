import "./_card.sass";

function Card(props) {
  return (
      <div className="Card">
        <p>{props.nameRu}</p>
      </div>
  )
}

export default Card;