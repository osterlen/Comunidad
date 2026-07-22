/* Carga contenido editable desde /content/*.json antes de montar la app. */
(function () {
  var base = (function () {
    var s = document.currentScript && document.currentScript.src;
    if (!s) return "./content/";
    return s.replace(/load\.js(?:\?.*)?$/, "");
  })();

  function get(path, fallback) {
    return fetch(base + path, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error(path + " " + r.status);
        return r.json();
      })
      .catch(function () {
        return fallback;
      });
  }

  window.__CUPA_CONTENT__ = Promise.all([
    get("gaceta.json", null),
    get("avisos.json", { items: [] }),
  ]).then(function (pair) {
    window.CUPA_GACETA_FILE = pair[0];
    window.CUPA_AVISOS_FILE = pair[1];
    return { gaceta: pair[0], avisos: pair[1] };
  });
})();
