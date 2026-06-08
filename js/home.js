// Loader Code Start 

window.addEventListener('load', function() {
    const loader = document.getElementById('loader-wrapper');
    //Smoothly fade out
    loader.style.opacity = '0';
    //Completely remove from layout after fade finishes
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
    });



// Loader Code End 




// Fetching Header and Footer Code Start 



document.addEventListener("DOMContentLoaded", () => {
    
    // Clean, easy async function definition
    async function loadComponent(selector, fileUrl) {
        try {
            const response = await fetch(fileUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Wait for the text content to arrive
            const htmlContent = await response.text();
            
            // Inject it into the page element safely
            const targetElement = document.querySelector(selector);
            if (targetElement) {
                targetElement.innerHTML = htmlContent;
            }

            // Run your scroll animation setup once header is ready
            if (selector === '#header-placeholder') {
                initHeaderScroll();
            }
            
        } catch (error) {
            console.error(`Could not load component from ${fileUrl}:`, error);
        }
    }

    // Call them cleanly line-by-line
    loadComponent('#header-placeholder', './components/header.html');
    loadComponent('#sidebar-placeholder', './components/sidebar.html');
    loadComponent('#footer-placeholder', './components/footer.html');
});



// Fetching Header and Footer Code End 


// Header Hide on Scroll Code Start 


// Wrap your scroll logic in a function so it can be called safely
function initHeaderScroll() {
    const header1 = document.getElementById("header-1");
    const header2 = document.getElementById("header-2");

    // Safety check to ensure elements exist
    if (!header1 || !header2) return;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            // We are scrolled down: Show Header 2
            header1.classList.add("hidden");
            header1.classList.remove("visible");

            header2.classList.add("visible");
            header2.classList.remove("hidden");
        } else {
            // We are back at the top (0-100px): Show Header 1
            header1.classList.add("visible");
            header1.classList.remove("hidden");

            header2.classList.add("hidden");
            header2.classList.remove("visible");
        }
    });
}


// Header Hide on Scroll Code Start 





// Auto Text Typing Effect Code Start 


const textArray = ["Web Developer.", "Freelancer."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // Base typing speed
let deletingSpeed = 50; // Base deleting speed
let pauseTime = 1500; // Pause time before deleting (1.5 seconds)

function typeEffect() {
    const element = document.getElementById("auto-text");
    let currentText = textArray[textIndex];
    let displayedText = currentText.substring(0, charIndex);

    element.innerHTML = displayedText + "<span class='cursor'>|</span>"; // Add cursor

    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } 
    else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, deletingSpeed);
    } 
    else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % textArray.length;
        }
        setTimeout(typeEffect, pauseTime);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Auto Text Typing Effect Code End





// Moving Border Effect Code Start 



    const handleOnMouseMoveOtherEx = e => {
    const { currentTarget: target } = e;


    const rect = target.getBoundingClientRect(),

    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    }



    for(const otherEx of document.querySelectorAll(".other-ex")) {
        otherEx.onmousemove = e => handleOnMouseMoveOtherEx(e);
    }


    // Moving Border Effect Code End 



   // For Counting Effect Start


  // For Works Counting Effect
    
    // 1. Setup the Observer Options
const observerOptions = {
    threshold: 0.2 // Starts when 20% of the element is visible
};

// 2. The Animation Function
const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            // Find all numbers within this specific container
            const counters = container.querySelectorAll('.num, .skill-num');

            counters.forEach((e) => {
                let start = 0;
                let end = parseInt(e.dataset.num);
                let duration = 2500; // Total time in ms
                
                // Safety check: if end is 0, don't interval
                if(end === 0) return e.textContent = 0;

                let count = setInterval(() => {
                    start++;
                    e.textContent = start;
                    if (start == end) {
                        clearInterval(count);
                    }
                }, duration / end);
            });

            // 3. Stop watching once the animation has triggered
            observer.unobserve(container);
        }
    });
};

// 4. Create the Observer
const counterObserver = new IntersectionObserver(startCounting, observerOptions);

// 5. Tell it what to watch
const workSection = document.querySelector(".work");
const skillSection = document.querySelector(".skills");

if (workSection) counterObserver.observe(workSection);
if (skillSection) counterObserver.observe(skillSection);


    // For Counting Effect End
    
    



  
    
    

// For Skills Counting Effect Start


const progressBars = document.querySelectorAll('.progress-bar div.count');

// 1. Define the "Watchman" (The Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 2. Check if the bar is visible on screen
        if (entry.isIntersecting) {
            const bar = entry.target; // This is the specific bar that scrolled into view
            startAnimation(bar);      // Run your animation function
            observer.unobserve(bar);  // Stop watching this bar once it's started (so it doesn't repeat)
        }
    });
}, { threshold: 0.5 }); // 0.5 means start when 50% of the bar is visible

