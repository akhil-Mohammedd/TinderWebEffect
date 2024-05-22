let users = [
   {
      profilePic:
         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      displayPic:
         "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      pendingMessage: 6,
      Location: "New York",
      name: "Alice",
      age: 25,
      interests: [
         {
            icon: '<i class="ri-book-2-fill"></i>',
            interest: "reading",
         },
         {
            icon: '<i class="ri-roadster-fill"></i>',
            interest: "traveling",
         },
      ],

      bio: "Love exploring new places.",
      isFriend: null,
   },
   {
      profilePic:
         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      displayPic:
         "https://images.unsplash.com/photo-1512310604669-443f26c35f52?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      pendingMessage: 9,
      Location: "Los Angeles",
      name: "Bob",
      age: 30,
      interests: [
         {
            icon: '<i class="ri-bowl-fill"></i>',
            interest: "Cooking",
         },
         {
            icon: '<i class="ri-football-fill"></i>',
            interest: "Sports",
         },
      ],

      bio: "Avid reader and writer.",
      isFriend: null,
   },
   {
      profilePic:
         "https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      displayPic:
         "https://images.unsplash.com/photo-1615212079782-15a3ed596838?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      pendingMessage: 14,
      Location: "Chicago",
      name: "Charlie",
      age: 22,
      interests: [
         {
            icon: '<i class="ri-music-2-fill"></i>',
            interest: "music",
         },
         {
            icon: '<i class="ri-movie-fill"></i>',
            interest: "movies",
         },
      ],

      bio: "Tech enthusiast and gamer.",
      isFriend: null,
   },
   {
      profilePic:
         "https://images.unsplash.com/photo-1530959514100-86bff0e8152b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      displayPic:
         "https://images.unsplash.com/photo-1535207010348-71e47296838a?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      pendingMessage: 11,
      Location: "Houston",
      name: "David",
      age: 28,
      interests: [
         {
            icon: "🥾",
            interest: "hiking",
         },
         {
            icon: '<i class="ri-roadster-fill"></i>',
            interest: "traveling",
         },
      ],

      bio: "Fitness and health junkie.",
      isFriend: null,
   },
];

function select(data) {
   return document.querySelector(data);
}

console.log(users);
let curr = 0;
let isAnimating = false;

function setData(index){
   select(".prflimg img").src = users[index].profilePic;
   select(".location h3").textContent = users[index].Location;
   select(".Badge").textContent = users[index].pendingMessage;
   select(".details h1:nth-child(1)").textContent = users[index].name;
   select(".details h1:nth-child(2)").textContent = users[index].age;

   var clutter = "";
   users[index].interests.forEach(function (interest) {
      clutter += `<div class="tag flex items-center bg-white/30 gap-2 text-white px-3 py-1  rounded-full">
      ${interest.icon}
      <h3 class="text-sm tracking-tighter "> ${interest.interest}</h3>
   </div>`;

      select(".tags").innerHTML = clutter;
   });
   select(".bio p").textContent = users[index].bio;
}
(function setInitial() {
   select(".maincard img").src = users[curr].displayPic;
   select(".incomingCard img").src = users[curr + 1]?.displayPic;

   setData(curr);
   
   curr = 2;
})();

function imageChange() {
   if (!isAnimating) {
      isAnimating = true;
      let tl = gsap.timeline({
         onComplete: function () {
            isAnimating = false;

            // Ensure elements are properly selected
            let main = document.querySelector(".maincard");
            let incoming = document.querySelector(".incomingCard");

            if (!main || !incoming) {
               console.error('Main card or incoming card not found');
               return;
            }

            // Update classes
            incoming.classList.remove("z-[2]");
            incoming.classList.add("z-[3]");
            incoming.classList.remove("incomingCard");

            main.classList.remove("z-[3]");
            main.classList.add("z-[2]");

            // Reset main card styles
            gsap.set(main, {
               scale: 1,
               opacity: 1,
            });

            // Update image src
            if (curr === users.length) {
               curr = 0;
            }

            main.querySelector("img").src = users[curr].displayPic; // Ensure correct image is set
            curr++;

            // Swap classes
            main.classList.remove("maincard");
            main.classList.add("incomingCard");
            incoming.classList.add("maincard");
         },
      });

      // GSAP animation sequences
      tl.to(".maincard", {
         scale: 1.1,
         duration: 1,
         opacity: 0,
      }, "a");

      tl.from(".incomingCard", {
         scale: 0.8,
         duration: 1,
         opacity: 0,
         ease: "expoScale(0.5,7,none)",
      }, "a");
   }
}




document.addEventListener('DOMContentLoaded', function() {
   // Ensure the script runs after the DOM is fully loaded

   // Selecting the deny button
   let accept = document.querySelector(".accept");
      if (accept) {
         accept.addEventListener("click", function() {
             imageChange();
             setData(curr-1);
             gsap.from(".details .element",{
              y:"110%",
              opacity:0,
              duration:1.2,
              ease: Power3.easeInOut,
              stagger:0.01,
           })
         });
     } else {
         console.error('Element with class "denyButton" not found');
     }
   

   let deny = document.querySelector(".deny");
   if (deny) {
       deny.addEventListener("click", function() {
           imageChange();
           setData(curr-1);
           gsap.from(".details .element",{
            y:"110%",
            opacity:0,
            duration:1.2,
            ease: Power3.easeInOut,
            stagger:0.01,
         })
       });
   } else {
       console.error('Element with class "denyButton" not found');
   }

   // Function to create containers for each element with class "element"
   (function containerCreator() {
       document.querySelectorAll(".element").forEach(function(element) {
           let div = document.createElement("div");
           div.classList.add(`${element.classList[1]}container`,'overflow-hidden' );
           div.appendChild(element);
           select(".details").appendChild(div);
       });
   })();
});

