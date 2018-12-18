'use strict';
var bigPictureElement = document.querySelector('.big-picture');
bigPictureElement.classList.remove('hidden');
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
var PHOTO_COMMENTS_COUNTER = getArrNumbers(0, 2);
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
  newElement.className = 'social__comments';
  newElement.innerHTML = html;
  commentList.appendChild(newElement);
}

pictureElements.appendChild(fragment);
commentList.appendChild(fragment);
