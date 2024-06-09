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

// Registration Location
console.log('Script loaded');

const form = document.querySelector('form[action="/register"][method="POST"][enctype="multipart/form-data"]');

if (form) {
    console.log('Form found');

    const isoLanguages = ["en", "es", "fr", "de", "zh", "ar", "hi", "ru", "pt", "bn", "ja", "jv", "ko", "vi", "tr", "fa", "ur", "it", "ms", "th", "id", "pl", "uk", "ro", "nl", "el", "he", "sv", "da", "no", "fi", "hu", "cs", "sk", "bg", "hr", "lt", "lv", "et", "sl", "sr", "mk", "mt", "ga", "cy", "sq", "hy", "ka", "be", "ky", "tk", "kk", "mn", "uz", "az", "tt", "ta", "te", "ml", "kn", "gu", "mr", "sa", "pa", "or", "as", "am", "ne", "si", "my", "km", "lo", "mn", "bo", "dz", "bh", "gn", "ay", "qu", "ts", "tn", "st", "ve", "zu", "xh", "af", "sw", "so", "rw", "ny", "ln", "kg", "ha", "yo", "ig", "ff", "bm", "sn", "om", "aa", "ti", "sg", "nd", "nr", "ss", "tn", "ts", "ve", "xh", "zu"];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submission prevented');
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postalCode').value;
        const language = document.getElementById('language').value;

        validateLocation(country, state, city, postalCode)
            .then(isValid => {
                if (isValid) {
                    if (language && !isoLanguages.includes(language)) {
                        alert('Invalid language code');
                    } else {
                        alert('All inputs are valid!');
                        // Here you can proceed with form submission or further processing
                    }
                } else {
                    alert('Invalid location details');
                }
            })
            .catch(error => {
                console.error('Error during validation:', error);
                alert('An error occurred during validation. Please try again.');
            });
    });
} else {
    console.log('Form not found');
}

async function validateLocation(country, state, city, postalCode) {
    try {
        console.log('Validating location:', country, state, city, postalCode);

        const countryCode = await fetch(`http://api.geonames.org/searchJSON?q=${country}&maxRows=1&username=demo`)
            .then(response => response.json())
            .then(data => {
                console.log('Country data:', data);
                return data.geonames[0]?.countryCode || null;
            });

        console.log('Country code:', countryCode);
        if (!countryCode) return false;

        const stateCode = await fetch(`http://api.geonames.org/searchJSON?q=${state}&country=${countryCode}&maxRows=1&username=demo`)
            .then(response => response.json())
            .then(data => {
                console.log('State data:', data);
                return data.geonames[0]?.adminCode1 || null;
            });

        console.log('State code:', stateCode);
        if (!stateCode) return false;

        const cityExists = await fetch(`http://api.geonames.org/searchJSON?q=${city}&adminCode1=${stateCode}&country=${countryCode}&maxRows=1&username=demo`)
            .then(response => response.json())
            .then(data => {
                console.log('City data:', data);
                return data.geonames.length > 0;
            });

        console.log('City exists:', cityExists);
        if (!cityExists) return false;

        const postalCodeExists = await fetch(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${postalCode}&country=${countryCode}&maxRows=1&username=demo`)
            .then(response => response.json())
            .then(data => {
                console.log('Postal code data:', data);
                return data.postalCodes.length > 0;
            });

        console.log('Postal code exists:', postalCodeExists);
        return postalCodeExists;

    } catch (error) {
        console.error('Error fetching location data:', error);
        return false;
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

        contentElement?.addEventListener('scroll', () => {
            video.pause();
        });
    });
}
videoPauze();


// Filter openen
const filterButton = document.getElementById('filter');
const filterCloseButton = document.querySelector('#filter-pop-up button:first-child');
const filterSubmit = document.querySelector('#filter-pop-up form > button');

filterButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "100%";
    filterSubmit.classList.remove('hidden');
    // document.getElementById('filter').style.backgroundColor = "var(--primary-color)";
});

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

        let selectedValuesGenres = Array.from(checkboxesGenres).map(cb => cb.value);
        console.log('Selected genre Values:', selectedValuesGenres);

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
            } else {
                // Redirect to completeRegistration.ejs
                window.location.href = '/completeRegistration';
            }
        }
    });

    showPartial(currentIndex); // Initialize the first partial to be visible

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

    // Progressbar
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


  document.addEventListener('DOMContentLoaded', function() {
    const editIcon = document.querySelector('#editIcon');
    const saveButton = document.querySelector('#saveButton');
    const inputs = document.querySelectorAll('input[type="text"], textarea'); // Selecteer alle input- en textarea-elementen
    const mediaInputs = document.querySelectorAll('.mediaInput');
    const choiceButtons = document.querySelectorAll('.style-choice-button');

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
        // Verberg ongecheckte buttons
        choiceButtons.forEach(function(button) {
            const checkbox = button.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                button.classList.add('hidden');
            }
        });
    });

    // Event listener for the main edit icon
    editIcon.addEventListener('click', function() {
        saveButton.style.display = 'block'; // Toon de 'Save' knop
        toggleReadonly(false); // Verwijder readonly attributen
        mediaInputs.forEach(function(input) {
            input.style.display = 'block'; // Toon het bestand-input
        });
        // Toon alle buttons
        choiceButtons.forEach(function(button) {
            button.classList.remove('hidden');
        });
    });

    // Initial hiding of unchecked buttons
    choiceButtons.forEach(function(button) {
        const checkbox = button.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            button.classList.add('hidden');
        }
    });

    // Toggle 'checked' class on click
    choiceButtons.forEach(function(button) {
        const checkbox = button.querySelector('input[type="checkbox"]');
        button.addEventListener('click', function() {
            checkbox.checked = !checkbox.checked;
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














  
  