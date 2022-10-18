const slider = function () {
  const slides = document.querySelectorAll(".section-5-slide");
  const btnLeft = document.querySelector(".slide_btn-left");
  const btnRight = document.querySelector(".slide_btn-right");
  const dotContainer = document.querySelector(".dots");

  let curslide = 0;
  let maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * -slide}%)`;
    });
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots_dot-active"));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add("dots_dot-active");
  };

  createDots();
  activateDot(curslide);

  goToSlide(curslide);

  const slideRight = function () {
    if (curslide === maxSlide - 1) {
      curslide = 0;
    } else {
      curslide++;
    }
    goToSlide(curslide);
    activateDot(curslide);
  };

  const slideLeft = function () {
    if (curslide === 0) {
      curslide = maxSlide - 1;
    } else {
      curslide--;
      console.log(curslide);
    }
    goToSlide(curslide);
    activateDot(curslide);
  };

  btnLeft.addEventListener("click", () => {
    slideLeft();
  });
  btnRight.addEventListener("click", () => {
    slideRight();
  });
};
slider();

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

////////////////////////////////////////////////////////////////////////////////////////////////
const featuresSection = document.querySelector(".section-5");
const features = document.querySelectorAll(".feature_wrapper");
console.log(features);

let currentFeature = 0;

const revealFeatures = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  features.forEach((feature) => {
    feature.classList.remove("features-hidden");
  });

  function addFeatureAnimation() {
    const showFeatures = function () {
      setTimeout(() => {
        console.log(currentFeature);
        features[currentFeature].classList.add("animate-features");
        currentFeature++;
        currentFeature < 3 && showFeatures();
      }, 500);
    };
    showFeatures();
    observer.unobserve(entry.target);
  }
  console.log(currentFeature);
  currentFeature < 3 &&
    // setInterval(() => {
    addFeatureAnimation();
  // }, 300);
};

const featuresObserver = new IntersectionObserver(revealFeatures, {
  root: null,
  threshold: 0.2,
});

featuresObserver.observe(featuresSection);
features.forEach((feature) => {
  feature.classList.add("features-hidden");
});
/////////////////////////////////////////////////////////////////////////////////
// DO THIS INSTEAD NOTE
const navLink = document.querySelectorAll(".nav_link");
const navLinks = document.querySelector(".nav_links");
const section1 = document.querySelector(".section-1");

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

//   console.log(
//     "height/width viewport",
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   section1.scrollIntoView({
//     behavior: "smooth",
//   });
// });
document.querySelectorAll(".nav_links").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("nav_link")) {
      const id = e.target.getAttribute("href");
      console.log("clicked");
      // document.querySelector(id).style.transform = "translateY(8rem)";
      allSections.forEach(function (section) {
        // sectionObserver.unobserve(section);
        // section.classList.remove("section-hidden");
        section.style.transform = "translateY(8rem)";
        section.style.opacity = 1;
        section.style.transition = "all 0s";
      });
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
});

const navBtn = document.querySelector(".open-nav-btn");
const navOpen = document.querySelector(".open-nav");
const navBar = document.querySelector(".nav-bar");

// navOpen.classList.remove("open");
let navActive = false;

function navControl() {
  function openNav() {
    navOpen.classList.add("open");
    navBar.classList.remove("hide-nav");
    navActive = true;
  }
  function closeNav() {
    navOpen.classList.remove("open");
    navBar.classList.add("hide-nav");
    navActive = false;
  }

  function toggleNav() {
    !navActive ? openNav() : closeNav();
  }

  navBtn.addEventListener("click", () => {
    toggleNav();
  });
}
navControl();
