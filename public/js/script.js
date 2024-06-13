//18+ check
const ageChecks = document.querySelectorAll('#members input[type="checkbox"]');
const ageCheckLabels = document.querySelectorAll('#members > label');

//Gaat over de checkboxes en voer de functie uit wanneer er een gecheckt is
ageChecks.forEach(function(ageCheck) {
    ageCheck.addEventListener('click', function ageCheckFunction(event) {
        const index = Array.from(ageChecks).indexOf(event.target);
        const label = ageCheckLabels[index];

        //geeft de border een donkere selectie kleur
        if (event.target.checked) {
            label.style.border = 'solid 0.325em var(--primary-color)';

            //Maakt een check img aan onder in de label, en deze style ik dan in css
            if (!label.querySelector('img')) {
                var img = document.createElement('img');
                img.setAttribute('src', '../img/buttoncheck.svg');
                img.setAttribute('alt', 'Checked');
                label.appendChild(img);
            }
            //haalt de donkere selectie kleur van de border af
        } else {
            label.style.border = '';
            //verwijderd de img
            var imgToRemove = label.querySelector('img');
            if (imgToRemove) {
                imgToRemove.remove();
            }
        }
    });
});



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
    const videos = document.querySelectorAll("video");
    const contentElement = document.getElementById('user-info-container');

    videos.forEach(function(video) {
        const pauzeB = video.parentElement.querySelector("#pauzeButton");

        video.addEventListener("click", function() {
            if (video.paused) {
                video.play(); //video speelt af
                pauzeB.style.display = 'none'; //pauze button uit

            } else {
                video.pause();
                pauzeB.style.display = 'block'; //pauze button aan
            }
        });

        //pauze wanneer er gescrolled word
        contentElement?.addEventListener('scroll', () => {
            video.pause(); //video gaat op pauze
            pauzeB.style.display = 'block'; //pauze button aan
        });
    });
}
videoPauze();


// Filter tab openen
const filterButton = document.getElementById('filter');
const filterCloseButton = document.querySelector('#filter-pop-up button:first-child');
const filterSubmit = document.querySelector('#filter-pop-up form > button');

// open filter tab
filterButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "100%";
    filterSubmit.classList.remove('hidden'); //laat de resulataten button zien
});

//sluit filter tab
filterCloseButton?.addEventListener('click', function(){
    document.getElementById('filter-pop-up').style.height = "0%";
    filterSubmit.classList.add('hidden'); //Haalt de resultaten button weg
});



// Filter knoppen styling (genres en members)
const checkboxes = document.querySelectorAll('#sort fieldset:nth-of-type(2) input, #sort fieldset:nth-of-type(3) input');
const labels = document.querySelectorAll('#sort fieldset:nth-of-type(2) label, #sort fieldset:nth-of-type(3) label');

//Gaat over elke checkbox heen  
checkboxes?.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const index = Array.from(checkboxes).indexOf(checkbox);
        const label = labels[index]; 

        if (checkbox.checked) {
            labels[index].style.border = 'solid 0.125em var(--primary-color)'; 
            if (!label.querySelector('img')) {
                var img = document.createElement('img');
                img.setAttribute('src', '../img/buttoncheck.svg');
                img.setAttribute('alt', 'Checked');
                label.appendChild(img);
            }
        } else {
            labels[index].style.border = '';
            var imgToRemove = label.querySelector('img');
            if (imgToRemove) {
                imgToRemove.remove();
            }
        }
    });
});



// Sorting knoppen styling
const radioButtons = document.querySelectorAll('#sort fieldset:nth-of-type(1) input[type="radio"]');
const labelsRadio = document.querySelectorAll('#sort fieldset:nth-of-type(1) label');

radioButtons?.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        labelsRadio.forEach(label => {
            label.style.border = '';
            var imgToRemove = label.querySelector('img');
            if (imgToRemove) {
                imgToRemove.remove();
                
            }
        });

        const index = Array.from(radioButtons).indexOf(radioButton);
        const label = labelsRadio[index]; 

        if (radioButton.checked) {
            label.style.border = 'solid 0.125em var(--primary-color)';
            if (!label.querySelector('img')) {
                var img = document.createElement('img');
                img.setAttribute('src', '../img/buttoncheck.svg');
                img.setAttribute('alt', 'Checked');
                label.appendChild(img);
                const elementToRemove = document.querySelector('.stockCheck');
                elementToRemove.classList.remove('stockCheck');

            }
        }
    });
});


