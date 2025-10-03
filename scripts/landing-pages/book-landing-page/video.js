// Video
const video = document.querySelectorAll('.video-player');
if (video.length) {
  video.forEach((v) => {
    const preview = v.dataset.preview;
    if (preview) {
      v.style.backgroundImage = `url(${preview})`;
    }
    const btn = v.querySelector('.play-btn');
    btn.addEventListener('click', function (e) {
      const videoId = v.dataset.videoId;
      if (videoId) {
        embedVideo(videoId);
        return;
      }
      this.remove();
    });
  });
}

function embedVideo(id) {
  let player;
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  setTimeout(() => {
    player = new YT.Player('player', {
      videoId: id,
      playerVars: {
        playsinline: 0,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }, 1000);
}

function onPlayerReady(event) {
  event.target.playVideo();
}
