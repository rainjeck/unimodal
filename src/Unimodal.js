class Unimodal {
  constructor( opts = {} ) {
    let params = opts || {};

    this.scrollWindow = params.scrollWindow || false; // disabled scroll window
    this.hash = params.hash || false; // hash support

    this.onOpen = params.onOpen || ''; // after Open
    this.onClose = params.onClose || ''; // after Close

    this.init();

    if ( this.hash ) {
      this.showHashModal();
    }
  }

  init() {
    document.addEventListener('click', e => {
      if ( !e.target.closest('[data-unimodal-open]') ) return;

      e.preventDefault();

      const button = e.target.closest('[data-unimodal-open]');

      const id = button.getAttribute('data-unimodal-open');

      this.open( id, button );
    });

    document.addEventListener('click', e => {
      if ( e.target.closest('[data-unimodal-close]') ||
        ( !e.target.closest('[data-unimodal-body]') && e.target.closest('[data-unimodal]') )
      ) {
        const modal = e.target.closest('[data-unimodal]');

        const id = modal.id;

        this.close( id );

        return;
      }

      return;
    });
  }

  open( id, button = '' ) {
    this.closePrevious();

    if ( !this.scrollWindow ) {
      this.disableScroll();
    }

    const modal = document.getElementById(id);

    modal.classList.add('is-active');

    modal.scrollTop = 0;

    if ( this.checkModalHeight( modal ) ) {
      this.disableScroll();
    }

    this.setHash( modal.id );

    if (this.onOpen && typeof this.onOpen === 'function') {
      this.onOpen( modal, button );
    }
  }

  close( id ) {
    const modal = document.getElementById(id);

    modal.classList.remove('is-active');

    this.enableScroll();

    if ( this.hash ) {
      this.setHash();
    }

    if (this.onClose && typeof this.onClose === 'function') {
      this.onClose( modal );
    }
  }

  disableScroll() {
    document.body.classList.add('is-unimodal-active');
  }

  enableScroll() {
    document.body.classList.remove('is-unimodal-active');
  }

  checkModalHeight( modalElem ) {
    const modalBody = modalElem.querySelector('[data-unimodal-body]');
    const windowHeight = window.innerHeight;
    const modalBodyHeight = modalBody.offsetHeight;

    if ( modalBodyHeight > windowHeight ) {
      return true;
    }

    return false;
  }

  closePrevious() {
    const opened = document.querySelector('[data-unimodal].is-active');

    if ( opened ) {
      const id = opened.id;
      this.close( id );
    }
  }

  setHash( hash = '' ) {
    if ( !this.hash ) return;

    const scroll = window.pageYOffset;
    window.location.hash = hash;
    window.scrollTo(0, scroll);
  }

  showHashModal() {
    if ( !window.location.hash ) return;

    const hash = window.location.hash;

    const modal = document.querySelector(hash);

    if ( modal ) {
      this.open( modal.id );
    }
  }
}

Unimodal.open = ( id, callback ) => {
  Unimodal.prototype.open( id );

  if (callback && typeof callback === 'function') {
    callback();
  }
}

Unimodal.close = ( id, callback ) => {
  Unimodal.prototype.close( id );

  if (callback && typeof callback === 'function') {
    callback();
  }
}
