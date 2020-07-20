import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [imageData, setImageData] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setImageData({})//! если обнулять при закрытии, то картинка исчезает до закрытия анимации
    setImageData(card)
    setSelectedCard(true)
  }

  function closeAllPopups() {
    if (isEditAvatarPopupOpen) {
      setIsEditAvatarPopupOpen(false);
    }
    if (isEditProfilePopupOpen) {
      setIsEditProfilePopupOpen(false);
    }
    if (isAddPlacePopupOpen) {
      setIsAddPlacePopupOpen(false);
    }
    if (selectedCard) {
      setSelectedCard(false);

    }
  }

return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm name="popup_avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <div className="popup__input-field">
          <input id="avatar-input" className="popup__input popup__input_avatar" type="url" defaultValue ="" placeholder="Ссылка на аватар" name="avatar" required />
          <span id="avatar-input-error" className="popup__input-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="popup_author" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <div className="popup__input-field">
          <input id="name-input" className="popup__input popup__input_name" type="text" defaultValue=""  placeholder="Введите имя" name="name" required minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" />
          <span id="name-input-error" className="popup__input-error"></span>
        </div>
        <div className="popup__input-field">
          <input id="job-input" className="popup__input popup__input_job" type="text" defaultValue ="" placeholder="Род занятий" name="about" required minLength="2" maxLength="200" />
          <span id="job-input-error" className="popup__input-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="popup_card" title="Новое место" buttonText="Сохранить" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="popup__input-field">
          <input id="place-input" className="popup__input popup__input_place" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
          <span id="place-input-error" className="popup__input-error"></span>
        </div>
        <div className="popup__input-field">
          <input id="link-input" className="popup__input popup__input_link" type="url" placeholder="Ссылка на картинку" name="link" required />
          <span id="link-input-error" className="popup__input-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm name="popup_delete" title="Вы уверены?" buttonText="Да" titleModifier="popup__title_delete">
        <div className="popup__input-field">
          <input id="place-input" className="popup__input popup__input_place" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
          <span id="place-input-error" className="popup__input-error"></span>
        </div>
        <div className="popup__input-field">
          <input id="link-input" className="popup__input popup__input_link" type="url" placeholder="Ссылка на картинку" name="link" required />
          <span id="link-input-error" className="popup__input-error"></span>
        </div>
      </PopupWithForm>
      <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} name={imageData.name} link={imageData.link} />
      </div>
  );
}

export default App;
