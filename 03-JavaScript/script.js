const numb = 4; //the number of criteria

// what they sound like
function gen_lowercase() {
  console.log("into gen_lowercase")
  // CharCode 97 - 122  (26)
  var roulette = 97 + Math.floor(Math.random() * (122 - 97 + 1))
  return (String.fromCharCode(roulette))
}
function gen_uppercase() {
  console.log("into gen_uppercase")
  // CharCode 65 - 90  (26)
  var roulette = 65 + Math.floor(Math.random() * (90 - 65 + 1))
  return (String.fromCharCode(roulette))
}
function gen_numeric() {
  console.log("into gen_numeric")
  // CharCode 48 - 57  (10)
  var roulette = 48 + Math.floor(Math.random() * (57 - 48 + 1))
  return (String.fromCharCode(roulette))
}
function gen_special() {
  // total: 33
  console.log("into gen_special")
  var option = Math.floor(Math.random() * (33 + 1)) // 1 - 33

  if (option >= 1 && option <= 16) {
    // CharCode 32 - 47 (16 total)   space!"#$%&'()*+,-./
    return (String.fromCharCode(32 + Math.floor(Math.random() * 16)));
  }
  else if (option >= 17 && option <= 23) {
    // CharCode 58 - 64 (7 total)    :;<=>?@
    return (String.fromCharCode(58 + Math.floor(Math.random() * 7)));
  }
  else if (option >= 24 && option <= 29) {
    // CharCode 91 - 96 (6 total)    [\]^_`
    return (String.fromCharCode(91 + Math.floor(Math.random() * 6)));
  } else { // (option >= 30 && option <= 33)
    // CharCode 123 - 126 (4 total)  {|}~ 
    return (String.fromCharCode(123 + Math.floor(Math.random() * 4)));
  }
}

// checks the status of the checkboxes
// will not allow all boxes to be unchecked
function check_checkbox() {
  if (this.checked) {// if checked
    checked += 1;
    console.log(this.id + " is checked (is " + this.checked + ")");
  } else {// else is unchecked
    if (checked != 1) {
      checked -= 1;
      console.log(this.id + " is unchecked (is " + this.checked + ")");
    } else {
      this.checked = true
      alert("What's the point?")
    }
  }
  console.log("checked: " + checked)
}

function generatePassword() {

  var ret = ""; // return string 
  var option; // switch statement option

  var gen_criteria = [] // reset array of checked criteria ()
  for (var i = 0; i < criteria.length; i++) {// determine checked criteria .. store in gen_criteria array
    if (criteria[i].checked == true) {
      gen_criteria.push(criteria[i])
    }
  }

  for (var i = 0; i < length.value; i++) { //for specified length
    option = Math.floor(Math.random() * gen_criteria.length) //0-3 depending on gen_criteria.length

    //set option to the index of random selection of criteria.checked
    option = gen_criteria[option].id

    switch (option) {
      case "lowercase": ret += gen_lowercase();
        break;
      case "uppercase": ret += gen_uppercase();
        break;
      case "numeric": ret += gen_numeric();
        break;
      case "special": ret += gen_special();
        break;
    }
  }
  return ret;
}

////////////////////////////////////////////////////////////// Assignment Code /////////////////////////////////////////////////////////////

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
// Add generate button
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//////////////////////////////////////////////////////////// End Assignment Code ///////////////////////////////////////////////////////////

// set length to length input (INT Values)
var length = document.getElementById("length");
length.value = 12;
length.min = "8";
length.max = "128";
// adjust value
length.addEventListener("change", function () {
  //stays within constraints on manual entry by...
  if (this.value < 8) {
    //setting value to minimum if under
    this.value = 8;
    length.value = 8;
  } else if (this.value > 128) {
    //setting value to maximum if over
    this.value = 128;
    length.value = 128;
  } else {
    length.value = this.value;
  }
  console.log(length.value)
})

// create available criteria
lowercase = document.getElementById("lowercase")
uppercase = document.getElementById("uppercase")
numeric = document.getElementById("numeric")
special = document.getElementById("special")

// initialize global array to hold all possible criteria
criteria = [
  lowercase, uppercase, numeric, special
]
// set defaults
for (i = 0; i < numb; i++) {
  criteria[i].checked = "true";
}

checked = 4

lowercase.addEventListener("change", check_checkbox);
uppercase.addEventListener("change", check_checkbox);
numeric.addEventListener("change", check_checkbox);
special.addEventListener("change", check_checkbox);