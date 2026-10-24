/* appert.nu/s/ – landing page for a shared Streamert station.
   The station is in the URL fragment (#...), which the browser never sends to
   any server. This script only reads it to show the station's name. It makes no
   network requests, stores nothing and sets no cookies. Format: see
   AppertLabs/streamert DECISIONS.md D41:
   base64url(JSON {"v":1,"n":name,"u":stream,...}), at most 2000 characters. */
(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;
  root.className += ' js';

  function pickLang() {
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'nl'];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i] || '').toLowerCase();
      if (l.indexOf('nl') === 0) return 'nl';
      if (l.indexOf('en') === 0) return 'en';
    }
    return 'en';
  }

  function setLang(lang) {
    root.setAttribute('lang', lang);
    root.setAttribute('data-ui', lang);
    var buttons = doc.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-set-lang') === lang;
      if (on) buttons[i].setAttribute('aria-current', 'true'); else buttons[i].removeAttribute('aria-current');
    }
  }

  // The station name from the fragment, or null. Never throws.
  function stationName(fragment) {
    try {
      if (!fragment || fragment.length > 2000 || !/^[A-Za-z0-9_-]+={0,2}$/.test(fragment)) return null;
      var b64 = fragment.replace(/=+$/, '').replace(/-/g, '+').replace(/_/g, '/');
      if (b64.length % 4 === 1) return null;
      while (b64.length % 4) b64 += '=';
      var bin = atob(b64);
      if (bin.length > 1500) return null;
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      var data = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
      if (!data || typeof data !== 'object' || typeof data.v !== 'number' || data.v < 1) return null;
      if (typeof data.n !== 'string') return null;
      var name = data.n.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (name.length > 60) name = name.slice(0, 60).trim();
      return name || null;
    } catch (e) {
      return null;
    }
  }

  setLang(pickLang());
  var buttons = doc.querySelectorAll('[data-set-lang]');
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener('click', function (e) { setLang(e.currentTarget.getAttribute('data-set-lang')); });
  }

  var name = stationName(String(location.hash || '').replace(/^#/, ''));
  if (name) {
    // textContent only: the name is untrusted and is never parsed as HTML.
    doc.getElementById('share-name-nl').textContent = name;
    doc.getElementById('share-name-en').textContent = name;
    doc.getElementById('share-lede-nl').textContent =
      'Iemand heeft deze zender met je gedeeld in Streamert. Open de link op je telefoon om hem toe te voegen.';
    doc.getElementById('share-lede-en').textContent =
      'Someone shared this station with you in Streamert. Open this link on your phone to add it.';
    doc.title = name + ' – Streamert';
  }

  // Copy link: the whole address, fragment included.
  var wrap = doc.querySelector('.share-copy');
  var btn = doc.getElementById('share-copy');
  var done = doc.getElementById('share-copied');
  function copied() {
    done.textContent = root.getAttribute('lang') === 'nl' ? 'Gekopieerd' : 'Copied';
    setTimeout(function () { done.textContent = ''; }, 2500);
  }
  function fallbackCopy(text) {
    var ta = doc.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.opacity = '0';
    doc.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
    doc.body.removeChild(ta);
    return ok;
  }
  if (wrap && btn && location.hash.length > 1) {
    wrap.hidden = false;
    btn.addEventListener('click', function () {
      var text = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(copied, function () { if (fallbackCopy(text)) copied(); });
      } else if (fallbackCopy(text)) {
        copied();
      }
    });
  }
})();
