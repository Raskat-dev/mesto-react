import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { apiRequest } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [imageData, setImageData] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    Promise.all([apiRequest.getProfileInfo(), apiRequest.getCardsFromServer()])
      .then(([user, cards]) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }, []);

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
    setImageData(card);
    setSelectedCard(true);
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

  function handleUpdateUser(user) {
    apiRequest
      .changeProfileInfo(user)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleUpdateAvatar(user) {
    apiRequest
      .changeProfileAvatar(user)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }
  // * Функции и стейк cards
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const apiChangeLike = (newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    };
    // * Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      apiRequest
        .addLike(card._id)
        .then(apiChangeLike)
        .catch((err) => {
          console.log(`Ошибка ${err}.`);
        });
    } else {
      apiRequest
        .deleteLike(card._id)
        .then(apiChangeLike)
        .catch((err) => {
          console.log(`Ошибка ${err}.`);
        });
    }
  }
  function handleCardDelete(card) {
    apiRequest
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    apiRequest
      .addNewCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}.`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="popup_delete"
          title="Вы уверены?"
          buttonText="Да"
          titleModifier="popup__title_delete"
        >
          <div className="popup__input-field">
            <input
              id="place-input"
              className="popup__input popup__input_place"
              type="text"
              placeholder="Название"
              name="name"
              minLength="2"
              maxLength="30"
              required
            />
            <span id="place-input-error" className="popup__input-error"></span>
          </div>
          <div className="popup__input-field">
            <input
              id="link-input"
              className="popup__input popup__input_link"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              required
            />
            <span id="link-input-error" className="popup__input-error"></span>
          </div>
        </PopupWithForm>
        <ImagePopup
          isOpen={selectedCard}
          onClose={closeAllPopups}
          name={imageData.name}
          link={imageData.link}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
