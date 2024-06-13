function previewMedia(event) {
    const file = event.target.files[0];
    const inputId = event.target.id;
    let mediaPreview;

    if (inputId === 'video1') {
        mediaPreview = document.getElementById('mediaPreview1');
    } else if (inputId === 'video2') {
        mediaPreview = document.getElementById('mediaPreview2');
    }

    if (file) {
        const fileType = file.type;
        const fileURL = URL.createObjectURL(file);

        // Clear previous preview
        mediaPreview.innerHTML = '';

        if (fileType.startsWith('video')) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute('controls', '');
            videoElement.src = fileURL;
            mediaPreview.appendChild(videoElement);
        }
    }
}

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
        //pauze on scroll
        contentElement?.addEventListener('scroll', () => {
            video.pause();
        });
    });
}
videoPauze();

// Filter 
const filterButton = document.getElementById('filter');
const filterCloseButton = document.querySelector('#filter-pop-up button:first-child');
const filterSubmit = document.querySelector('#filter-pop-up form > button');

// open
filterButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "100%";
    filterSubmit.classList.remove('hidden');
});

//close
filterCloseButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "0%";
    filterSubmit.classList.add('hidden');
});



// Filter checks
const genreButtons = document.querySelectorAll('#sort fieldset input');
const labels = document.querySelectorAll('#sort fieldset label');

genreButtons?.forEach(function(button) {
    button.addEventListener('change', function() {
        const index = Array.from(genreButtons).indexOf(button);
        if (button.checked) {
            labels[index].style.border = 'solid 0.125em var(--primary-color)';
        } else {
            labels[index].style.border = ''; 
        }
    });
});


// filter checkboxes
document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.getElementById('filter'); 

    document.querySelector('#filter-pop-up form')?.addEventListener('submit', function(event) {
        event.preventDefault();

        let filterFieldsetMember = document.querySelector('#sort fieldset:nth-of-type(3)');
        let checkboxesMembers = filterFieldsetMember.querySelectorAll('input[type="checkbox"]:checked');

        let filterFieldsetGenres = document.querySelector('#sort fieldset:nth-of-type(2)');
        let checkboxesGenres = filterFieldsetGenres.querySelectorAll('input[type="checkbox"]:checked');

        //bron: chatgpt
        let selectedValuesGenres = Array.from(checkboxesGenres).map(cb => cb.value);
        console.log('Selected genre Values:', selectedValuesGenres);

        //bron: chatgpt
        let selectedValuesMembers = Array.from(checkboxesMembers).map(cb => cb.value);
        console.log('Selected Member Values:', selectedValuesMembers);

        let videoBackgrounds = document.querySelectorAll('#videoBackground');
        console.log('Video Backgrounds:', videoBackgrounds);

        videoBackgrounds.forEach(function(videoBackground) {
            let genreElements = videoBackground.querySelectorAll('.genre h3');
            let memberElement = videoBackground.querySelector('section > ul > li:nth-child(2)');

            let hasGenreMatch = !selectedValuesGenres.length || Array.from(genreElements).some(function(genreElement) {
                let genreName = genreElement.textContent.trim();
                return selectedValuesGenres.includes(genreName);
            });

            let hasMemberMatch = !selectedValuesMembers.length || !memberElement || selectedValuesMembers.includes(memberElement.textContent.trim());

            if (hasGenreMatch && hasMemberMatch) {
                videoBackground.classList.remove('hidden');
            } else {
                videoBackground.classList.add('hidden');
            }
        });

    
        if (selectedValuesGenres.length > 0 || selectedValuesMembers.length > 0) {
            filterButton.style.backgroundColor = 'var(--secondary-color)'; 
        } else {
            filterButton.style.backgroundColor = ''; 
        }
    });

    
});


