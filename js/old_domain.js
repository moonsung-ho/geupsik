if (location.host.includes('xn--kj0b080b')) {
  Toastify({
    text: "이 도메인은 이제 사용되지 않습니다. 이 팝업을 클릭하면 새로 바뀐 도메인으로 이동합니다.",
    duration: 6000,
    close: true,
    gravity: "bottom",
    position: "center",
    stopOnFocus: false,
    style: {
      background: "tomato",
    },
    onClick: function () { location.href = "https://geupsik.ml"; } // Callback after click
  }).showToast();
}
