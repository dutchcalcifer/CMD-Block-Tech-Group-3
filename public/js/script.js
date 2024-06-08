// Video script
// document.getElementById('uploadForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//         const mediaPreview = document.getElementById('mediaPreview');
//         mediaPreview.innerHTML = '';

//         const url = URL.createObjectURL(file);
//         let mediaElement;

//         if (file.type.startsWith('video/')) {
//             mediaElement = document.createElement('video');
//             mediaElement.controls = true;
//         } else if (file.type.startsWith('audio/')) {
//             mediaElement = document.createElement('audio');
//             mediaElement.controls = true;
//         }

//         if (mediaElement) {
//             mediaElement.src = url;
//             mediaPreview.appendChild(mediaElement);
//         }
//     }
// });

// pauze for you
function videoPauze() {
    var videos = document.querySelectorAll("video");
    const contentElement = document.getElementById('user-info-container');

    videos.forEach(function(video) {
        video.addEventListener("click", function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        contentElement?.addEventListener('scroll', () => {
            video.pause();
        });
    });
}
videoPauze();


// in css: #user-info-container div:first-of-type.hidden {
//     display: none; 
//   }

// search test
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let filter = document.getElementById('searchInput').value.toLowerCase();
    let videoBackgrounds = document.querySelectorAll('#videoBackground');

    videoBackgrounds.forEach(function(videoBackground) {
        let bandNameElement = videoBackground.querySelector('h2');
        let bandName = bandNameElement.textContent.toLowerCase();

        if (bandName.includes(filter)) {
            videoBackground.classList.remove('hidden');
            if (filter !== "") { 
                videoBackground.scrollIntoView({ behavior: 'auto' });
            }
        } else {
            videoBackground.classList.add('hidden');
        }
    });

    let noResultParagraph = document.getElementById('noResultsMessage');
    if (!filter || !document.querySelectorAll('#videoBackground:not(.hidden)').length) {
        if (!noResultParagraph) {
            noResultParagraph = document.createElement('p');
            noResultParagraph.id = 'noResultsMessage';
            noResultParagraph.textContent = 'Geen resultaten gevonden';
            document.body.appendChild(noResultParagraph);
        }
    } else {
        if (noResultParagraph) {
            noResultParagraph.remove();
        }
    }
});







const searchInput = document.getElementById('searchInput');
const videoBackgrounds = document.querySelectorAll('#videoBackground');

searchInput?.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        videoBackgrounds.forEach(function(videoBackground) {
            videoBackground.classList.remove('hidden');
        });
    }
});








const scrollableElement = document.getElementById('user-info-container');
let scrollPosition = 0; 

searchInput?.addEventListener('blur', function() {

    if (this.value.trim() === '') {
        const anyHidden = Array.from(document.querySelectorAll('[id^="videoBackground"]'))
        .some(videoBackground => videoBackground.classList.contains('hidden'));
        
        if (!anyHidden) {
            videoBackgrounds.forEach(function(videoBackground) {
            videoBackground.classList.remove('hidden');
            });

            console.log("Scrollpositie terugkeren naar: ", scrollPosition);
    
            scrollableElement.scrollTop = scrollPosition;
        } else {
            scrollPosition = 0;
        }
    }
});

searchInput?.addEventListener('focus', function() {
    const anyHidden = Array.from(document.querySelectorAll('[id^="videoBackground"]'))

    .some(videoBackground => videoBackground.classList.contains('hidden'));
    if (!anyHidden) {
        scrollPosition = scrollableElement.scrollTop;
        console.log("Huidige scrollpositie: ", scrollPosition);
    }
});






