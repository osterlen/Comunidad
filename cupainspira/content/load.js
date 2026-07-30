/* Carga contenido: Notion (Worker) primero, JSON local como fallback. */
(function () {
  var base = (function () {
    var s = document.currentScript && document.currentScript.src;
    if (!s) return "./content/";
    return s.replace(/load\.js(?:\?.*)?$/, "");
  })();

  var apiBase = (window.CUPA_API_BASE || "https://cupa-api.dupeyronosterlen.workers.dev").replace(/\/$/, "");

  function getJson(path, fallback) {
    return fetch(base + path, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error(path + " " + r.status);
        return r.json();
      })
      .catch(function () {
        return fallback;
      });
  }

  function applyPack(pack, source) {
    if (pack.gaceta) window.CUPA_GACETA_FILE = pack.gaceta;
    if (pack.avisos) window.CUPA_AVISOS_FILE = pack.avisos;
    if (pack.proyectos) window.CUPA_PROYECTOS_FILE = pack.proyectos;
    if (pack.ecologia) window.CUPA_ECOLOGIA_FILE = pack.ecologia;
    if (pack.emprendimiento) window.CUPA_EMPRENDE_FILE = pack.emprendimiento;
    if (pack.comercio) window.CUPA_COMERCIO_FILE = pack.comercio;
    if (pack.convocatorias) window.CUPA_CONVOCATORIAS_FILE = pack.convocatorias;
    if (pack.ahora) window.CUPA_AHORA_FILE = pack.ahora;
    if (pack.memoria) window.CUPA_MEMORIA_FILE = pack.memoria;
    window.CUPA_CONTENT_SOURCE = source || "json";
    return pack;
  }

  function loadFromJson() {
    return Promise.all([
      getJson("gaceta.json", null),
      getJson("avisos.json", { items: [] }),
      getJson("proyectos.json", null),
      getJson("ecologia.json", null),
      getJson("emprendimiento.json", null),
      getJson("comercio.json", null),
      getJson("convocatorias.json", []),
      getJson("ahora.json", []),
      getJson("memoria.json", null),
    ]).then(function (pack) {
      return applyPack(
        {
          gaceta: pack[0],
          avisos: pack[1],
          proyectos: pack[2],
          ecologia: pack[3],
          emprendimiento: pack[4],
          comercio: pack[5],
          convocatorias: pack[6],
          ahora: pack[7],
          memoria: pack[8],
        },
        "json"
      );
    });
  }

  window.__CUPA_CONTENT__ = fetch(apiBase + "/api/content", { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("api " + r.status);
      return r.json();
    })
    .then(function (data) {
      if (!data || !data.ok) throw new Error("api empty");
      // Notion puede venir parcial: completar huecos con JSON
      return loadFromJson().then(function (local) {
        var merged = {
          gaceta: data.gaceta || local.gaceta,
          avisos: (data.avisos && data.avisos.items && data.avisos.items.length) ? data.avisos : local.avisos,
          proyectos: data.proyectos || local.proyectos,
          ecologia: data.ecologia || local.ecologia,
          emprendimiento: (data.emprendimiento && data.emprendimiento.length) ? data.emprendimiento : local.emprendimiento,
          comercio: (data.comercio && data.comercio.length) ? data.comercio : local.comercio,
          convocatorias: (data.convocatorias && data.convocatorias.length) ? data.convocatorias : local.convocatorias,
          ahora: (data.ahora && data.ahora.length) ? data.ahora : local.ahora,
          memoria: (data.memoria && (data.memoria.curiosidades || data.memoria.cine)) ? data.memoria : local.memoria,
        };
        return applyPack(merged, data.source || "notion");
      });
    })
    .catch(function () {
      return loadFromJson();
    });
})();
