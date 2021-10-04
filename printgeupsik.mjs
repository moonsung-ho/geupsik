const printGeupsik = () => {
  let filter = 'win16|win32|win64|mac|macintel';
  if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
  } else {
    console.log('Client platform : PC');
    fetch(
      'https://api.nasa.gov/planetary/apod?thumbs=True&api_key=2ytHG6k3cfyHLcTdGUhpaedPMb17a0V2DQd5EogF',
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json.date);
        console.log(`오늘자 NASA 선정 사진: ${json.title}`);
        console.log(
          '%c ',
          `font-size:300px; background:url(${json.url}) no-repeat;`,
        );
      });
  }
};
export { printGeupsik };