// 3. Tell the Observer which elements to watch
progressBars.forEach(bar => {
    observer.observe(bar);
});

// 4. Wrap your original logic in a function
function startAnimation(bar) {
    const target = parseInt(bar.getAttribute('data-target'));
    const span = bar.querySelector('span');
    let currentCount = 0;

    // Trigger width
    bar.style.width = target + '%';

    // Start counter
    const updateCounter = () => {
        const increment = target / 100; 
        if (currentCount < target) {
            currentCount += increment;
            span.innerText = Math.ceil(currentCount) + "%";
            requestAnimationFrame(updateCounter);
        } else {
            span.innerText = target + "%";
        }
    };
    updateCounter();
}






// For Skills Counting Effect End


// For Latest Services Info Box Start


const handleOnMouseMoveLs = e => {
    const { currentTarget: target } = e;


    const rect = target.getBoundingClientRect(),

    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    }



    for(const Ls of document.querySelectorAll(".ls-info")) {
        Ls.onmousemove = e => handleOnMouseMoveLs(e);
    }




// For Latest Services Info Box End



// For Education & Experience Info Box Start


const handleOnMouseMoveEd = e => {
    const { currentTarget: target } = e;


    const rect = target.getBoundingClientRect(),

    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    }



    for(const Ed of document.querySelectorAll(".ed-info")) {
        Ed.onmousemove = e => handleOnMouseMoveEd(e);
    }





// For Education & Experience Info Box End



// My Skill Section Code Start

const mSkillContainer = document.querySelector('.mskill-container');
const mSkillCards = document.querySelectorAll('.mskill-card');
const mSkillIndicator = document.querySelector('.mskill-indicator');

// Track which card should be the permanent "home base"
let defaultActiveCard = document.querySelector('.mskill-card.active') || mSkillCards[0];

function moveIndicator(element) {
  if (!element || !mSkillContainer) return;

  const containerRect = mSkillContainer.getBoundingClientRect();
  const cardRect = element.getBoundingClientRect();

  const relativeTop = cardRect.top - containerRect.top;
  const cardHeight = cardRect.height;

  mSkillContainer.style.setProperty('--top', `${relativeTop}px`);
  mSkillContainer.style.setProperty('--height', `${cardHeight}px`);
}

// 1. Initialize setup on load
function initIndicator() {
  if (defaultActiveCard) {
    // Ensure our home-base card explicitly has the active class applied
    mSkillCards.forEach(card => card.classList.remove('active'));
    defaultActiveCard.classList.add('active');
    moveIndicator(defaultActiveCard);
  }
}

if (document.readyState === 'complete') {
  initIndicator();
} else {
  window.addEventListener('load', initIndicator);
}

// Auto-adjust layout on window resize or mobile orientation flip
const resizeObserver = new ResizeObserver(() => {
  const currentActive = document.querySelector('.mskill-card.active');
  if (currentActive) moveIndicator(currentActive);
});
resizeObserver.observe(mSkillContainer);

// 2. Track hover movements
mSkillCards.forEach(box => {
  box.addEventListener('mouseenter', (e) => {
    const currentCard = e.currentTarget;
    
    // Switch the active class visual style to the currently hovered card
    mSkillCards.forEach(card => card.classList.remove('active'));
    currentCard.classList.add('active');
    
    moveIndicator(currentCard);
  });
});

// 3. Snap back to the original home base card when the mouse leaves the container
mSkillContainer.addEventListener('mouseleave', () => {
  // Clear out active statuses from hovered items
  mSkillCards.forEach(card => card.classList.remove('active'));
  
  // Re-apply active status back to our original default card
  defaultActiveCard.classList.add('active');
  
  // Slide the indicator box back home
  moveIndicator(defaultActiveCard);
});

// Optional: If you want a card to become the NEW permanent home base when clicked
mSkillCards.forEach(box => {
  box.addEventListener('click', (e) => {
    defaultActiveCard = e.currentTarget;
  });
});


// My Skill Section Code End


// For Comment Section Swiper Start

const swiper = new Swiper('.swiper', {
    loop:true,

  spaceBetween: 100,
    breakpoints:{
        0:{
            slidesPerView:1
        },
        992:{
            slidesPerView:2
        }
    }
});



// For Comment Section Swiper End



// Contact Section Moving Border Effect Start


    const handleOnMouseMoveContact = e => {
    const { currentTarget: target } = e;


    const rect = target.getBoundingClientRect(),

    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    }



    for(const contact of document.querySelectorAll(".contact")) {
        contact.onmousemove = e => handleOnMouseMoveContact(e);
    }

    // Contact Section Moving Border Effect End






