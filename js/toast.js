function toast(text, time, color) {
    Toastify({
        text: text,
        duration: time,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            background: color,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

export default toast