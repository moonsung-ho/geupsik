if (localStorage.getItem("schoolcode") === null && Object.fromEntries(new URLSearchParams(window.location.search).entries()).toString === "[object Object]") {
    location.href = "/first";
}