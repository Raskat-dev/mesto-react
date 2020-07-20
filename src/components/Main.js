import React from 'react';
import { apiRequest } from '../utils/Api'
import avatar from '../images/avatar.jpg'
import Card from './Card'

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatar);
  const [cards, setCards] = React.useState([]);


  function setUser (user) {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
  }
  React.useEffect(() => {
    Promise.all([apiRequest.getProfileInfo(), apiRequest.getCardsFromServer()])
   .then(([user, cards]) => {
    setUser(user);
    setCards(cards);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}.`);
    })
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatarblock" onClick={props.onEditAvatar}>
          <div className="profile__editava"></div>
          <img src={userAvatar} alt="аватар" className="profile__avatar" />
        </div>
        <div className="profile__information">
          <div className="profile__user">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
          </div>
            <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}></button>
      </section>
      <ul className="cards">
        {cards.map((card) =>
        <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
        )}
     </ul>
    </main>
  );
}

export default Main;
