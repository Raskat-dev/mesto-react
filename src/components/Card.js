import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
const {name, link, likes} = props.card;
  return (
    <li className="card">
        <img data-link="" className="card__image" alt="" src={link} onClick={handleClick}/>
        <button type="button" className="card__delete" aria-label="удалить"></button>
        <div className="card__description">
          <h2 data-place="" className="card__title">{name}</h2>
          <div className="card__like-information">
            <button type="button" className="card__like" aria-label="лайк"></button>
            <p className="card__likes-number">{likes.length}</p>
          </div>
        </div>
    </li>
  );
}

export default Card;