// search 
document.querySelector('#foryouheader form')?.addEventListener('submit', function(event) {
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

    // No results
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

// Scroll back to before searching
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
    const choiceButtons = document.querySelectorAll('.register-choice');
    const partials = document.querySelectorAll('.partial');
    let currentIndex = 0;
    let currentStep = 1;
    let lastClickedButton = null;

    // Function to toggle visibility of .check
    function toggleCheckVisibility(button, visible) {
        const check = button.querySelector('.check');
        if (visible) {
            check.style.display = 'block';
        } else {
            check.style.display = 'none';
        }
    }

    // Event listener for choice buttons
    choiceButtons.forEach(function(button) {
        const checkbox = button.querySelector('input[type="checkbox"]');
        button?.addEventListener('click', function() {
            checkbox.checked = !checkbox.checked;
            button.classList.toggle('checked', checkbox.checked);
            toggleCheckVisibility(button, checkbox.checked);
            if (lastClickedButton && lastClickedButton !== button) {
                lastClickedButton.classList.remove('check');
            }
            lastClickedButton = button;

            // Check genres and instruments each time an input is clicked
            checkGenres();
            checkInstruments();
        });
    });

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

    // Function to validate the form before allowing the user to proceed
    function validateForm() {
        const currentPartial = partials[currentIndex];

        // Update the progress bar here if validation succeeds
        updateProgressBar(true);
        return true;
    }

    // Function to show partials
    function showPartial(index) {
        partials.forEach((partial, i) => {
            if (i === index) {
                partial.classList.remove('hidden');
                partial.style.display = 'block'; // Ensure the partial is visible
            } else {
                partial.classList.add('hidden');
                partial.style.display = 'none'; // Ensure other partials are hidden
            }
        });
    }

    // Progress bar update function
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

    // Edit partials functionality
    const editDescriptionIcon = document.getElementById('editDescriptionIcon');

    function hideAllPartials() {
        partials.forEach(partial => {
            partial.style.display = 'none';
        });
    }

    function showEditPartial(partialId) {
        hideAllPartials();
        document.getElementById(partialId).style.display = 'block';
    }

    editDescriptionIcon?.addEventListener('click', function() {
        showEditPartial('partial-description');
    });

    // Initially hide all partials and then show the first one
    hideAllPartials();
    showPartial(currentIndex);
});

// Profile edit button  
document.addEventListener('DOMContentLoaded', function() {
    const editIcon = document.querySelector('#editIcon');
    const saveButton = document.querySelector('#saveButton');
    const inputs = document.querySelectorAll('input[type="text"], textarea'); // Selecteer alle input- en textarea-elementen
    const mediaInputs = document.querySelectorAll('.mediaInput');
    const choiceButtons = document.querySelectorAll('.profile-choice');

    let lastClickedButton = null;

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

    // Function to toggle visibility of .check
    function toggleCheckVisibility(button, visible) {
        const check = button.querySelector('.check');
        if (visible) {
            check.style.display = 'block';
        } else {
            check.style.display = 'none';
        }
    }

    // Event listener for the 'Save' button
    saveButton.addEventListener('click', function() {
        saveButton.style.display = 'none'; // Verberg de 'Save' knop
        toggleReadonly(true); // Schakel readonly attributen weer in
        mediaInputs.forEach(function(input) {
            input.style.display = 'none'; // Verberg het bestand-input
        });
        // Verberg ongecheckte buttons en verwijder de .check class van alle buttons
        choiceButtons.forEach(function(button) {
            const checkbox = button.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                button.classList.add('hidden');
            }
            button.classList.remove('check');
            toggleCheckVisibility(button, checkbox.checked);
        });
    });

    // Event listener for the main edit icon
    editIcon.addEventListener('click', function() {
        saveButton.style.display = 'block'; // Toon de 'Save' knop
        toggleReadonly(false); // Verwijder readonly attributen
        mediaInputs.forEach(function(input) {
            input.style.display = 'block'; // Toon het bestand-input
        });
        // Toon alle buttons en verwijder .check
        choiceButtons.forEach(function(button) {
            button.classList.remove('hidden');
            button.classList.remove('check');
            const checkbox = button.querySelector('input[type="checkbox"]');
            toggleCheckVisibility(button, checkbox.checked);
        });
    });

    // Toggle 'checked' class on click
    choiceButtons.forEach(function(button) {
        const checkbox = button.querySelector('input[type="checkbox"]');
        button.addEventListener('click', function() {
            checkbox.checked = !checkbox.checked;
            button.classList.toggle('checked', checkbox.checked);
            toggleCheckVisibility(button, checkbox.checked);
            if (lastClickedButton && lastClickedButton !== button) {
                lastClickedButton.classList.remove('check');
            }
            lastClickedButton = button;
        });
    });
});














  
  