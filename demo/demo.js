// Create player
var player;
var playerReady = false;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    videoId: '',
    events: {
      onReady: function() {
        playerReady = true;
      }
    }
  });
}

new Unimodal({
  scrollWindow: false,
  hash: false,
  onOpen: function( modal, button ) {
    console.log('Open:', modal.id);

    if ( modal.id == 'modal-video' ) {
      var video = modal.querySelector('video');
      video.currentTime = 0;
      setTimeout(function() {
        video.play();
      }, 300);
    }

    if ( modal.id == 'modal-youtube' ) {
      var videoId = button.getAttribute('data-youtube-id');

      var check = setInterval(function() {
        if ( playerReady ) {
          clearInterval(check);
          player.loadVideoById(videoId);
          player.playVideo();
        }
      }, 100);
    }

    if ( modal.id == 'modal-youtube2' ) {
      modal.querySelector('iframe').setAttribute('src', button.getAttribute('data-youtube-src'));
    }
  },
  onClose: function( modal ) {
    console.log('Close:', modal.id);

    if ( modal.id == 'modal-video' ) {
      var video = modal.querySelector('video');
      video.pause();
    }

    if ( modal.id == 'modal-youtube' ) {
      player.stopVideo();
    }

    if ( modal.id == 'modal-youtube2' ) {
      modal.querySelector('iframe').setAttribute('src', '');
    }
  }
});

var customButton = document.querySelector('#custom-button');
customButton.addEventListener('click', function(e) {
  Unimodal.open('custom-modal');
});
