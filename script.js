const introScreen = document.getElementById("introScreen");
const giftScreen = document.getElementById("giftScreen");
const birthdayScreen = document.getElementById("birthdayScreen");

const openBtn = document.getElementById("openBtn");
const giftBox = document.getElementById("giftBox");
const continueBtn = document.getElementById("continueBtn");

const missionScreen = document.getElementById("missionScreen");

const yesBtn = document.getElementById("yesBtn");
const thinkBtn = document.getElementById("thinkBtn");

const missionResponse = document.getElementById("missionResponse");
const rewardBtn = document.getElementById("rewardBtn");

const memoryScreen = document.getElementById("memoryScreen"); const nextPhotoBtn = document.getElementById("nextPhotoBtn"); const finishMemoryBtn = document.getElementById("finishMemoryBtn"); const memoryImage = document.getElementById("memoryImage"); const memoryCaption = document.getElementById("memoryCaption"); const photoNumber = document.querySelector(".photo-number"); const photoCard = document.querySelector(".photo-card");



const selectedGiftName =
    document.getElementById("selectedGiftName");



const giftOptions =
    document.querySelectorAll(".gift-option");

const giftContinueBtn =
    document.getElementById("giftContinueBtn");

const giftResultContinueBtn =
    document.getElementById("giftResultContinueBtn");

const giftSelectionScreen =
    document.getElementById("giftSelectionScreen");

const giftResultScreen =
    document.getElementById("giftResultScreen");
// ================================
// SCREEN TRANSITION
// ================================

function changeScreen(current, next) {
    current.classList.remove("active");

    setTimeout(() => {
        next.classList.add("active");
    }, 500);
}


// ================================
// FIRST SCREEN
// ================================

openBtn.addEventListener("click", () => {
    // Button click effect
    openBtn.classList.add("clicked");

    setTimeout(() => {
        changeScreen(introScreen, giftScreen);
    }, 250);
});


// ================================
// GIFT BOX
// ================================

giftBox.addEventListener("click", () => {

    if (giftBox.classList.contains("opened")) {
        return;
    }

    giftBox.classList.add("opened");

    document.getElementById("clickGift").textContent =
        "Wait for it... 👀";

    setTimeout(() => {
        createConfetti();
    }, 700);

    setTimeout(() => {
        changeScreen(giftScreen, birthdayScreen);
    }, 1800);
});


// ================================
// CONFETTI
// ================================

function createConfetti() {

    const container = document.getElementById("confetti-container");

    const symbols = [
        "✨",
        "🎉",
        "💜",
        "🎂",
        "💕",
        "⭐",
        "🌸"
    ];

    for (let i = 0; i < 80; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.fontSize =
            (10 + Math.random() * 15) + "px";

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);
    }
}


// ================================
// CONTINUE
// ================================

continueBtn.addEventListener("click", () => {

    changeScreen(birthdayScreen, missionScreen);

});

function showMissionResponse(message) {

    missionResponse.classList.remove("show");

    setTimeout(() => {

        missionResponse.textContent = message;

        missionResponse.classList.add("show");

        rewardBtn.classList.remove("hidden");

    }, 200);

}


yesBtn.addEventListener("click", () => {

    showMissionResponse(
        "Hmm... suspiciously confident. 🤨 But okay, we'll accept it. 😂"
    );

});


thinkBtn.addEventListener("click", () => {

    showMissionResponse(
        "Take your time. After all, you've had another whole year to figure it out. 😂"
    );

});

rewardBtn.addEventListener("click", () => { changeScreen(missionScreen, memoryScreen); });

const memories = [

    {
        image:
            "https://picsum.photos/600/700?random=1",

        caption:
            "Exhibit A: name spotted in her natural habitat. 😂"
    },

    {
        image:
            "https://picsum.photos/600/700?random=2",

        caption:
            "Exhibit B: Somehow still surviving another year. Impressive. 😌😂"
    },

    {
        image:
            "https://picsum.photos/600/700?random=3",

        caption:
            "Exhibit C: Proof that she occasionally looks completely innocent. 👀"
    },

    {
        image:
            "https://picsum.photos/600/700?random=4",

        caption:
            "Final exhibit: The legendary name. Case closed. 🫡😂"
    }

];


let currentMemory = 0;


nextPhotoBtn.addEventListener("click", () => {

    currentMemory++;

    if (currentMemory < memories.length) {

        photoCard.classList.remove("photo-changing");

        void photoCard.offsetWidth;

        photoCard.classList.add("photo-changing");


        memoryImage.src =
            memories[currentMemory].image;


        memoryCaption.textContent =
            memories[currentMemory].caption;


        photoNumber.textContent =
            String(currentMemory + 1).padStart(2, "0")
            +
            " / "
            +
            String(memories.length).padStart(2, "0");


        if (
            currentMemory === memories.length - 1
        ) {

            nextPhotoBtn.classList.add("hidden");

            finishMemoryBtn.classList.remove("hidden");

        }

    }

});


finishMemoryBtn.addEventListener("click", () => {

    changeScreen(
        memoryScreen,
        giftSelectionScreen
    );

});

let selectedGift = null;


console.log(
    "Gift options found:",
    giftOptions.length
);


giftOptions.forEach((option) => {

    option.addEventListener("click", () => {

        console.log(
            "Gift selected:",
            option.dataset.gift
        );


        /*
         * Remove previous selection
         */

        giftOptions.forEach((item) => {

            item.classList.remove(
                "selected"
            );

        });


        /*
         * Select clicked card
         */

        option.classList.add(
            "selected"
        );


        /*
         * Save gift name
         */

        selectedGift =
            option.dataset.gift;


        /*
         * Change continue button
         */

        if (giftContinueBtn) {

            giftContinueBtn.disabled = false;

            giftContinueBtn.textContent =
                "Continue with "
                +
                selectedGift
                +
                " →";

        }

    });

});


/* =========================================
   GIFT SELECTION → RESULT
========================================= */

if (giftContinueBtn) {

    giftContinueBtn.addEventListener("click", () => {

        if (!selectedGift) {

            return;

        }


        console.log(
            "Continuing with:",
            selectedGift
        );


        /*
         * Show selected gift
         */

        if (selectedGiftName) {

            selectedGiftName.textContent =
                selectedGift;

        }


        /*
         * Move to result screen
         */

        changeScreen(
            giftSelectionScreen,
            giftResultScreen
        );


        /*
         * Celebration confetti
         */

        setTimeout(() => {

            createConfetti();

        }, 600);

    });

}


/* =========================================
   RESULT → NEXT SECTION
========================================= */

if (giftResultContinueBtn) {

    giftResultContinueBtn.addEventListener(
        "click",
        () => {

            alert(
                "The final surprise is waiting... 💌"
            );

        }
    );

}
