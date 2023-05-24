import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const saveTimeThrottled = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000); // Обмеження викликів функції не частіше, ніж раз на секунду

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeThrottled(currentTime);
});

// Відновлення відтворення зі збереженої позиції після перезавантаження сторінки
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  const parsedTime = parseFloat(savedTime);
  player.setCurrentTime(parsedTime);
}
