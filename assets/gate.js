(function(){
  var PWD = 'visiones2026';
  var KEY = 'vac_auth';
  if(sessionStorage.getItem(KEY) === '1') return;
  document.body.style.display = 'none';
  var d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;background:#080e08;display:flex;align-items:center;justify-content:center;z-index:9999;font-family:Martian Mono,monospace;';
  d.innerHTML = '<div style="text-align:center;max-width:320px;padding:2rem">'
    + '<div style="font-size:.6rem;letter-spacing:.3em;color:#4a7a28;text-transform:uppercase;margin-bottom:2rem">Visiones AC — Acceso restringido</div>'
    + '<input id="vpin" type="password" placeholder="Contraseña" style="width:100%;background:#0f1a0f;border:1px solid #1e3018;color:#c8ddb0;font-family:Martian Mono,monospace;font-size:.8rem;padding:.8rem 1rem;outline:none;margin-bottom:.8rem;letter-spacing:.1em">'
    + '<div id="verr" style="font-size:.55rem;color:#c84848;letter-spacing:.1em;min-height:1rem;margin-bottom:.8rem"></div>'
    + '<button id="vbtn" style="width:100%;background:transparent;border:1px solid #4a7a28;color:#7ab648;font-family:Martian Mono,monospace;font-size:.6rem;letter-spacing:.2em;padding:.7rem;cursor:pointer;text-transform:uppercase">Entrar</button>'
    + '</div>';
  document.body.appendChild(d);
  function check(){
    if(document.getElementById('vpin').value === PWD){
      sessionStorage.setItem(KEY,'1');
      d.remove();
      document.body.style.display='';
    } else {
      document.getElementById('verr').textContent='Contraseña incorrecta';
      document.getElementById('vpin').value='';
    }
  }
  document.getElementById('vbtn').addEventListener('click',check);
  document.getElementById('vpin').addEventListener('keydown',function(e){ if(e.key==='Enter') check(); });
  document.body.style.display='';
})();
