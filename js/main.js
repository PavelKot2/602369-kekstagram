'use strict';

// Создание элементов вокруг кнопки загрузки фото


var bigPictureElement = document.querySelector('.big-picture');
var pictureElements = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('a');

var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');

var getRandom = function (arr) {
  var random = arr[Math.floor(Math.random() * (arr.length))];
  return random;
};

var getArrNumbers = function (min, max) {
  var numbers = [];
  var length = max - min;
  for (var i = 0; i <= length; i++) {
    numbers[i] = min + i;
  }
  return numbers;
};

var COMMENT_AUTHOR = ['Василий Уткин', 'Георгий Черданцев', 'Юрий Дудь', 'Алексей Попов', 'Константин Генич'];
var COMMENT_TEXT = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_IMAGE = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];


var PHOTO_NUMBERS = getArrNumbers(1, 25);
var PHOTO_LIKES = getArrNumbers(15, 200);
var PHOTO_COMMENTS_COUNTER = getArrNumbers(0, 200);
// создаем пак

var getUserPack = function (url, likes, comments) {
  var userPack = {
    url: 'photos/' + url + '.jpg',
    likes: likes,
    comments: comments
  };
  return userPack;
};


// Собираем паки в массив


var collectUsersPack = function () {
  var packLength = 25;
  var usersPacks = [];
  for (var i = 0; i < packLength; i++) {
    usersPacks[i] = getUserPack(PHOTO_NUMBERS[i], getRandom(PHOTO_LIKES), getRandom(PHOTO_COMMENTS_COUNTER));
  }
  return usersPacks;
};

var renderUsersPack = function (pack) {
  var packElement = pictureTemplate.cloneNode(true);
  packElement.querySelector('.picture__img').src = pack.url;
  packElement.querySelector('.picture__likes').textContent = pack.likes;
  packElement.querySelector('.picture__comments').textContent = pack.comments;
  return packElement;
};

var photoPack = collectUsersPack(); // Массив из фотографий, лайков и комментариев.

var fragment = document.createDocumentFragment();

for (var i = 0; i < photoPack.length; i++) {
  fragment.appendChild(renderUsersPack(photoPack[i]));
}

var commentList = document.querySelector('.social__comments');

for (var comment = 0; comment < 1; comment++) {
  var newElement = document.createElement('li');
  var randomAvatar = getRandom(COMMENT_IMAGE);
  var randomName = getRandom(COMMENT_AUTHOR);
  var randomText = getRandom(COMMENT_TEXT);
  var html = '<img class="social__picture" src="' + randomAvatar + '" alt="' + randomName + '" width="35" height="35">';
  html += '<p class="social__text">' + randomText + '</p>';
  newElement.className = 'social__comment';
  newElement.innerHTML = html;
  commentList.appendChild(newElement);
}

pictureElements.appendChild(fragment);
commentList.appendChild(fragment);


// Открытие редактора фото


var uploadElement = document.querySelector('#upload-file');
var imageEditor = document.querySelector('.img-upload__overlay');
var imageScaleBlock = document.querySelector('.img-upload__effect-level');
var imagePreview = document.querySelector('.img-upload__preview img');
var imageFilters = document.querySelector('.img-upload__effects');
var uploadElementClose = document.querySelector('#upload-cancel');
var ESC_KEYCODE = 27;

var onImageEditorEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadElement();
  }
};

var closeUploadElement = function () {
  imageEditor.classList.add('hidden');
  document.removeEventListener('keydown', onImageEditorEscPress);
  uploadElement.value = '';
};

var openUploadElement = function () {
  imageEditor.classList.remove('hidden');
  document.addEventListener('keydown', onImageEditorEscPress);
};

uploadElement.addEventListener('change', function () {
  openUploadElement();
});

uploadElementClose.addEventListener('click', function () {
  closeUploadElement();
});

// Обработка фильтров.

var sliderLine = document.querySelector('.effect-level__line');
var sliderPin = sliderLine.querySelector('.effect-level__pin');
var sliderFillLine = sliderLine.querySelector('.effect-level__depth'); // линия заполнения после Пина
var sliderEffectValue = sliderLine.querySelector('.effect-level__value');
imageScaleBlock.classList.add('hidden');

var changeFilter = function (filter) {
  var pinPosition = parseInt(window.getComputedStyle(sliderPin).left, 10);
  var blockWidth = parseInt(window.getComputedStyle(sliderPin).width, 10);
  var proportionValue = (pinPosition / blockWidth).toFixed(2);
  var nameFilter = filter.replace('effects__preview--', '');

  switch (nameFilter) {
    case 'chrome':
      imagePreview.style.filter = '';
      imagePreview.style.filter = 'grayscale(' + proportionValue + ')';
      break;
    case 'sepia':
      imagePreview.style.filter = '';
      imagePreview.style.filter = 'sepia(' + proportionValue + ')';
      break;
    case 'marvin':
      imagePreview.style.filter = '';
      imagePreview.style.filter = 'invert(' + (proportionValue * 100 + '%') + ')';
      break;
    case 'phobos':
      imagePreview.style.filter = '';
      imagePreview.style.filter = 'blur(' + (proportionValue * 3 + 'px') + ')';
      break;
    case 'heat':
      imagePreview.style.filter = '';
      imagePreview.style.filter = 'brightness(' + (proportionValue * 2 + 1) + ')';
      break;
  }
  sliderEffectValue.value = imagePreview.style.filter;
};

