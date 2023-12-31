var options = {
  startHour: 9,
  endHour: 23,
};

function updateTimeBlocks() {
  console.log('updateTimeBlocks');
  var currentHour = dayjs().hour();

  $('.time-block').each(function (index, element) {

    var hour = $(element).attr('data-hour');
    console.log(hour, currentHour);

    if (hour < currentHour) {
      $(element).find('.description').addClass('past');
    }
    
    else if (hour == currentHour) {
      $(element).find('.description').addClass('present');
    }
    
    else {
      $(element).find('.description').addClass('future');
    }
  });
}

function onSaveTask(e) {
  var hour = $(e.target).parent().parent().attr('data-hour');
  var task = $(e.target).parent().prev().children().val();

  localStorage.setItem(hour, task);

  console.log('saved')
}

function generateTimeBlocks() {

  for (hour = options.startHour; hour <= options.endHour; hour++) {

    var savedTask = localStorage.getItem(hour) || '';
    var html = `<div class="row time-block" data-hour="${hour}">
        <div class="col-sm-16" hour">${hour}</div>
        <div class="row-sm-16 row past">
            <textarea class="col-sm-8 description">${savedTask}</textarea>
        </div>

        <div class="row-sm-16 row">
        <button class="btn-primary saveBtn">Save</button>
        </div>
        </div>
        
        
        `;
    $('.container').append(html);
  }
}

function init() {
  generateTimeBlocks();

  updateTimeBlocks();

  $('.saveBtn').on('click', onSaveTask);

  var currentDay = dayjs().format('dddd MMMM D YYYY, h:mm:ss a');
  $('#currentDay').text(currentDay);

  setInterval(function () {
    updateTimeBlocks();
  }, 1000);
}

init();



// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the 'hour-x' id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//

// TODO: Add code to apply the past, present, or future class to each time
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
