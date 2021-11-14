if (localStorage.getItem("schoolcode") === null && Object.fromEntries(new URLSearchParams(window.location.search).entries()) === {}) {
    location.href = "/first";
}