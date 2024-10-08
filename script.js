let screen = document.querySelector(".screen");
let author = document.querySelector("#author");
addEventListener("keydown", logKey);
addEventListener("click", logPress);


let AnsState = 0;
let expression = screen.value;
let open_bracket = 0;
function red() {
  screen.style.color = "#cc3300";
  (function now() {
    screen.classList.add("shake");
    setTimeout(function () {
      screen.classList.remove("shake");
    }, 30);
  })();
}
function white() {
  screen.style.color = "white";
}
function format(string) {
  while (open_bracket > 0) {
    string += ")";
    open_bracket--;
  }
  return string;
}
function reset() {
  screen.value = "";
  screen.style.backgroundColor = "black";
  return;
}
function calculate() {
  AnsState = 1;
  try {
    let string = screen.value,
      result;
    console.log("Calc string : " + string);
    if (string == "") result = "";
    else {
      string = format(string);
      string = "return " + string;
      result = Function(string)();
      console.log("Before : " + result);
      let arr = ("" + result).split(".");

      let mantissa = arr[0].length;
      let exponent = arr[1]?.length === undefined ? 0 : arr[1].length;
      console.log(mantissa + " " + exponent);
      result = result.toPrecision(mantissa + (exponent > 5 ? 5 : exponent));
      result = result * 1;
      if (isNaN(result)) result = "Undefined";
    }
    console.log("After : " + result);
    screen.value = result;
  } catch (err) {
    screen.value = "ERROR";
    screen.style.backgroundColor = "#FF0000";
    console.log(err);
  }
}

function check(key) {
  let signs = "+-/*x=.";
  console.log("Key : " + key);
  expression = screen.value;
  let r = false;
  if (
    (signs.includes(key) &&
      !signs.includes(expression[expression.length - 1])) ||
    !isNaN(key) ||
    key == "Backspace" ||
    key == "Clear" ||
    key == "(" ||
    key == ")" ||
    key == "Enter" ||
    key == "Control" ||
    key == "Shift" ||
    key == "I"
  )
    r = true;

  if (key == "/" || key == "*") {
    r = false;
    let sign = "+-/*x=.(";
    if (
      sign.includes(key) &&
      !sign.includes(expression[expression.length - 1]) &&
      expression.length != 0
    ) {
      r = true;
    }
  }
  if (key == ".") {
    let string = "(" + screen.value + ")";
    let sign = "+=/*()";
    r = false;
    for (let i = string.length - 2; i > -1; i--) {
      if (sign.includes(string[i])) r = true;
      if (string[i] == "." && r == false) return false;
    }
  }

  if (key == "(") {
    r = false;
    let lastValue = screen.value[screen.value.length - 1];
    if (lastValue != ".") {
      if (!isNaN(lastValue) || lastValue == ")") screen.value += "*";
      open_bracket++;
      r = true;
    }
  }

  if (key == ")") {
    r = false;
    lastValue = screen.value[screen.value.length - 1];
    if (open_bracket > 0 && !signs.includes(lastValue) && lastValue != "(") {
      open_bracket--;
      r = true;
    }
  }

  if (!isNaN(key) && screen.value[screen.value.length - 1] == ")")
    screen.value += "*";

  if (key == "=" || key == "Enter") {
    r = false;
    signs += "(";
    if (!signs.includes(screen.value[screen.value.length - 1])) r = true;
  }

  if (key == " ") r = false;
  return r;
}

function action(event) {
  let key = event.key;
  let bool = check(key);
  if (!bool) {
    red();
    event.preventDefault();
    return;
  }
  if (key == "x") {
    event.preventDefault();
    screen.value += "*";
  }
  if (key == "Backspace") {
    if(screen.value[screen.value.length-1] == '(')
      open_bracket--;
    if (isFinite(screen.value))
      reset();
    return;
  }
  if (key == "=" || key == "Enter") {
    event.preventDefault();
    calculate();
  }
}

function update(event) {
  let tar = event.target;
  let className = tar.className;
  console.log("Click --> " + className);
  if (className == "number" || className == "sym") {
    let t = tar.textContent;
    if (check(t)) {
      if (t == "Backspace") {
        if (isFinite(screen.value))
          reset();
        if(screen.value[screen.value.length-1] == '(')
          open_bracket--;
        screen.value = screen.value.slice(0, -1);
        return;
      }
      if (t == "Clear") {
        reset();
        return;
      }
      if (t == "=") {
        calculate();
        return;
      }
      screen.value += t;
    } else red();
  } else className == "screen";
  screen.blur();
}

function logKey(event) {
  screen.focus();
  if (screen.value == "Undefined") reset();
  white();
  if(AnsState == 1 && (!isNaN(event.key)||event.key=='.'))
  {
    reset();
    AnsState = 0;
  }
  action(event);
  console.log("Debug : " + screen.value);
}

function logPress(event) {
  if(AnsState == 1 && (!isNaN(event.target.textContent)||event.target.textContent=='.'))
  {
    reset();
    AnsState = 0;
  }
  if (screen.value == "Undefined") reset();
  white();
  update(event);
}


