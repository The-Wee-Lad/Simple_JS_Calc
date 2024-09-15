let screen =  document.querySelector(".screen");
let author = document.querySelector("#author");
addEventListener("keydown",logKey);
addEventListener("click",logPress)



let expression = screen.value;
let open_bracket = 0;

function format(string)
{
    return string;
}

function calculate()
{
    try 
    {
        let string = screen.value, result;
        console.log("string : "+string);
        if(screen.value == '')
            result = '';
        else
        {
            string = format(string);
            result = Function("return "+string)();
        }
        screen.value=result;    
    } catch (err) {
        screen.value = "ERROR";
        screen.style.backgroundColor = "#FF0000";        
        console.log("FUCK YOU");
    }
    
}
function check(key)
{
    let signs = "+-/*x=.";
    console.log("check key : "+key);
    expression = screen.value;
    let r = false;
    if(
        (signs.includes(key) && !(signs.includes(expression[expression.length-1])))
        ||!isNaN(key)
        ||key=="Backspace"
        ||key=='Clear'
        ||key=='('
        ||key==')'
        ||key=='Enter'
    )
        r = true;
    if(key=='/' || key=='*')
    {
        r = false;
        let sign = "+-/*x=.("
        if((sign.includes(key) && !(sign.includes(expression[expression.length-1]))))
        {
            r = true;
        }
    }
    if(key=='.')
    {
        let string = "("+screen.value+")";
        let sign = '+=/*()';
        r = false;
        for(let i = string.length-2; i > -1; i--)
        {
            if(sign.includes(string[i]))
                r = true;
            if(string[i] == '.' && r == false)
                return false;
        }
    }
    if(key=='(')
    {
        r = false;
        if(screen.value[screen.value.length-1]!='.')
        {
            if(!isNaN(screen.value[screen.value.length-1]))
                screen.value+='*';
            open_bracket++; r =true;
        }
    }
    if(key==')')
    {   
        r = false;
        lastValue = screen.value[screen.value.length-1];
        if(open_bracket>0 && !signs.includes(lastValue) && lastValue!='(')
        {
            open_bracket--;
            r = true;
        }
    }
    return r;
}
function action(event)
{
    expression = screen.value;
    let key = event.key;
    console.log(key);
    let bool = check(key);
    if(!bool)
    {
        event.preventDefault();
        return;
    }
    if(key=='x')
    {
        event.preventDefault();
        screen.value+='*'
    }
    if(key=="Backspace"
        ||key=="ArrowLeft"
        ||key=="ArrowRight")
        return;
    if(key == '=' || key=='Enter')
    {
        event.preventDefault();
        calculate();
    }
}

function update(event) {
    let tar=event.target;
    let className = (tar.className);
    console.log(className);
    if(className == 'number' || className == 'sym')  
    {
        let t = tar.textContent;
        if(check(t))
        {
            if(t == "Backspace")
                screen.value=screen.value.slice(0,-1);
            else if(t == "Clear")
            {
                screen.value="";
                screen.style.backgroundColor="black";
            }
            else if(t == '=' || t == 'Enter')
            {
                calculate();
            }     
            else
            {
                screen.value+=t;
            }
        }
    } 
    else if(className == "screen")
    {
        console.log("Click --> Screen")
        screen.blur();
    }
}

function logKey(event)
{
    screen.focus();
    action(event);
}

function logPress(event)
{
    update(event);
}


