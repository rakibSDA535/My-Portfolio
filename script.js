// Typing Animation
const textElement = document.getElementById("typing-text");
const roles = [
  "Full Stack Developer",
  "Backend Expert",
  ".NET Developer",
  "Angular and React Enthusiast",
  "UI/UX Designer",
];
let roleIndex = 0,
  charIndex = 0,
  isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  textElement.textContent = isDeleting
    ? currentRole.substring(0, charIndex - 1)
    : currentRole.substring(0, charIndex + 1);

  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  let speed = isDeleting ? 50 : 150;
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    speed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }
  setTimeout(typeEffect, speed);
}

// --- EmailJS Implementation ---
(function () {
  // আপনার EmailJS Public Key এখানে বসান
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const btn = this.querySelector("button");
    btn.innerText = "Sending...";

    // SERVICE_ID এবং TEMPLATE_ID আপনার EmailJS ড্যাশবোর্ড থেকে নিয়ে এখানে বসান
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
      function () {
        alert("Success! Your message has been sent.");
        btn.innerText = "Send Message";
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Failed to send message. Please check your EmailJS keys.");
        btn.innerText = "Send Message";
      },
    );
  });

window.onload = typeEffect;

/**/
// const pageTurnBtn = document.querySelectorAll(".nextprev-btn");
// pageTurnBtn.forEach((el, index) => {
//   el.onclick = () => {
//     const pageTurnId = el.getAttribute("data-page");
//     const pageTurn = document.getElementById(pageTurnId);
//     if (pageTurn.classList.contains("turn")) {
//       pageTurn.classList.remove("turn");
//       setTimeout(() => {
//         pageTurn.style.zIndex = 20 + index;
//       }, 500);
//     } else {
//       pageTurn.classList.add("turn");
//       setTimeout(() => {
//         pageTurn.style.zIndex = 20 + index;
//       }, 500);
//     }
//   };
// });
/*=================================*/
// const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

// pageTurnBtn.forEach((el) => {
//   el.onclick = () => {
//     const pageTurnId = el.getAttribute("data-page");
//     const pageTurn = document.getElementById(pageTurnId);

//     if (pageTurn.classList.contains("turn")) {
//       pageTurn.classList.remove("turn");
//       // পেজ ফিরে আসার সময় z-index কমাতে হবে যেন আগের পেজ দেখা যায়
//       setTimeout(() => {
//         pageTurn.style.zIndex = "";
//       }, 500);
//     } else {
//       pageTurn.classList.add("turn");
//       // পেজ উল্টানোর সময় z-index বাড়াতে হবে
//       setTimeout(() => {
//         pageTurn.style.zIndex = "20";
//       }, 500);
//     }
//   };
// });
/*=================================*/
// ===============================
// NEXT / PREVIOUS BUTTON
// ===============================
const nextPrevBtns = document.querySelectorAll(".nextprev-btn");
nextPrevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pageId = btn.getAttribute("data-page");
    const page = document.getElementById(pageId);

    if (btn.classList.contains("back")) {
      // BACK (reverse flip)
      page.classList.remove("turn");

      setTimeout(() => {
        page.style.zIndex = "";
      }, 500);
    } else {
      // NEXT (forward flip)
      page.classList.add("turn");

      setTimeout(() => {
        page.style.zIndex = 20;
      }, 500);
    }
  });
});

/*===================index===============*/
document.querySelectorAll(".index-item").forEach((item) => {
  item.addEventListener("click", () => {
    const targetPageNum = item.getAttribute("data-target");
    document.querySelectorAll(".book-page.page-right").forEach((page) => {
      page.classList.remove("turn");
    });
    for (let i = 1; i <= targetPageNum; i++) {
      const page = document.getElementById(`turn-${i}`);
      if (page) {
        page.classList.add("turn");
        page.style.zIndex = 20 + i;
      }
    }
  });
});

/*========================*/
/* Index বাটনে ক্লিক করলে প্রথম পাতায় (Index Page) ফিরে যাওয়ার লজিক */
document.querySelectorAll(".index-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const turnedPages = document.querySelectorAll(".book-page.turn");
    const allPages = Array.from(turnedPages).reverse();

    allPages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.remove("turn");
        setTimeout(() => {
          const totalPages = document.querySelectorAll(".book-page").length;
          page.style.zIndex =
            totalPages -
            Array.from(document.querySelectorAll(".book-page")).indexOf(page);
        }, 500);
      }, index * 200);
    });
  });
});
/*================mobile nav===============*/
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector("#nav-menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

document.querySelectorAll("header nav ul li a").forEach((n) =>
  n.addEventListener("click", () => {
    menu.classList.remove("is-active");
    menuLinks.classList.remove("active");
  }),
);
