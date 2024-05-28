// Add members
function addMember() {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member");
    memberDiv.innerHTML = `
            <label for="memberName">Name:</label>
            <input type="text" name="memberName"><br><br>

            <label for="memberPfp">Profile Picture:</label>
            <input type="file" name="memberPfp"><br><br>

            <label for="memberGender">Gender:</label>
            <input type="text" name="memberGender" required><br><br>

            <label for="memberBirthday">Birthday:</label>
            <input type="date" name="memberBirthday" required><br><br>
        `;
    document.getElementById("members").appendChild(memberDiv);
  }


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


// Next and prev button
document.addEventListener('DOMContentLoaded', function() {
    const partials = document.querySelectorAll('.partial');
    let currentIndex = 0;

    function showPartial(index) {
        partials.forEach((partial, i) => {
            if (i === index) {
                partial.classList.remove('hidden');
            } else {
                partial.classList.add('hidden');
            }
        });
    }

    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showPartial(currentIndex);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentIndex < partials.length - 1) {
            currentIndex++;
            showPartial(currentIndex);
        }
    });

    showPartial(currentIndex); // Initialize the first partial to be visible
});