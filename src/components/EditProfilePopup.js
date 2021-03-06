import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name && description) {
      onUpdateUser({
        name,
        about: description,
      });
    } else {
      onClose();
    }
  }

  return (
    <PopupWithForm
      name="popup_author"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-field">
        <input
          id="name-input"
          className="popup__input popup__input_name"
          type="text"
          placeholder="Введите имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          pattern="[A-Za-zА-ЯЁа-яё -]{1,}"
          onChange={handleChangeName}
          value={name || ""}
        />
        <span id="name-input-error" className="popup__input-error"></span>
      </div>
      <div className="popup__input-field">
        <input
          id="job-input"
          className="popup__input popup__input_job"
          type="text"
          placeholder="Род занятий"
          name="about"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description || ""}
        />
        <span id="job-input-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
