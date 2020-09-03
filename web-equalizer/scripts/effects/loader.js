
 const loaderPage = (timer,txt) => {
const loader = document.getElementById("loader");
    if (!loader.classList.contains("done")) {
        setTimeout(() => {
          loader.classList.add("done");
        }, timer);
      }
    }
export default loaderPage;
// export const circleLoader = (percent = 0) => {

//   const circle = document.querySelector(".progress-bar-circle");
//   const radius = circle.r.baseVal.value;
//   const circumFerence = 2 * Math.PI * radius;

//   const offset = circumFerence - (percent / 100) * circumFerence;
//   circle.style.strokeDasharray = `${circumFerence} ${circumFerence}`;
//   circle.style.strokeDashoffset = offset;
// }