// filter checkboxes
document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.getElementById('filter');

    //laat de filter tab omhoog komen
    document.querySelector('#filter-pop-up form')?.addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('filter-pop-up').style.height = "0%";
        filterSubmit.classList.add('hidden');

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
            //bron: chatgpt
            const hasGenreMatch = !selectedValuesGenres.length || Array.from(genreElements).some(function(genreElement) { 
                const genreName = genreElement.textContent.trim();
                return selectedValuesGenres.includes(genreName);
            });

            // Controleert of er geen geselecteerde members zijn 
            // OF dat de tekstinhoud van het lid overeenkomt met ten minste één van de geselecteerde leden.
            //bron: chatgpt
            const hasMemberMatch = !selectedValuesMembers.length || selectedValuesMembers.includes(memberElement.textContent.trim());
            

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


        // No results bericht
        let noResultP = document.getElementById('noResultsMessage');

        //als er geen filters zijn gevonden of er geen zichtbare video-elementen zijn met het ID 'videoBackground'
        if (!document.querySelectorAll('#videoBackground:not(.hidden)').length) {
            
            //als het bericht nog niet bestaat word het aangemaakt
            if (!noResultP) {
                noResultP = document.createElement('p');
                noResultP.id = 'noResultsMessage';
                noResultP.textContent = 'No results found';
                document.body.appendChild(noResultP);
            }}

        //start de sorteerfunctie
        sorting();

            
        //wanneer je sorteert of filtert, begin je boven aan de pagina
        function scrollToTop() {
            const scrollUp = document.getElementById('user-info-container');
            if (scrollUp) {
                scrollUp.scrollTop = 0;
            }
        }
        scrollToTop();  
    });  
});



//sorteren
function sorting(sortOption) {

    // Selecteer de video achtergronden
    const videoBackgrounds = document.querySelectorAll('#videoBackground');
    
    const sortFieldset = document.querySelector('#sort fieldset:nth-of-type(1)');
    const sortFieldsetRadios = sortFieldset.querySelectorAll('input[type="radio"]:checked');

    const selectedSort = Array.from(sortFieldsetRadios).map(function(radio) { 
        return radio.value; 
    });
    
    // Array voor de resultaten
    const resultsArray = [];
    const resultsArrayId = [];

    // Loop door de video achtergronden en voeg de tekstinhoud van #memberSort toe aan resultsArray
    videoBackgrounds.forEach(videoBackground => {
        const memberElement = videoBackground.querySelector('section > ul > li:nth-child(2)');
        resultsArray.push({
            member: parseInt(memberElement.textContent),
            videoBackground: videoBackground
        });
    });

    const parseDateString = (dateStr) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateParts = dateStr.split(" ");
    
        // Maak een datumstring in de indeling: "Wed Jun 05 2024 13:34:25"
        const formattedDateStr = `${dateParts[0]} ${months.indexOf(dateParts[1]) + 1} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]}`;
        return new Date(formattedDateStr);
    };
    
    // Data naar datum
    videoBackgrounds.forEach(videoBackground => {
        const userId = videoBackground.querySelector('#videoBackground #accCreated');
        resultsArrayId.push({
            id: parseDateString(userId.textContent),
            videoBackground: videoBackground
        });
    });

    if (selectedSort == 'members_low_to_high') {
        resultsArray.sort((a, b) => a.member - b.member);
        console.log("Members low to high");
    } else if (selectedSort == 'members_high_to_low') {
        resultsArray.sort((a, b) => b.member - a.member);
        console.log("Members high to low");
    } else if (selectedSort == 'old posts') {
        resultsArrayId.sort((a, b) => a.id.getTime() - b.id.getTime());
        console.log("Old posts");
    } else if (selectedSort == 'new posts') {
        resultsArrayId.sort((a, b) => b.id.getTime() - a.id.getTime());
        console.log("New posts");
    } else {
        console.log("Werkt niet");
    }
    

    // Selecteer de container waar de video achtergronden zich bevinden
    const videoContainer = document.getElementById('user-info-container');

    // Verwijderd de huidige inhoud van de container
    while (videoContainer.firstChild) {
        videoContainer.removeChild(videoContainer.firstChild);
    }

    if (selectedSort == 'members_low_to_high' || selectedSort == 'members_high_to_low') {
        resultsArray.forEach(result => {
            videoContainer.appendChild(result.videoBackground);
        });
    } else { 
        resultsArrayId.forEach(result => {
            videoContainer.appendChild(result.videoBackground);
        });
    }
}

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
            videoBackground.classList.remove('hiddenSearch');
            if (filter !== "") { 
                videoBackground.scrollIntoView({ behavior: 'auto' });
            }
        } else {
            videoBackground.classList.add('hiddenSearch');
        }
    });



// No results
let noResultP = document.getElementById('noResultsMessage');

// Als er geen filters zijn gevonden of er geen zichtbare video-elementen zijn met het ID 'videoBackground'
if (!filter || !document.querySelectorAll('#videoBackground:not(.hiddenSearch)').length) {
    
    // Als het bericht nog niet bestaat, wordt het aangemaakt
    if (!noResultP) {
        noResultP = document.createElement('p');
        noResultP.id = 'noResultsMessage';
        noResultP.textContent = 'No results found';
        document.body.appendChild(noResultP);
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
            videoBackground.classList.remove('hiddenSearch');
        });
    }
});


//Slaar scrollpositie op om hier later naar terug te keren na het zoeken
const scrollableElement = document.getElementById('user-info-container');
let scrollPosition = 0; 

// Controleer of searcbar leeg is en of er hidden videobackgrounds zijn
searchInput?.addEventListener('focus', function() {
    const anyHidden = Array.from(document.querySelectorAll('#videoBackground'))
    .some(videoBackground => videoBackground.classList.contains('hiddenSearch'));

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
        .some(videoBackground => videoBackground.classList.contains('hiddenSearch'));
        
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
    saveButton?.addEventListener('click', function() {
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
    editIcon?.addEventListener('click', function() {
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
