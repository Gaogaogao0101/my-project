var oImg = document.getElementById('pic').getElementsByTagName('img');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
oImg[0].style.display = 'block';
var a=0 ;
oRight.onclick = function(){
    oImg[a].style.display = 'none';
    a++;
    if(a>=oImg.length)
    a=0;	
    oImg[a].style.display = 'block';
}
oLeft.onclick = function(){
    oImg[a].style.display = 'none'; 
    a--;
    if(a<0){
        a = oImg.length-1;
    }
    oImg[a].style.display = 'block';
}