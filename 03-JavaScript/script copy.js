// 32 - 126
// for (i = 32; i <= 126; i++) {
//   console.log(i + " " + String.fromCharCode(i))
// }

// what they sound like
function gen_lowercase() {
  // CharCode 97 - 122  (26)
  var roulette = 97 + Math.floor(Math.random() * (122 - 97 + 1))
  return (String.fromCharCode(roulette))
}
function gen_uppercase() {
  // CharCode 65 - 90  (26)
  var roulette = 65 + Math.floor(Math.random() * (90 - 65 + 1))
  return (String.fromCharCode(roulette))
}
function gen_numeric() {
  // CharCode 48 - 57  (10)
  var roulette = 48 + Math.floor(Math.random() * (57 - 48 + 1))
  return (String.fromCharCode(roulette))
}
function gen_special() { // stubbornly sticking to ... String.fromCharCode
  // total: 33
  var option = Math.floor(Math.random() * (33 + 1)) // 1 - 33

  if (option >= 1 && option <= 16) {
    // CharCode 32 - 47 (16)      space!"#$%&'()*+,-./
    return (String.fromCharCode(32 + Math.floor(Math.random() * 16)));
  }
  else if (option >= 17 && option <= 23) {
    // CharCode 58 - 64 (7)       :;<=>?@
    return (String.fromCharCode(58 + Math.floor(Math.random() * 7)));
  }
  else if (option >= 24 && option <= 29) {
    // CharCode 91 - 96 (6)     [\]^_`
    return (String.fromCharCode(91 + Math.floor(Math.random() * 6)));
  } else { //(option >= 30 && option <= 33)
    // CharCode 123 - 126 (4)   {|}~ 
    return (String.fromCharCode(123 + Math.floor(Math.random() * 4)));
  }
}

// checks the status of the checkbox
// will not allow all boxes to be unchecked
function check_checkbox() {
  // at least one checkbox must be checked
  if (count > 1) {
    if (this.checked) {//if checkbox is checked
      this.value = this.checked; //aka true
      count += 1;
      console.log(this + " id.value: " + this.value + " checked: " + this.checked)
      console.log(" ")
    } else {
      this.value = this.checked; //aka false
      count -= 1;
      console.log(this + " id.value: " + this.value + " checked: " + this.checked)
      console.log(" ")
    }
  } else {
    this.checked = true
    alert("What's the point?")
  }
}

function generatePassword() { //can i use this === true by passing individually?
  var ret = "";
  for (var i = 0; i < length.value; i++) {
    num = Math.floor(Math.random() * 4 + 1) //generate 1,2,3,4

    switch (num) {
      case 1: if (lowercase.value == true) { ret += gen_lowercase() };
        break;
      case 2: if (uppercase.value == true) { ret += gen_uppercase() };
        break;
      case 3: if (numeric.value == true) { ret += gen_numeric() };
        break;
      case 4: if (special.value == true) { ret += gen_special() };
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
// adjust values
length.addEventListener("change", function() {
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
    length.value = parseInt(this.value);
  }
  console.log(length.value)
})

// TURN THESE INTO AN ARRAY OF OBJECTS 
// CLONE THEM IN THE FUNCTION 
// REMOVE THE ONES THAT DONT MAKE THE CUT 
criteria = [
  //just remove this to go back to where you were
]

// set vars for checkboxes + set defaults + adjust with eventListeners (All BOOLEANs)
var lowercase = document.getElementById("lowercase");
lowercase.value = true;
lowercase.alias = 1;
lowercase.addEventListener("change", check_checkbox);

var uppercase = document.getElementById("uppercase");
uppercase.value = true;
uppercase.alias = 2;
uppercase.addEventListener("change", check_checkbox);

var numeric = document.getElementById("numeric");
numeric.value = true;
numeric.alias = 3;
numeric.addEventListener("change", check_checkbox);

var special = document.getElementById("special");
special.value = true;
special.alias = 4;
special.addEventListener("change", check_checkbox);
