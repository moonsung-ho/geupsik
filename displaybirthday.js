fetch('/birthdays.json')
  .then(response => response.json())
  .then(data => {
    let n = data.length;
    while (n > 0) {
      let month = new Date().getMonth() + 1;
      month = month.toString();
      let day = new Date().getDate().toString();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      console.log(month + day);
      if (month + day === data[n - 1].day) {
        Toastify({
          text: `🎉 ${data[n - 1].name}님이 오늘 생일이에요! 🎂`,
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
