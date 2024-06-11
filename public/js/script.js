// pauze for you
function videoPauze() {
    const videos = document.querySelectorAll("video");
    const contentElement = document.getElementById('user-info-container');

    videos.forEach(function(video) {
        const pauzeB = video.parentElement.querySelector("#pauzeButton");

        video.addEventListener("click", function() {
            if (video.paused) {
                video.play();
                pauzeB.style.display = 'none'; //pauze button uit

            } else {
                video.pause();
                pauzeB.style.display = 'block'; //pauze button aan
            }
        });

        //pauze on scroll
        contentElement?.addEventListener('scroll', () => {
            video.pause();
            pauzeB.style.display = 'block'; //pauze button aan
        });
    });
}
videoPauze();




// Filter knop
const filterButton = document.getElementById('filter');
const filterCloseButton = document.querySelector('#filter-pop-up button:first-child');
const filterSubmit = document.querySelector('#filter-pop-up form > button');

// open filter
filterButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "100%";
    filterSubmit.classList.remove('hidden');
});

//sluit filter
filterCloseButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "0%";
    filterSubmit.classList.add('hidden');
});



// Filter knoppen styling
const checkboxes = document.querySelectorAll('#sort fieldset:nth-of-type(2) input, #sort fieldset:nth-of-type(3) input');
const labels = document.querySelectorAll('#sort fieldset:nth-of-type(2) label, #sort fieldset:nth-of-type(3) label');

checkboxes?.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const index = Array.from(checkboxes).indexOf(checkbox); 

        if (checkbox.checked) {
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

        const filterFieldsetMember = document.querySelector('#sort fieldset:nth-of-type(3)');
        const checkboxesMembers = filterFieldsetMember.querySelectorAll('input[type="checkbox"]:checked');

        const filterFieldsetGenres = document.querySelector('#sort fieldset:nth-of-type(2)');
        const checkboxesGenres = filterFieldsetGenres.querySelectorAll('input[type="checkbox"]:checked');

        //maakt een nieuwe array van aangevinkte genres
        const selectedValuesGenres = Array.from(checkboxesGenres).map(function(checkbox) { 
            return checkbox.value;
        });
        
        //maakt een nieuwe array van aangevinkte members
        const selectedValuesMembers = Array.from(checkboxesMembers).map(function(checkbox) { 
            return checkbox.value;
        });
        
    
        const videoBackgrounds = document.querySelectorAll('#videoBackground');
        
        //Controleerd of de items voorkomen op de for you
        videoBackgrounds.forEach(function(videoBackground) {
            const genreElements = videoBackground.querySelectorAll('.genre h3');
            const memberElement = videoBackground.querySelector('section > ul > li:nth-child(2)');

            // Controleert of er geen geselecteerde genres zijn OF ten minste één van de genres in het huidige 
            //video-element overeenkomt met een geselecteerd genre.
            const hasGenreMatch = !selectedValuesGenres.length || Array.from(genreElements).some(function(genreElement) { //bron: chatgpt
                const genreName = genreElement.textContent.trim();
                return selectedValuesGenres.includes(genreName);
            });

            // Controleert of er geen geselecteerde members zijn 
            // OF dat de tekstinhoud van het lid overeenkomt met ten minste één van de geselecteerde leden.
            const hasMemberMatch = !selectedValuesMembers.length || selectedValuesMembers.includes(memberElement.textContent.trim());//bron: chatgpt
            // return checkbox.value;

            //Hide videos gebaseerd op de matches
            if (hasGenreMatch && hasMemberMatch) {
                videoBackground.classList.remove('hidden');
            } else {
                videoBackground.classList.add('hidden');
            }
        });

        //ALs er ook maar 1 filter aan staat word de filterknop lichtpaars
        if (selectedValuesGenres.length > 0 || selectedValuesMembers.length > 0) {
            filterButton.style.backgroundColor = 'var(--secondary-color)'; 
        } else {
            filterButton.style.backgroundColor = ''; 
        }


        startSorting();
    });  
});


// search 
document.querySelector('#foryouheader form')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const filter = document.getElementById('searchInput').value.toLowerCase();
    const videoBackgrounds = document.querySelectorAll('#videoBackground');

    videoBackgrounds.forEach(function(videoBackground) {
        const bandNameElement = videoBackground.querySelector('h2');
        const bandName = bandNameElement.textContent.toLowerCase();

        //Checkt of de search waarde overeenkomt in de genres en laat de posts met deze genres zien
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
    let noResultP = document.getElementById('noResultsMessage');

    //als er geen filters zijn gevonden of er geen zichtbare video-elementen zijn met het ID 'videoBackground'
    if (!filter || !document.querySelectorAll('#videoBackground:not(.hidden)').length) {
        
        //als het bericht nog niet bestaat word het aangemaakt
        if (!noResultP) {
            noResultP = document.createElement('p');
            noResultP.id = 'noResultsMessage';
            noResultP.textContent = 'Geen resultaten gevonden';
            document.body.appendChild(noResultP);
        }

    //Anders word het bericht verwijderd
    } else {
        if (noResultP) {
            noResultP.remove();
        }
    }
});



// Laat weer alle resultaten zien als je wegklikt van de searchbar en hij leeg is
const searchInput = document.getElementById('searchInput');
const videoBackgrounds = document.querySelectorAll('#videoBackground');

//als de searchbar focus verliest
searchInput?.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        videoBackgrounds.forEach(function(videoBackground) {
            videoBackground.classList.remove('hidden');
        });
    }
});


//Slaar scrollpositie op om hier later naar terug te keren na het zoeken
const scrollableElement = document.getElementById('user-info-container');
let scrollPosition = 0; 

// Controleer of searcbar leeg is en of er hidden videobackgrounds zijn
searchInput?.addEventListener('focus', function() {
    const anyHidden = Array.from(document.querySelectorAll('#videoBackground'))
    .some(videoBackground => videoBackground.classList.contains('hidden'));

    //als er geen .hidden zijn dan slaat hij je scrollpositie op
    if (!anyHidden) {
        scrollPosition = scrollableElement.scrollTop;
        console.log("Huidige scrollpositie: ", scrollPosition);
    }
});


//Terugkeren naar scrollpositie voordat je zocht
searchInput?.addEventListener('blur', function() {

    // Controleer of searcbar leeg is en of er hidden videobackgrounds zijn
    if (this.value.trim() === '') {
        const anyHidden = Array.from(document.querySelectorAll('#videoBackground'))
        .some(videoBackground => videoBackground.classList.contains('hidden'));
        
        //als er geen .hidden zijn dan keer je terug naar de positie waar je was voor het scrollen
        if (!anyHidden) {
            videoBackgrounds.forEach(function(videoBackground) {
                console.log("Scrollpositie terugkeren naar: ", scrollPosition);
    
                scrollableElement.scrollTop = scrollPosition;
            });  
        } 
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
                // Handle what happens when reaching the last partial
                alert('You have reached the last step.');
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














  
  