// Next and prev button
document.addEventListener('DOMContentLoaded', function() {
    const partials = document.querySelectorAll('.partial');
    let currentIndex = 0;
    let currentStep = 1;

    function showPartial(index) {
        partials.forEach((partial, i) => {
            if (i === index) {
                partial.classList.remove('hidden');
            } else {
                partial.classList.add('hidden');
            }
        });
    }

    const prevBtn = document.getElementById('prevBtn');

    prevBtn?.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showPartial(currentIndex);
            updateProgressBar(false); // Update progress bar when going back
        }
    });

    const nextBtn = document.getElementById('nextBtn');
    
    nextBtn?.addEventListener('click', function() {
        if (validateForm()) {
            if (currentIndex < partials.length - 1) {
                currentIndex++;
                showPartial(currentIndex);
            }
        }
    });

    showPartial(currentIndex); // Initialize the first partial to be visible


    // Progressbar
    function validateForm() {
        const currentPartial = partials[currentIndex];
        const inputs = currentPartial.querySelectorAll('input[required], textarea[required]');
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                alert('Please fill in all required fields.');
                return false;
            }
        }
        // Update the progress bar here if validation succeeds
        updateProgressBar(true);
        return true;
    }

    function updateProgressBar(isNext) {
        const steps = document.querySelectorAll('.progressbar');
        if (isNext) {
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
            }
        } else {
            if (currentStep > 1) {
                currentStep--;
                steps[currentStep].classList.remove('active');
            }
        }
    }
});


// Back button profile
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = '/foryou';
  });    


// Show/hide edit icon
document.addEventListener('DOMContentLoaded', function() {
    const editIcon = document.querySelector('#editIcon');
    const saveButton = document.querySelector('#saveButton');
    const inputs = document.querySelectorAll('input[type="text"], textarea'); // Selecteer alle input- en textarea-elementen
    const mediaInputs = document.querySelectorAll('.mediaInput');
    const backgroundSection = document.querySelector('#backgroundSection');

    // Function to toggle readonly attributes
    function toggleReadonly(enable) {
        inputs.forEach(function(input) {
            if (enable) {
                input.setAttribute('readonly', 'readonly');
                input.classList.remove('toggleInput'); // Verwijder highlight class
            } else {
                input.removeAttribute('readonly');
                input.classList.add('toggleInput'); // Voeg highlight class toe
            }
        });
    }

    // Event listener for the 'Save' button
    saveButton.addEventListener('click', function() {
        saveButton.style.display = 'none'; // Verberg de 'Save' knop
        toggleReadonly(true); // Schakel readonly attributen weer in
        mediaInputs.forEach(function(input) {
            input.style.display = 'none'; // Verberg het bestand-input
        });
    });

    // Event listener for the main edit icon
    editIcon.addEventListener('click', function() {
        saveButton.style.display = 'block'; // Toon de 'Save' knop
        toggleReadonly(false); // Verwijder readonly attributen
        mediaInputs.forEach(function(input) {
            input.style.display = 'block'; // Toon het bestand-input
        });
    });
});


// Choice button check 
document.addEventListener('DOMContentLoaded', function() {
    const choiceButtons = document.querySelectorAll('.style-choice-button input[type="checkbox"]');

    choiceButtons.forEach(function(button) {
        // Voeg klasse 'checked' toe aan aangevinkte buttons
        if (button.checked) {
            const parentDiv = button.parentNode;
            parentDiv.classList.add('checked');
        }

        // Voeg eventlistener toe voor wijzigingen
        button.addEventListener('change', function() {
            const parentDiv = this.parentNode;
            if (this.checked) {
                parentDiv.classList.add('checked');
            } else {
                parentDiv.classList.remove('checked');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const choiceButtons = document.querySelectorAll('.style-choice-button');

    choiceButtons.forEach(function(button) {
        const checkbox = button.querySelector('input[type="checkbox"]');

        // Voeg eventlistener toe voor klikgebeurtenissen op de knoppen
        button.addEventListener('click', function() {
            // Toggle de checked status van de checkbox
            checkbox.checked = !checkbox.checked;
            // Voeg of verwijder de 'checked' klasse aan de knop
            button.classList.toggle('checked', checkbox.checked);
        });
    });
});


// Edit partials 
document.addEventListener('DOMContentLoaded', function() {
    const editDescriptionIcon = document.getElementById('editDescriptionIcon');

    const partials = document.querySelectorAll('.partial');

    function hideAllPartials() {
        partials.forEach(partial => {
            partial.style.display = 'none';
        });
    }

    function showPartial(partialId) {
        hideAllPartials();
        document.getElementById(partialId).style.display = 'block';
    }

    editDescriptionIcon?.addEventListener('click', function() {
        showPartial('partial-description');
    });

        // Initially hide all partials
        hideAllPartials();
});














  
  