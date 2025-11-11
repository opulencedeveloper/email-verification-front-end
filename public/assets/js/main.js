document.getElementById("content").style.display = "none";
document.body.classList.add('hidden-overflow');
window.addEventListener("load", function () {
    document.getElementById("spinner-body").style.display = "none";
    document.body.classList.remove('hidden-overflow');
    document.getElementById("content").style.display = "block";


    // const observerOptions = {
    //   root: null,
    //   rootMargin: "0px",
    //   threshold: 0.2,
    // };
  
    // const observerCallback = (entries, observer) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       entry.target.classList.add("visible-ani");
    //       observer.unobserve(entry.target);
    //     }
    //   });
    // };
  
    // const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    // const boxes = document.querySelectorAll(".box");
    // boxes.forEach((box) => {
    //   observer.observe(box);
    // });
  });


  


// // Only show spinner on initial page load (first visit in session)
// const hasSeenSpinner = sessionStorage.getItem('spinner-shown');
// const spinner = document.getElementById("spinner-body");
// const content = document.getElementById("content");

// if (!hasSeenSpinner) {
//     // First visit - show spinner
//     if (content) content.style.display = "none";
//     document.body.classList.add('hidden-overflow');
    
//     window.addEventListener("load", function () {
//         if (spinner) {
//             spinner.style.opacity = '0';
//             spinner.style.transition = 'opacity 0.3s ease-out';
//             setTimeout(() => {
//                 spinner.style.display = 'none';
//                 sessionStorage.setItem('spinner-shown', 'true');
//             }, 300);
//         }
//         document.body.classList.remove('hidden-overflow');
//         if (content) content.style.display = "block";
//     });
// } else {
//     // Already seen spinner in this session - hide immediately
//     if (spinner) spinner.style.display = "none";
//     if (content) content.style.display = "block";
//     document.body.classList.remove('hidden-overflow');
// }


//     // const observerOptions = {
//     //   root: null,
//     //   rootMargin: "0px",
//     //   threshold: 0.2,
//     // };
  
//     // const observerCallback = (entries, observer) => {
//     //   entries.forEach((entry) => {
//     //     if (entry.isIntersecting) {
//     //       entry.target.classList.add("visible-ani");
//     //       observer.unobserve(entry.target);
//     //     }
//     //   });
//     // };
  
//     // const observer = new IntersectionObserver(observerCallback, observerOptions);
  
//     // const boxes = document.querySelectorAll(".box");
//     // boxes.forEach((box) => {
//     //   observer.observe(box);
//     // });


  