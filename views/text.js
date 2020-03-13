var moti = document.querySelector(".motivate");
var fonts = ["Focus on being productive instead of being busy", "A year from now you'll wish you had started today", "Productivity is always the result of a commitment to excellence"]; 
var ct=0;
var inst =  window.setInterval(change, 4000);
function change()
{
    moti.innerHTML = fonts[ct];
    ct++;
    if(ct >= fonts.length)
    {
        ct=0;
    }
}