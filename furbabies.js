document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOOKING TO DROPDOWN
    ===================================================== */

    const lookingButton = document.getElementById("lookingToBtn");
    const lookingDropdown = document.querySelector(".looking-dropdown");

    if (lookingButton && lookingDropdown) {

        lookingButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            lookingDropdown.classList.toggle("active");

        });

    }


    /* =====================================================
       STORY DATA
    ===================================================== */

    const stories = {

        angelina: {
            title: "Mama Angelina",
            subtitle: "The Loving Mama",
            story: "Mama Angelina adalah sosok mama yang penuh kasih. Ia ditemukan dalam kondisi yang membutuhkan perhatian dan perawatan. Setelah mendapatkan tempat yang aman, makanan, dan banyak kasih sayang, Mama Angelina perlahan menunjukkan sisi lembut dan penyayangnya."
        },

        keanu: {
            title: "Keanu",
            subtitle: "The Gentle Boy",
            story: "Keanu adalah anak laki-laki yang lembut dan tenang. Ia membutuhkan waktu untuk merasa aman di lingkungan barunya. Dengan kesabaran dan perhatian, Keanu mulai mempercayai orang-orang yang merawatnya."
        },

        michael: {
            title: "Michael",
            subtitle: "The Special Boy",
            story: "Michael memiliki perjalanan rescue yang membuatnya menjadi salah satu bagian istimewa dari keluarga kami. Ia mendapatkan tempat yang aman, perawatan dan perhatian yang ia butuhkan. Kini Michael dapat menikmati hari-harinya dengan lebih tenang dan nyaman."
        },

        agnes: {
            title: "Agnes",
            subtitle: "The Sweet Girl",
            story: "Agnes adalah gadis kecil yang manis dan penuh rasa ingin tahu. Setelah diselamatkan, ia mendapatkan tempat yang aman untuk beristirahat dan tumbuh. Kepribadiannya yang lembut membuat Agnes menjadi salah satu hewan yang sangat disayangi."
        },

        bobby: {
            title: "Bobby",
            subtitle: "The Curious Boy",
            story: "Bobby adalah anak laki-laki yang penuh rasa ingin tahu. Ia senang memperhatikan apa yang terjadi di sekitarnya dan perlahan mulai merasa nyaman setelah mendapatkan perawatan dan lingkungan yang aman."
        },

        acil: {
            title: "Acil",
            subtitle: "The Little Fighter",
            story: "Acil adalah sosok kecil dengan semangat yang besar. Perjalanannya sebagai rescue mengajarkannya untuk terus bertahan. Dengan perawatan dan kasih sayang, Acil terus menunjukkan keberanian."
        },

        daddy: {
            title: "Daddy",
            subtitle: "The Calm One",
            story: "Daddy memiliki sifat yang tenang dan lembut. Ia menikmati suasana yang nyaman dan tidak terlalu banyak keributan. Setelah mendapatkan tempat yang aman, Daddy dapat menjalani hari-harinya dengan lebih santai."
        },

        alexander: {
            title: "Alexander",
            subtitle: "The Little Explorer",
            story: "Alexander adalah sosok kecil yang suka menjelajahi lingkungan sekitarnya. Rasa ingin tahunya membuat hari-harinya selalu penuh dengan hal baru. Sekarang ia dapat mengeksplorasi dunianya dengan aman."
        },

        bruno: {
            title: "Kofu",
            subtitle: "The Loyal Boy",
            story: "Kofu adalah anak laki-laki yang loyal dan penuh energi. Setelah mendapatkan tempat yang aman, ia mulai menunjukkan sisi ramah dan menyenangkan dari dirinya."
        },

        milo: {
            title: "Eddy",
            subtitle: "The Playful Boy",
            story: "Eddy adalah anak laki-laki yang playful dan penuh energi. Ia menikmati waktu bermain dan perhatian dari orang-orang yang merawatnya. Keceriaannya menjadi salah satu hal yang membuatnya sangat disayangi."
        },

        sydney: {
            title: "Sydney",
            subtitle: "The Sweet Girl",
            story: "Sydney adalah gadis yang manis dan lembut. Ia mendapatkan kesempatan untuk merasa aman dan mendapatkan perhatian yang sebelumnya sangat ia butuhkan. Dengan lingkungan yang nyaman dan penuh kasih sayang, Sydney dapat menikmati hari-harinya dengan tenang."
        },

        cincau: {
            title: "Cincau",
            subtitle: "The Strong Boy",
            story: "Cincau adalah anak laki-laki yang kuat dan memiliki semangat yang besar. Perjalanan rescue membuatnya mendapatkan kesempatan untuk hidup dengan lebih aman dan nyaman. Sekarang Cincau dapat menikmati perhatian dan kasih sayang dari keluarga yang merawatnya."
        },

        keira: {
            title: "Keira",
            subtitle: "The Brave One",
            story: "Keira adalah sosok yang berani dan kuat. Perjalanan rescue membuatnya belajar untuk percaya kembali. Dengan lingkungan yang aman dan penuh kasih, Keira terus menunjukkan semangatnya."
        }

    };


    /* =====================================================
       FIND ALL STORY CARDS
    ===================================================== */

    const storyCards = document.querySelectorAll(".story-card");


    console.log(
        "Jumlah story card:",
        storyCards.length
    );


    /* =====================================================
       CREATE STORY AREA
    ===================================================== */

    storyCards.forEach(function (card) {

        const storyId = card.getAttribute("data-story");

        const story = stories[storyId];

        if (!story) {

            console.warn(
                "Story tidak ditemukan untuk:",
                storyId
            );

            return;

        }


        /* Jangan membuat story dua kali */

        if (
            card.querySelector(".story-card-back")
        ) {

            return;

        }


        const storyBack =
            document.createElement("div");


        storyBack.className =
            "story-card-back";


        storyBack.innerHTML = `

            <div class="story-content">

                <div class="story-label">
                    🐾 RESCUE STORY
                </div>

                <h3>
                    ${story.title}
                </h3>

                <h4>
                    ${story.subtitle}
                </h4>

                <p>
                    ${story.story}
                </p>

                <div class="story-notice">
                    ❤️ Rescued • Not for Adoption
                </div>

                <button
                    type="button"
                    class="story-back-btn"
                >
                    ← Kembali
                </button>

            </div>

        `;


        card.appendChild(storyBack);

    });


    /* =====================================================
       OPEN STORY
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const storyButton =
                event.target.closest(".story-link");


            if (!storyButton) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();


            const card =
                storyButton.closest(".story-card");


            if (!card) {
                return;
            }


            console.log(
                "Story dibuka:",
                card.dataset.story
            );


            /* Tutup card lain */

            storyCards.forEach(function (otherCard) {

                if (otherCard !== card) {

                    otherCard.classList.remove(
                        "flipped"
                    );

                }

            });


            /* Buka card */

            card.classList.add(
                "flipped"
            );

        }
    );


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const backButton =
                event.target.closest(
                    ".story-back-btn"
                );


            if (!backButton) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();


            const card =
                backButton.closest(
                    ".story-card"
                );


            if (!card) {
                return;
            }


            card.classList.remove(
                "flipped"
            );

        }
    );


    /* =====================================================
       CLOSE LOOKING TO
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                lookingDropdown &&
                !lookingDropdown.contains(
                    event.target
                )
            ) {

                lookingDropdown.classList.remove(
                    "active"
                );

            }

        }
    );

});