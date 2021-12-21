import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const options = {
  id: 59777392,
  width: 640,
  loop: true,
};

const player = new Player('vimeo-player', options);

player.setVolume(0);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
  }, 1000),
);

const saveTime = localStorage.getItem(STORAGE_KEY);

if (saveTime) {
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}
