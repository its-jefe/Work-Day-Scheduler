// TO DO LATER .. make time blocks meters that move with the passage of time
// how graphically intensive is this???

// timeblock create
function create_timeblock_func(user_select_start, user_select_end) {

    // target container element and create time-block elements
    var container_El = $(".container");
    var time_block_El = $("<div></div>")
        .addClass("row time-block");
    var hour_El = $("<div></div>")
        .addClass("col-1 hour");
    var content_El = $("<textarea></textarea>")
        .addClass("col-10")
        .attr("id", "textarea")
    var saveBtn_El = $("<button></button>")
        .addClass("col-1 saveBtn")
        .html("<i class='fas fa-plus'></i>");

    for (var i = user_select_start; i < user_select_end; i++) {

        // create time-blocks : hour-text-save
        time_block_El
            .html(//add hour, textarea, and save button
                hour_El.html(
                    "<span>" +
                    (moment().set('hour', i).format('h a')).toUpperCase()
                    + "</span>")
                    .add(content_El)
                    .add(saveBtn_El),
                content_El
                    .text(schedule[i]),
                saveBtn_El
            );
        // clone and append them to the container
        container_El.append(
            time_block_El.clone()
                // set time-block ID to corresponding hour NOTE: can only manage 0-23
                .attr("id", (moment().set('hour', i).format('H')))
        );
    };
};

// the new-user / on-refresh function
function update_tasks_func(user_select_start, user_select_end) {
    // pull tasks from localstorage if it is there
    schedule = JSON.parse(localStorage.getItem("schedule"));
    var this_textarea;
    if (!schedule) { // if still null . initalize it
        schedule = {};
        for (var i = user_select_start; i < user_select_end; i++) {
            schedule[i] = "";
        };
    };
    // update on screen tasks 
    for (var i = user_select_start; i < user_select_end; i++) {
        this_textarea = $(String("#" + i)).find("textarea").val();
    }
};

function update_timeblock_func() {
    // getting the current hour(24H)
    var this_moment = parseInt(moment().format('H'));
    var classy = ""; // challenge pre-determined css classes

    // for x (range of hours)
    for (var i = user_select_start; i < user_select_end; i++) {
        // determine colors of textarea
        if (i < this_moment) {
            classy = "past";
        } else if (i == this_moment) {
            classy = "present";
        } else {
            classy = "future";
        };

        $(String("#" + i)).find("textarea")
            .removeClass()
            .addClass(classy)
            .addClass("col-10")
    };
};
// global time
var time = 0;
// endless interval updates every second
var update_time = setInterval(function () {
    // get current date/time 
    time = moment().format('MMMM Do YYYY, h:mm:ss a');
    // add to header
    $("#currentDay")
        .html(
            time.toString().substr(0, 13)
            + "\n\n" + time.toString().substr(15).toUpperCase()
        );
    // TO DO LATER // Make a clock widget for this .. with rotating circle? on top of SVG? // maybe canvas?

    // update the time-block colors every hour
    if (moment().format("mm:ss") == "00:00") {
        console.log("updating timeblocks");
        update_timeblock_func(user_select_start, user_select_end)
    }
}, 1000);

// TO-DO : Would like to allow minor adjustments 
// from user of start and end times
var user_select_start = 9; //9am
var user_select_end = 21 + 1; //5pm : i believe i need to add 1 to user input

// global task object / localstorage key
var schedule = {};

update_tasks_func(user_select_start, user_select_end);
create_timeblock_func(user_select_start, user_select_end);
update_timeblock_func(user_select_start, user_select_end);

// saveBtn on click
$(".saveBtn").on("click", function () {
    // previous element in timeblock "textarea"
    var this_previous = $(($(this))[0].previousElementSibling);
    // its value 
    var this_previous_val = this_previous.val().trim();
    // block id
    var this_block_id = this_previous[0].parentElement.id;

    // add only current block to the array
    schedule[this_block_id] = this_previous_val;
    // push to localstorage
    localStorage.setItem("schedule", JSON.stringify(schedule));
});