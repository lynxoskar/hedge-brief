(function(){
var X=[["NYSE/Nasdaq","America/New_York",[["09:30","16:00"]]],["London LSE","Europe/London",[["08:00","16:30"]]],["Xetra","Europe/Berlin",[["09:00","17:30"]]],["Euronext Paris","Europe/Paris",[["09:00","17:30"]]],["Nasdaq Stockholm","Europe/Stockholm",[["09:00","17:30"]]],["HKEX","Asia/Hong_Kong",[["09:30","12:00"],["13:00","16:00"]]],["Tokyo TSE","Asia/Tokyo",[["09:00","11:30"],["12:30","15:30"]]]];
var H=window.HOLIDAYS||{},DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
function parts(tz,d){var o={};new Intl.DateTimeFormat("en-GB",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZoneName:"short"}).formatToParts(d).forEach(function(p){o[p.type]=p.value});return o}
function m(s){var a=s.split(":");return +a[0]*60+ +a[1]}
function fmt(n){var d=Math.floor(n/1440),h=Math.floor(n%1440/60);return(d?d+"d ":"")+h+"h "+(n%60)+"m"}
function addDay(ymd,k){var t=new Date(Date.UTC(+ymd.slice(0,4),+ymd.slice(5,7)-1,+ymd.slice(8,10)+k));return t.toISOString().slice(0,10)}
function sess(tz,ymd,wd,ss){var h=H[tz]||{off:[],early:{}};if(wd>4)return{s:null};if(h.off.indexOf(ymd)>=0)return{s:null,hol:1};
 var e=h.early[ymd];if(!e)return{s:ss};var c=m(e),out=[];ss.forEach(function(x){var a=m(x[0]),b=m(x[1]);if(a<c)out.push([x[0],b>c?e:x[1]])});return{s:out,early:1}}
function st(tz,ss,d){var p=parts(tz,d),ymd=p.year+"-"+p.month+"-"+p.day,now=m(p.hour+":"+p.minute),wd=DAYS.indexOf(p.weekday),t=p.hour+":"+p.minute+" "+p.timeZoneName;
 var today=sess(tz,ymd,wd,ss);
 if(today.s)for(var i=0;i<today.s.length;i++){var a=m(today.s[i][0]),b=m(today.s[i][1]);
  if(now>=a&&now<b)return{t:t,c:"open",s:today.early?"Open (early close)":"Open",n:"closes in "+fmt(b-now)};
  if(now<a)return{t:t,c:i?"lunch":"pre",s:i?"Lunch":"Pre-market",n:"opens in "+fmt(a-now)}}
 for(var k=1;k<15;k++){var y=addDay(ymd,k),n=sess(tz,y,(wd+k)%7,ss);if(n.s&&n.s.length)return{t:t,c:today.hol?"hol":"closed",s:today.hol?"Holiday":"Closed",n:"opens in "+fmt(k*1440-now+m(n.s[0][0]))}}
 return{t:t,c:"closed",s:"Closed",n:""}}
function draw(){var d=new Date(),el=document.getElementById("mclock");if(!el)return;
 var p=parts("Europe/Stockholm",d),h='<div class="mc me"><b>Stockholm (you)</b><span>'+p.weekday+" "+p.hour+":"+p.minute+" "+p.timeZoneName+"</span></div>";
 X.forEach(function(x){var r=st(x[1],x[2],d);h+='<div class="mc '+r.c+'"><b>'+x[0]+'</b><span>'+r.t+'</span><i>'+r.s+'</i><span>'+r.n+"</span></div>"});
 el.innerHTML=h}
draw();setInterval(draw,30000);})();