sliderPin.addEventListener('mousedown', function () {
  var nameFilter = imagePreview.className;
  changeFilter(nameFilter);
  var onMouseMove = function () {
    changeFilter(nameFilter);
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

imageFilters.addEventListener('click', function (evt) {
  var target = evt.target;
  sliderPin.style.left = 100 + '%';
  sliderFillLine.style.width = sliderPin.style.left;
  switch (target.id) {
    case 'effect-none':
      imagePreview.className = '';
      imageScaleBlock.classList.add('hidden');
      break;
    case 'effect-chrome':
      imagePreview.className = '';
      imagePreview.classList.add('effects__preview--chrome');
      imageScaleBlock.classList.remove('hidden');
      break;
    case 'effect-sepia':
      imagePreview.className = '';
      imagePreview.classList.add('effects__preview--sepia');
      imageScaleBlock.classList.remove('hidden');
      break;
    case 'effect-marvin':
      imagePreview.className = '';
      imagePreview.classList.add('effects__preview--marvin');
      imageScaleBlock.classList.remove('hidden');
      break;
    case 'effect-phobos':
      imagePreview.className = '';
      imagePreview.classList.add('effects__preview--phobos');
      imageScaleBlock.classList.remove('hidden');
      break;
    case 'effect-heat':
      imagePreview.className = '';
      imagePreview.classList.add('effects__preview--heat');
      imageScaleBlock.classList.remove('hidden');
      break;
  }
});

sliderPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoords - moveEvt.clientX;

    startCoords = moveEvt.clientX;

    var pinPosition = Math.round(((sliderPin.offsetLeft - shiftX) / sliderLine.offsetWidth) * 100);

    if (pinPosition < 0) {
      pinPosition = 0;
    } else if (pinPosition > 100) {
      pinPosition = 100;
    }

    sliderPin.style.left = pinPosition + '%';
    sliderFillLine.style.width = sliderPin.style.left;
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Открытие/закрытие большой фотографии при клике на маленькую.


var pictureList = pictureElements.querySelectorAll('a');
var bigPictureCancel = document.querySelector('.big-picture__cancel');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var openBigPicture = function () {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

var closeBigPicture = function () {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

for (var x = 0; x < pictureList.length; x++) {
  pictureList[x].addEventListener('click', function (evt) {
    evt.preventDefault();
    openBigPicture();
  });
}

bigPictureCancel.addEventListener('click', function () {
  closeBigPicture();
});


// Проверка валидности формы хэш-тегов и комментария к загруж изображению.


var uploadSubmitButton = document.querySelector('.img-upload__submit');
var hashtagField = document.querySelector('.text__hashtags');
var commentField = document.querySelector('.text__description');
var maxLength = 20;
var hashtagsQuantity = 5;
var maxCommentLength = 140;

uploadSubmitButton.addEventListener('click', function () {
  var space = ' ';
  var splitString = hashtagField.value.toLowerCase().split(space);
  for (var elm = 0; elm < splitString.length; elm++) {
    if (hashtagField.value) {
      if (splitString.length > hashtagsQuantity) {
        hashtagField.setCustomValidity('Упс, нельзя указать больше пяти хэш-тегов');
        break;
      } else if (!/^\#/gi.test(splitString[elm])) {
        hashtagField.setCustomValidity('Упс, хэш-тег должен начинаться с символа # (решётка)');
        break;
      } else if (splitString[elm] === '#') {
        hashtagField.setCustomValidity('Упс, хеш-тег не может состоять только из одной решётки');
        break;
      } else if (splitString[elm].length > maxLength) {
        hashtagField.setCustomValidity('Упс, максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      } else if (splitString.indexOf(splitString[elm]) !== splitString.lastIndexOf(splitString[elm])) {
        hashtagField.setCustomValidity('Упс, один и тот же хэш-тег не может быть использован дважды');
        break;
      } else {
        hashtagField.setCustomValidity('');
      }
    } else if (commentField.value) {
      if (commentField.value.length > maxCommentLength) {
        commentField.setCustomValidity('Упс, длина комментария не может составлять больше 140 символов');
      } else {
        commentField.setCustomValidity('');
      }
    }
  }
});

hashtagField.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImageEditorEscPress);
});

commentField.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImageEditorEscPress);
});
