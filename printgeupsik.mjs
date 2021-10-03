const printGeupsik = () => {
  fetch(
    'https://api.nasa.gov/planetary/apod?api_key=2ytHG6k3cfyHLcTdGUhpaedPMb17a0V2DQd5EogF',
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(`오늘의 NASA 선정 사진: ${json.title}`);
      console.log('%c ', `font-size:300px; background:url(${json.hdurl}) no-repeat;`);
    });
  console.log(``);
};
export { printGeupsik };
