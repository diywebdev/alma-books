const ptPtLanguge = 'pt-pt';
const esEsLanguge = 'es-es';
const enUsLanguage = 'en-us';
const incorrectEmailType = 'incorrect-email';

const nameInputs = document.querySelectorAll('input[name=name]');
const emailInputs = document.querySelectorAll('input[name=email]');
const submitBtn = document.querySelector('.form-btn');
const checkMark = document.querySelector('.form-btn-check-mark');
const errorMessage = document.querySelector('.error-message');
const agreementCheckbox = document.querySelector(
  '.privacy-policy-checkbox__input'
);

let user = {};
let isNameDataValid = false;
let isEmailDataValid = false;

checkMark.classList.add('hidden');

nameInputs[0].addEventListener('input', (e) => {
  if (e.target.value.length == 0) {
    e.target.style.border = 'solid 2px red';
    isNameDataValid = false;
  } else {
    e.target.style.border = 'none';
    isNameDataValid = true;
  }
});

emailInputs[0].addEventListener('input', (e) => {
  if (e.target.value.length == 0) {
    e.target.style.border = 'solid 2px red';
    isEmailDataValid = false;
  } else {
    e.target.style.border = 'none';
    isEmailDataValid = true;
  }
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const bookId = document.querySelector('input[name=product]').value;
  const languageId = document.querySelector('input[name=language]').value;
  let name = nameInputs[0].value.trim();

  if (!name.length) {
    nameInputs[0].style.border = 'solid 2px red';
    isNameDataValid = false;
  } else {
    nameInputs[0].style.border = 'none';
    isNameDataValid = true;
  }

  name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length);
  user.user_name = name;

  let email = emailInputs[0].value;
  user.email = email;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const createFrontError = (languageId, type = null) => {
    if (type === incorrectEmailType) {
      switch (languageId) {
        case enUsLanguage:
          return 'The email entered is incorrect';
        case ptPtLanguge:
          return 'Foi introduzido um e-mail incorreto';
        case esEsLanguge:
          return 'Se ha introducido un email incorrecto'
        default:
          return '';
      }
    }

    switch (languageId) {
      case enUsLanguage:
        return 'Something was wrong';
      case ptPtLanguge:
        return 'Ocorreu um erro no servidor';
      case esEsLanguge:
        return 'Algo salió mal'
      default:
        return '';
    }
  };

  const incorrectEmailText = createFrontError(languageId, incorrectEmailType);
  if (email.length) {
    if (!re.test(String(email).toLowerCase())) {
      emailInputs[0].style.border = 'solid 2px red';
      errorMessage.classList.remove('hidden');
      errorMessage.innerText = incorrectEmailText;
      isEmailDataValid = false;
      checkMark.classList.add('hidden');
    } else {
      emailInputs[0].style.border = 'none';
      isEmailDataValid = true;
      errorMessage.classList.add('hidden');
    }
  } else {
    emailInputs[0].style.border = 'solid 2px red';
    errorMessage.classList.remove('hidden');
    errorMessage.innerText = incorrectEmailText;
    isEmailDataValid = false;
  }

  if (isNameDataValid && isEmailDataValid && agreementCheckbox.checked) {
    const endpoint =
      'https://planner-server.gold-race.org/api/subscribers/create-book-subscriber';
    const method = 'POST';
    const defaultFrontError = createFrontError(languageId, null);

    submitBtn.classList.add('disabled');

    // TODO: поменять перед MR на продовый хост
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        product_id: bookId,
        language_id: languageId,
      }),
    });
    const { ok } = response;

    if (ok) {
      return (window.location.pathname = `/${languageId}/books/${bookId}/gratitude`);
    } else {
      const error = await response.json();

      const handledError = error?.message || JSON.stringify(error);

      const showError = () => errorMessage.classList.remove('hidden');
      const openButton = () => submitBtn.classList.remove('disabled');

      showError();
      openButton();
      errorMessage.innerText = handledError || defaultFrontError;
    }
  }
});

if (nameInputs.length) {
  [...nameInputs].map((input) => {
    input.addEventListener('input', (e) => {
      input.value = input.value.replace(
        /[0-9!@#$%^&*()"№;:?{}[\],.<>\/\\|`~]/gi,
        ''
      );
    });
  });
}
