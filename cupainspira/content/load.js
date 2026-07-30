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
    get("proyectos.json", null),
    get("ecologia.json", null),
    get("emprendimiento.json", null),
    get("comercio.json", null),
    get("convocatorias.json", []),
    get("ahora.json", []),
    get("memoria.json", null),
  ]).then(function (pack) {
    window.CUPA_GACETA_FILE = pack[0];
    window.CUPA_AVISOS_FILE = pack[1];
    window.CUPA_PROYECTOS_FILE = pack[2];
    window.CUPA_ECOLOGIA_FILE = pack[3];
    window.CUPA_EMPRENDE_FILE = pack[4];
    window.CUPA_COMERCIO_FILE = pack[5];
    window.CUPA_CONVOCATORIAS_FILE = pack[6];
    window.CUPA_AHORA_FILE = pack[7];
    window.CUPA_MEMORIA_FILE = pack[8];
    return {
      gaceta: pack[0],
      avisos: pack[1],
      proyectos: pack[2],
      ecologia: pack[3],
      emprendimiento: pack[4],
      comercio: pack[5],
      convocatorias: pack[6],
      ahora: pack[7],
      memoria: pack[8],
    };
  });
})();
