'use strict';

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

var getComments = function (url, text, name) {
  var collection = [];
  var commentInfo = {};
  for (var i = 0; i < 4; i++) {
    commentInfo = {
      avatar: getRandom(url),
      message: getRandom(text),
      name: getRandom(name)
    };
    collection[i] = commentInfo;
  }
  return collection;
};

var PHOTO_NUMBERS = getArrNumbers(1, 25);
var PHOTO_LIKES = getArrNumbers(15, 200);
var PHOTO_COMMENTS = getComments(COMMENT_IMAGE, COMMENT_TEXT, COMMENT_AUTHOR);

var getUserPack = function (url, likes, comments) {
  var userPack = {
    url: 'photos/' + url + '.jpg',
    likes: likes,
    comments: comments
  };
  return userPack;
};

var collectUsersPack = function () {
  var usersPacks = [];
  for (var i = 0; i < 25; i++) {
    usersPacks[i] = getUserPack(getRandom(PHOTO_NUMBERS), getRandom(PHOTO_LIKES), getRandom(PHOTO_COMMENTS));
  }
};


