var agent = navigator.userAgent.toLowerCase();
if ((navigator.appName == 'Netscape' &&
  navigator.userAgent.search('Trident') != -1) ||
  agent.indexOf('msie') != -1) {
  console.error('ieieieieieieieieieieieieieieieie');
  swal("익스플로러 쓰지마세요", "error");
  window.location = 'microsoft-edge:' + window.location.href;
}
