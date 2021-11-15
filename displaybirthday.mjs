const findBirthday = ({ month, day }) => {
  fetch('/birthdays.json')
    .then(response => response.json())
    .then(data => {
      let n = data.length;
      while (n > 0) {
        //input.value.split('-')[1] + input.value.split('-')[2]
        console.log(month.toString() + day.toString());
        if (month.toString() + day.toString() === data[n - 1].day) {
          Toastify({
            text: `🎉 ${data[n - 1].name}님이 생일인 날이에요! 🎂`,
            duration: 2000,
            close: true,
            gravity: "bottom",
            position: "center",
            stopOnFocus: false,
            style: {
              background: "wheat",
            },
            onClick: function () {
              Toastify({
                text: `🎉 추카추카 🎉`,
                duration: 2000,
                close: true,
                gravity: "bottom",
                position: "center",
                stopOnFocus: false,
                style: {
                  background: "wheat",
                },
              }).showToast();
            } // Callback after click
          }).showToast();
        }
        n--;
      }
    })
    .catch(error => console.log(error));
}
export default findBirthday;