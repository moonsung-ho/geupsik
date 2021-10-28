// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
// Detects if device is in standalone mode
const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;
// Checks if should display install popup notification:
if (isIos() &&
  !isInStandaloneMode() &&
  localStorage.getItem('homescreenbanner') !== 'true') {
  localStorage.setItem('homescreenbanner', 'true');
  document.getElementsByTagName('footer')[0].innerHTML = `${document.getElementsByTagName('footer')[0].innerHTML}<style>
  @keyframes colorChange{
    0%  { color: #8BC34A;}
    25%  { color: #03A9F4;}
    50%  { color: #FF5722;}
    100%{ color: #607D8B;}
  }
  .descAnim765 {
    animation: colorChange 1s ease-out 0s infinite alternate none running;
  }
  </style>
  <div style="margin: 200 auto;text-align:center;overflow:hidden;border-radius:0px;border:0px solid #ff0000;padding:8px;max-width:calc(100% - 16px);width:700px" height:30px;>
    <div class="descAnim765" style="height:20px; display:inline-block;position:relative;vertical-align: middle;padding:3px;font-size:20px;color:#000000;font-weight:normal">앱을 홈 화면에 추가하세요!</div>
    <div class="descAnim765"  style="display:inline-block;position:relative;vertical-align: middle;padding:3px;font-size:11px;color:#000000;font-weight:bold">공유 버튼을 누르고 홈 화면에 추가 버튼을 누르세요!</div>
  </div>`;
}
