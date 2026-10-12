(function(){
var X=[["NYSE/Nasdaq","America/New_York",[["09:30","16:00"]]],["London LSE","Europe/London",[["08:00","16:30"]]],["Xetra","Europe/Berlin",[["09:00","17:30"]]],["Euronext Paris","Europe/Paris",[["09:00","17:30"]]],["Nasdaq Stockholm","Europe/Stockholm",[["09:00","17:30"]]],["HKEX","Asia/Hong_Kong",[["09:30","12:00"],["13:00","16:00"]]],["Tokyo TSE","Asia/Tokyo",[["09:00","11:30"],["12:30","15:30"]]]];
function parts(tz,d){var o={};new Intl.DateTimeFormat("en-GB",{timeZone:tz,weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZoneName:"short"}).formatToParts(d).forEach(function(p){o[p.type]=p.value});return o}
function m(s){var a=s.split(":");return +a[0]*60+ +a[1]}
function fmt(n){return Math.floor(n/60)+"h "+(n%60)+"m"}
var DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
function st(tz,ss,d){var p=parts(tz,d),now=m(p.hour+":"+p.minute),wd=DAYS.indexOf(p.weekday),t=p.hour+":"+p.minute+" "+p.timeZoneName;
 if(wd<5)for(var i=0;i<ss.length;i++){var a=m(ss[i][0]),b=m(ss[i][1]);
  if(now>=a&&now<b)return{t:t,c:"open",s:"Open",n:"closes in "+fmt(b-now)};
  if(now<a)return{t:t,c:i?"lunch":"pre",s:i?"Lunch":"Pre-market",n:"opens in "+fmt(a-now)}}
 var add=1;while(((wd+add)%7)>4)add++;
 return{t:t,c:"closed",s:"Closed",n:"opens in "+fmt(add*1440-now+m(ss[0][0]))}}
function draw(){var d=new Date(),el=document.getElementById("mclock");if(!el)return;
 var p=parts("Europe/Stockholm",d),h='<div class="mc me"><b>Stockholm (you)</b><span>'+p.weekday+" "+p.hour+":"+p.minute+" "+p.timeZoneName+"</span></div>";
 X.forEach(function(x){var r=st(x[1],x[2],d);h+='<div class="mc '+r.c+'"><b>'+x[0]+'</b><span>'+r.t+'</span><i>'+r.s+'</i><span>'+r.n+"</span></div>"});
 el.innerHTML=h}
draw();setInterval(draw,30000);})();
