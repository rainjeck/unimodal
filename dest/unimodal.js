/**
 * License: MIT
 * Description: Simple vanilla javascript modal
 * Author: Tishuk Nadezda
 * Homepage: https://rainjeck.github.io/unimodal/
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Unimodal = factory();
  }
}(this, function() {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Unimodal = /*#__PURE__*/function () {
  function Unimodal() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Unimodal);

    var params = opts || {};
    this.scrollWindow = params.scrollWindow || false; // disabled scroll window

    this.hash = params.hash || false; // hash support

    this.onOpen = params.onOpen || ''; // after Open

    this.onClose = params.onClose || ''; // after Close

    this.init();

    if (this.hash) {
      this.showHashModal();
    }
  }

  _createClass(Unimodal, [{
    key: "init",
    value: function init() {
      var _this = this;

      document.addEventListener('click', function (e) {
        if (!e.target.closest('[data-unimodal-open]')) return;
        e.preventDefault();
        var button = e.target.closest('[data-unimodal-open]');
        var id = button.getAttribute('data-unimodal-open');

        _this.open(id, button);
      });
      document.addEventListener('click', function (e) {
        if (e.target.closest('[data-unimodal-close]') || !e.target.closest('[data-unimodal-body]') && e.target.closest('[data-unimodal]') && !e.target.closest('[data-unimodal-static]')) {
          var modal = e.target.closest('[data-unimodal]');
          var id = modal.id;

          _this.close(id);

          return;
        }

        return;
      });
    }
  }, {
    key: "open",
    value: function open(id) {
      var button = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      this.closePrevious();

      if (!this.scrollWindow) {
        this.disableScroll();
      }

      var modal = document.getElementById(id);
      modal.classList.add('is-active');
      modal.scrollTop = 0;

      if (this.checkModalHeight(modal)) {
        this.disableScroll();
      }

      this.setHash(modal.id);

      if (this.onOpen && typeof this.onOpen === 'function') {
        this.onOpen(modal, button);
      }
    }
  }, {
    key: "close",
    value: function close(id) {
      var modal = document.getElementById(id);
      modal.classList.remove('is-active');
      this.enableScroll();

      if (this.hash) {
        this.setHash();
      }

      if (this.onClose && typeof this.onClose === 'function') {
        this.onClose(modal);
      }
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      document.documentElement.classList.add('is-unimodal-active');
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      document.documentElement.classList.remove('is-unimodal-active');
    }
  }, {
    key: "checkModalHeight",
    value: function checkModalHeight(modalElem) {
      var modalBody = modalElem.querySelector('[data-unimodal-body]');
      var windowHeight = window.innerHeight;
      var modalBodyHeight = modalBody.offsetHeight;

      if (modalBodyHeight > windowHeight) {
        return true;
      }

      return false;
    }
  }, {
    key: "closePrevious",
    value: function closePrevious() {
      var opened = document.querySelector('[data-unimodal].is-active');

      if (opened) {
        var id = opened.id;
        this.close(id);
      }
    }
  }, {
    key: "setHash",
    value: function setHash() {
      var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!this.hash) return;
      var scroll = window.pageYOffset;
      window.location.hash = hash;
      window.scrollTo(0, scroll);
    }
  }, {
    key: "showHashModal",
    value: function showHashModal() {
      if (!window.location.hash) return;
      var hash = window.location.hash;
      var modal = document.querySelector(hash);

      if (modal) {
        this.open(modal.id);
      }
    }
  }]);

  return Unimodal;
}();

Unimodal.open = function (id, callback) {
  Unimodal.prototype.open(id);

  if (callback && typeof callback === 'function') {
    callback();
  }
};

Unimodal.close = function (id, callback) {
  Unimodal.prototype.close(id);

  if (callback && typeof callback === 'function') {
    callback();
  }
};
return Unimodal;
}));

//# sourceMappingURL=../dest/unimodal.js.map
