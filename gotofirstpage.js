if (localStorage.getItem("schoolcode") === null && Object.fromEntries(new URLSearchParams(window.location.search).entries()).date !== true) {
    location.href = "/first";
}