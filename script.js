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
function reset()
{
    screen.value="";
    screen.style.backgroundColor="black";
    return;
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
        ||key =='Control'||key=='Shift'||key=='I'
    )
        r = true;
    if(key=='/' || key=='*')
    {
        r = false;
        let sign = "+-/*x=.("
        if((sign.includes(key) && !(sign.includes(expression[expression.length-1]))) && expression.length!=0)
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
    if(!isNaN(key) && screen.value[screen.value.length-1] == ')')
    {
        console.log("The cunt doesn't work");
        screen.value+='*'
    }
    return r;
}
function action(event)
{
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
    if(key=="Backspace")
    {
        if(screen.value == 'ERROR')
            reset();
        return;
    }
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
            {
                if(screen.value=='ERROR')
                    reset();
                screen.value=screen.value.slice(0,-1);
                return;
            }
            if(t == "Clear")
            {
                reset();
                return;
            }
            if(t == '=' || t == 'Enter')
            {
                calculate();
                return;
            }     
            screen.value+=t;
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
    console.log("oooo : "+screen.value);

}

function logPress(event)
{
    update(event);
}


