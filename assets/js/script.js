// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // Retrieve buttons, inputs and saved message
  var saveButton = document.getElementsByTagName('button');
  var input = document.getElementsByTagName('textarea');
  var saved = document.getElementById('saved');

  // Add event listeners to each button
  for (let i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener('click', function () {
      // Get the corresponding textarea and its value
      var currentTextArea = input[i];
      // Retrieve saved value
      var savedValue = localStorage.getItem('textArea' + i);
      // if saved value and textarea are empty or not equal
      if (savedValue && currentTextArea.value.trim() === '' && currentTextArea.value !== savedValue) {
        // Remove the saved value from local storage
        localStorage.removeItem('textArea' + i);
        // Check if textarea is not empty
      } else if (currentTextArea.value.trim() !== '') {
        // Save the value to local storage
        localStorage.setItem('textArea' + i, currentTextArea.value);

        // Display the saved value and add styles to it
        saved.innerHTML = '<div style="display: inline-block; font-size: 18px; font-family: \'Open Sans\', sans-serif;">Appointment Added to</div> <div style="display: inline-block; color: #ff6961; font-size: 18px; font-family: \'Open Sans\', sans-serif;">localStorage</div> <div style="display: inline-block; color: #77dd77; font-size: 18px; font-family: \'Open Sans\', sans-serif;">&#10004;</div>';
        saved.style.textAlign = 'center'
        // Set a 2 seconds timer for the displayed message
        setTimeout(function () {
          saved.innerHTML = '';  // Clear message after timeout
        }, 2000);
      }
    });
  }

  // Load any previously saved values on page load
  for (let i = 0; i < input.length; i++) {
    var savedValue = localStorage.getItem('textArea' + i);
    if (savedValue) {
      input[i].value = savedValue;
    }
  }

  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time

  function updateColor() {

    // Retrieve each hour
    const hour = {
      nineAM: document.getElementById('hour-9'),
      tenAM: document.getElementById('hour-10'),
      elevenAM: document.getElementById('hour-11'),
      noon: document.getElementById('hour-12'),
      onePM: document.getElementById('hour-1'),
      twoPM: document.getElementById('hour-2'),
      threePM: document.getElementById('hour-3'),
      fourPM: document.getElementById('hour-4'),
      fivePM: document.getElementById('hour-5')
    };

    // Set hour to a number value
    const hourValue = {
      nineAM: 9,
      tenAM: 10,
      elevenAM: 11,
      noon: 12,
      onePM: 13,
      twoPM: 14,
      threePM: 15,
      fourPM: 16,
      fivePM: 17
    }

    // Refer to day.js for the current hour
    for (const key in hour) {
      const currentHour = dayjs().hour()

      // if current hour is bigger than the hour value display grey
      if (currentHour > hourValue[key]) {
        hour[key].style.backgroundColor = '#d3d3d3'; // Past
        // if current hour is equal to the hour value display red
      } else if (currentHour === hourValue[key]) {
        hour[key].style.backgroundColor = '#ff6961'; // Current
        // else display green
      } else {
        hour[key].style.backgroundColor = '#77dd77'; // Future
      }

    }
  }

  // Call the function to update styles on page load
  updateColor();

  // Update styles every second
  setInterval(updateColor, 1000);
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  // display the current date and time
  $('#formattedDate').text(formattedDate);
});


var formattedDate = dayjs().format('MMMM DD, YYYY h:mm A');

