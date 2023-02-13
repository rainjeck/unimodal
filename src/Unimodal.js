class Unimodal {
  constructor(opts = {}) {
    let params = opts || {};

    this.scrollWindow = params.scrollWindow || false; // disabled scroll window
    this.hash = params.hash || false; // hash support

    this.onOpen = params.onOpen || ''; // after Open
    this.onClose = params.onClose || ''; // after Close

    this.init();

    if (this.hash) {
      this.showHashModal();
    }
  }

  init() {
    // Open
    document.addEventListener('click', e => {
      if (!e.target.closest('[data-unimodal-open]')) return;

      e.preventDefault();

      const button = e.target.closest('[data-unimodal-open]');

      const id = button.getAttribute('data-unimodal-open');

      this.openModal(id, button);

      return;
    });

    // Close
    document.addEventListener('click', e => {
      if (e.target.closest('[data-unimodal-close]') ||
        (!e.target.closest('[data-unimodal-body]') && e.target.closest('[data-unimodal]') && !e.target.closest('[data-unimodal-static]'))
      ) {
        const modal = e.target.closest('[data-unimodal]');

        const id = modal.id;

        this.closeModal(id);

        return;
      }

      return;
    });
  }

  openModal(id, button = '') {
    this.closePrevious();

    if (!this.scrollWindow) {
      this.disableScroll();
    }

    const modal = document.getElementById(id);

    modal.classList.add('is-active');

    modal.scrollTop = 0;

    if (this.checkModalHeight(modal)) {
      this.disableScroll();
    }

    this.setHash(modal.id);

    if (this.onOpen) {
      this.onOpen(modal, button);
    }
  }

  closeModal(id) {
    const modal = document.getElementById(id);

    modal.classList.remove('is-active');

    this.enableScroll();

    if (this.hash) {
      this.setHash();
    }

    if (this.onClose) {
      this.onClose(modal);
    }
  }

  disableScroll() {
    document.documentElement.classList.add('is-unimodal-active');
  }

  enableScroll() {
    document.documentElement.classList.remove('is-unimodal-active');
  }

  checkModalHeight(modalElem) {
    const modalBody = modalElem.querySelector('[data-unimodal-body]');
    const windowHeight = window.innerHeight;
    const modalBodyHeight = modalBody.offsetHeight;

    if (modalBodyHeight > windowHeight) {
      return true;
    }

    return false;
  }

  closePrevious() {
    const opened = document.querySelector('[data-unimodal].is-active');

    if (opened) {
      this.close(opened.id);
    }
  }

  closeAll() {
    this.closePrevious();
  }

  setHash(hash = '') {
    if (!this.hash) return;

    const scroll = window.pageYOffset;
    window.location.hash = hash;
    window.scrollTo(0, scroll);
  }

  showHashModal() {
    if (!window.location.hash) return;

    const hash = window.location.hash;

    const modal = document.querySelector(hash);

    if (modal) {
      this.openModal(modal.id);
    }
  }

  open(id, callback) {
    this.openModal(id);

    if (callback) {
      callback();
    }
  }

  close(id, callback) {
    this.closeModal(id);

    if (callback) {
      callback();
    }
  }

  closeAll(callback) {
    this.closePrevious();

    if (callback) {
      callback();
    }
  }
}

(function () {
  Unimodal.open = (id, callback) => {
    Unimodal.prototype.open(id, callback);
  };

  Unimodal.close = (id, callback) => {
    Unimodal.prototype.close(id, callback);
  };

  Unimodal.closeAll = (callback) => {
    Unimodal.prototype.closeAll(callback);
  };
})();
