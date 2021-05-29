// TO DO LATER .. make time blocks meters that move with the passage of time
// how graphically intensive is this???

// timeblock create & update - not super efficient but it works
function update_timeblock_func(user_select_start, user_select_end) {

    // target container element and create time-block elements
    var container_El = $(".container");
    var time_block_El = $("<div></div>")
        .addClass("row time-block")
    var hour_El = $("<div></div>")
        .addClass("col-1 hour")
    var content_El = $("<textarea></textarea>")
        .attr("id", "textarea")
        .addClass("col-10")
    var saveBtn_El = $("<button></button>")
        .addClass("col-1 saveBtn")
        .html("<i class='fas fa-plus'></i>")

    // getting the hour(24H) the function is called
    var this_moment = parseInt(moment().format('H')) //safety first

    var classy = ""; // challenge pre-determined css classes

    for (var i = user_select_start; i < user_select_end; i++) {
        // determines colors of textarae
        if (i < this_moment) {
            classy = "past";

        } else if (i == this_moment) {
            classy = "present";

        } else {
            classy = "future";
        }
        // create time-blocks : hour-text-save
        // then clone and append them to the container
        // for x (range of hours selected)
        time_block_El
            .html(//add hour, textarea, and save button
                hour_El.html(
                    "<span>" +
                    (moment().set('hour', i).format('h a')).toUpperCase()
                    + "</span>")
                    .add(content_El)
                    .add(saveBtn_El),
                content_El
                    .addClass(classy)
                    .text(tasks[i]),
                saveBtn_El
            )
        container_El.append(
            time_block_El.clone()
                //set time-block ID to corresponding hour
                .attr("id", (moment().set('hour', i).format('H')))
        )
    }
}

function update_tasks_func(user_select_start, user_select_end) {
    // pull tasks from localstorage if it is there
    tasks = JSON.parse(localStorage.getItem("tasks"));

    var this_textarea;

    if (!tasks) { // if still null . initalize it
        tasks = {}
        for (var i = user_select_start; i < user_select_end; i++) {
            tasks[i] = ""
        }
    }

    // update on screen tasks 
    for (var i = user_select_start; i < user_select_end; i++) {
        this_textarea = $(String("#" + i)).find("textarea").val()
        console.log(this_textarea)
    }

    // INTRIGUED AND UNCERTAIN BY THIS CODE FROM TASKMASTER
    // - loop over object properties
    // $.each(tasks, function (list, arr) {
        // - then loop over sub-array
        // arr.forEach(function (task) {
            // createTask(task.text, task.date, list);
        // });
    // });
}

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
        )
    // TO DO LATER // Make a clock widget for this .. with rotating circle? on top of SVG? // maybe canvas?

    // update the time-block colors every hour
    // does not have adverse effects when called
    // but I am keeping an eye on it
    if (moment().format("mm:ss") == "00:00"){
        console.log("updating timeblocks")
        update_timeblock_func();
    }
}, 1000);

// TO-DO : user should be able to choose 
// when to start and end their day
var user_select_start = 9; //9am
var user_select_end = 17 + 1; //5pm : i believe i need to add 1 to user input

// global task object / localstorage key
var tasks = {};

update_tasks_func(user_select_start, user_select_end)
update_timeblock_func(user_select_start, user_select_end)

// saveBtn on click
$(".saveBtn").on("click", function () {

    // previous element in timeblock "textarea"
    var this_previous = $(($(this))[0].previousElementSibling);

    var this_previous_val = this_previous.val().trim();

    var this_block_id = this_previous[0].parentElement.id;

    // if (content) {add to task object & push to localstorage}
    if (this_previous_val) {
        console.log("Text: " + this_previous_val); // textarea value
        console.log("Block ID: " + this_block_id);
    }
    tasks[this_block_id] = this_previous_val;

    localStorage.setItem("tasks", JSON.stringify(tasks));
});