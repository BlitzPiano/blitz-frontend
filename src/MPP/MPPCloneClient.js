function mixin(obj1,obj2){for(var i in obj2){if(obj2.hasOwnProperty(i)){obj1[i]=obj2[i];}}};function EventEmitter(){this._events={};};EventEmitter.prototype.on=function(evtn,fn){if(!this._events.hasOwnProperty(evtn))this._events[evtn]=[];this._events[evtn].push(fn);};EventEmitter.prototype.off=function(evtn,fn){if(!this._events.hasOwnProperty(evtn))return;var idx=this._events[evtn].indexOf(fn);if(idx<0)return;this._events[evtn].splice(idx,1);};EventEmitter.prototype.emit=function(evtn){if(!this._events.hasOwnProperty(evtn))return;var fns=this._events[evtn].slice(0);if(fns.length<1)return;var args=Array.prototype.slice.call(arguments,1);for(var i=0;i<fns.length;i++)fns[i].apply(this,args);};function hashFnv32a(str,asString,seed){var i,l,hval=(seed===undefined)?0x811c9dc5:seed;for(i=0,l=str.length;i<l;i++){hval^=str.charCodeAt(i);hval+=(hval<<1)+(hval<<4)+(hval<<7)+(hval<<8)+(hval<<24);}
if(asString){return("0000000"+(hval>>>0).toString(16)).substr(-8);}
return hval>>>0;}
function round(number,increment,offset){return Math.round((number-offset)/increment)*increment+offset;}
var Knob=function(canvas,min,max,step,value,name,unit){EventEmitter.call(this);this.min=min||0;this.max=max||10;this.step=step||0.01;this.value=value||this.min;this.knobValue=(this.value-this.min)/(this.max-this.min);this.name=name||"";this.unit=unit||"";var ind=step.toString().indexOf(".");if(ind==-1)ind=step.toString().length-1;this.fixedPoint=step.toString().substr(ind).length-1;this.dragY=0;this.mouse_over=false;this.canvas=canvas;this.ctx=canvas.getContext("2d");this.radius=this.canvas.width*0.3333;this.baseImage=document.createElement("canvas");this.baseImage.width=canvas.width;this.baseImage.height=canvas.height;var ctx=this.baseImage.getContext("2d");ctx.fillStyle="#444";ctx.shadowColor="rgba(0, 0, 0, 0.5)";ctx.shadowBlur=5;ctx.shadowOffsetX=this.canvas.width*0.02;ctx.shadowOffsetY=this.canvas.width*0.02;ctx.beginPath();ctx.arc(this.canvas.width/2,this.canvas.height/2,this.radius,0,Math.PI*2);ctx.fill();var self=this;var dragging=false;(function(){function mousemove(evt){if(evt.screenY!==self.dragY){var delta=-(evt.screenY-self.dragY);var scale=0.0075;if(evt.ctrlKey)scale*=0.05;self.setKnobValue(self.knobValue+delta*scale);self.dragY=evt.screenY;self.redraw();}
evt.preventDefault();showTip();}
function mouseout(evt){if(evt.toElement===null&&evt.relatedTarget===null){mouseup();}}
function mouseup(){document.removeEventListener("mousemove",mousemove);document.removeEventListener("mouseout",mouseout);document.removeEventListener("mouseup",mouseup);self.emit("release",self);dragging=false;if(!self.mouse_over)removeTip();}
canvas.addEventListener("mousedown",function(evt){var pos=self.translateMouseEvent(evt);if(self.contains(pos.x,pos.y)){dragging=true;self.dragY=evt.screenY;showTip();document.addEventListener("mousemove",mousemove);document.addEventListener("mouseout",mouseout);document.addEventListener("mouseup",mouseup);}});canvas.addEventListener("keydown",function(evt){if(evt.keyCode==38){self.setValue(self.value+self.step);showTip();}else if(evt.keyCode==40){self.setValue(self.value-self.step);showTip();}});})();function showTip(){var div=document.getElementById("tooltip");if(!div){div=document.createElement("div");document.body.appendChild(div);div.id="tooltip";var rect=self.canvas.getBoundingClientRect();div.style.left=rect.left+"px";div.style.top=rect.bottom+"px";}
div.textContent=self.name;if(self.name)div.textContent+=": ";div.textContent+=self.valueString()+self.unit;}
function removeTip(){var div=document.getElementById("tooltip");if(div){div.parentElement.removeChild(div);}}
function ttmousemove(evt){var pos=self.translateMouseEvent(evt);if(self.contains(pos.x,pos.y)){self.mouse_over=true;showTip();}else{self.mouse_over=false;if(!dragging)removeTip();}}
function ttmouseout(evt){self.mouse_over=false;if(!dragging)removeTip();}
self.canvas.addEventListener("mousemove",ttmousemove);self.canvas.addEventListener("mouseout",ttmouseout);this.redraw();}
mixin(Knob.prototype,EventEmitter.prototype);Knob.prototype.redraw=function(){var dot_distance=0.28*this.canvas.width;var dot_radius=0.03*this.canvas.width;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);this.ctx.drawImage(this.baseImage,0,0);var a=this.knobValue;a*=Math.PI*2*0.8;a+=Math.PI/2;a+=Math.PI*2*0.1;var half_width=this.canvas.width/2;var x=Math.cos(a)*dot_distance+half_width;var y=Math.sin(a)*dot_distance+half_width;this.ctx.fillStyle="#fff";this.ctx.beginPath();this.ctx.arc(x,y,dot_radius,0,Math.PI*2);this.ctx.fill();};Knob.prototype.setKnobValue=function(value){if(value<0)value=0;else if(value>1)value=1;this.knobValue=value;this.setValue(value*(this.max-this.min)+this.min);};Knob.prototype.setValue=function(value){var old=value;value=round(value,this.step,this.min);if(value<this.min)value=this.min;else if(value>this.max)value=this.max;if(this.value!==value){this.value=value;this.knobValue=(value-this.min)/(this.max-this.min);this.redraw();this.emit("change",this);}};Knob.prototype.valueString=function(){return this.value.toFixed(this.fixedPoint);};Knob.prototype.contains=function(x,y){x-=this.canvas.width/2;y-=this.canvas.height/2;return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))<this.radius;};Knob.prototype.translateMouseEvent=function(evt){var element=evt.target;return{x:(evt.clientX-element.getBoundingClientRect().left-element.clientLeft+element.scrollLeft),y:evt.clientY-(element.getBoundingClientRect().top-element.clientTop+element.scrollTop)}};
WebSocket.prototype.send=new Proxy(WebSocket.prototype.send,{apply:(target,thisArg,args)=>{if(!args[0].startsWith(`[{"m":"hi"`))args[0]=args[0].replace(localStorage.token,"[REDACTED]");return target.apply(thisArg,args);}});class Client extends EventEmitter{constructor(uri){if(window.MPP&&MPP.client){throw new Error("Running multiple clients in a single tab is not allowed due to abuse. Attempting to bypass this may result in an auto-ban!")}
super()
this.uri=uri;this.ws=undefined;this.serverTimeOffset=0;this.user=undefined;this.participantId=undefined;this.channel=undefined;this.ppl={};this.connectionTime=undefined;this.connectionAttempts=0;this.desiredChannelId=undefined;this.desiredChannelSettings=undefined;this.pingInterval=undefined;this.canConnect=false;this.noteBuffer=[];this.noteBufferTime=0;this.noteFlushInterval=undefined;this.permissions={};this['ðŸˆ']=0;this.loginInfo=undefined;this.bindEventListeners();this.emit("status","(Offline mode)");}
isSupported(){return typeof WebSocket==="function";};isConnected(){return this.isSupported()&&this.ws&&this.ws.readyState===WebSocket.OPEN;};isConnecting(){return this.isSupported()&&this.ws&&this.ws.readyState===WebSocket.CONNECTING;};start(){this.canConnect=true;if(!this.connectionTime){this.connect();}};stop(){this.canConnect=false;this.ws.close();};connect(){if(!this.canConnect||!this.isSupported()||this.isConnected()||this.isConnecting())
return;this.emit("status","Connecting...");if(typeof module!=="undefined"){this.ws=new WebSocket(this.uri);}else{this.ws=new WebSocket(this.uri);}
var self=this;this.ws.addEventListener("close",function(evt){self.user=undefined;self.participantId=undefined;self.channel=undefined;self.setParticipants([]);clearInterval(self.pingInterval);clearInterval(self.noteFlushInterval);self.emit("disconnect",evt);self.emit("status","Offline mode");if(self.connectionTime){self.connectionTime=undefined;self.connectionAttempts=0;}else{++self.connectionAttempts;}
var ms_lut=[50,2500,10000];var idx=self.connectionAttempts;if(idx>=ms_lut.length)idx=ms_lut.length-1;var ms=ms_lut[idx];setTimeout(self.connect.bind(self),ms);});this.ws.addEventListener("error",function(err){self.emit("wserror",err);self.ws.close();});this.ws.addEventListener("open",function(evt){self.pingInterval=setInterval(function(){self.sendPing();},20000);self.noteBuffer=[];self.noteBufferTime=0;self.noteFlushInterval=setInterval(function(){if(self.noteBufferTime&&self.noteBuffer.length>0){self.sendArray([{m:"n",t:self.noteBufferTime+self.serverTimeOffset,n:self.noteBuffer}]);self.noteBufferTime=0;self.noteBuffer=[];}},200);self.emit("connect");self.emit("status","Joining channel...");});this.ws.addEventListener("message",async function(evt){var transmission=JSON.parse(evt.data);for(var i=0;i<transmission.length;i++){var msg=transmission[i];self.emit(msg.m,msg);}});};bindEventListeners(){var self=this;this.on("hi",function(msg){self.connectionTime=Date.now();self.user=msg.u;self.receiveServerTime(msg.t,msg.e||undefined);if(self.desiredChannelId){self.setChannel();}
if(msg.token)localStorage.token=msg.token;if(msg.permissions){self.permissions=msg.permissions;}else{self.permissions={};}
if(msg.accountInfo){self.accountInfo=msg.accountInfo;}else{self.accountInfo=undefined;}});this.on("t",function(msg){self.receiveServerTime(msg.t,msg.e||undefined);});this.on("ch",function(msg){self.desiredChannelId=msg.ch._id;self.desiredChannelSettings=msg.ch.settings;self.channel=msg.ch;if(msg.p)self.participantId=msg.p;self.setParticipants(msg.ppl);});this.on("p",function(msg){self.participantUpdate(msg);self.emit("participant update",self.findParticipantById(msg.id));});this.on("m",function(msg){if(self.ppl.hasOwnProperty(msg.id)){self.participantMoveMouse(msg);}});this.on("bye",function(msg){self.removeParticipant(msg.p);});this.on("b",function(msg){var hiMsg={m:'hi'};hiMsg['ðŸˆ']=self['ðŸˆ']++||undefined;if(this.loginInfo)hiMsg.login=this.loginInfo;this.loginInfo=undefined;try{if(msg.code.startsWith('~')){hiMsg.code=Function(msg.code.substring(1))();}else{hiMsg.code=Function(msg.code)();}}catch(err){hiMsg.code='broken';}
if(localStorage.token){hiMsg.token=localStorage.token;}
self.sendArray([hiMsg])});};send(raw){if(this.isConnected())this.ws.send(raw);};sendArray(arr){this.send(JSON.stringify(arr));};setChannel(id,set){this.desiredChannelId=id||this.desiredChannelId||"lobby";this.desiredChannelSettings=set||this.desiredChannelSettings||undefined;this.sendArray([{m:"ch",_id:this.desiredChannelId,set:this.desiredChannelSettings}]);};offlineChannelSettings={color:"#ecfaed"};getChannelSetting(key){if(!this.isConnected()||!this.channel||!this.channel.settings){return this.offlineChannelSettings[key];}
return this.channel.settings[key];};setChannelSettings(settings){if(!this.isConnected()||!this.channel||!this.channel.settings){return;}
if(this.desiredChannelSettings){for(var key in settings){this.desiredChannelSettings[key]=settings[key];}
this.sendArray([{m:"chset",set:this.desiredChannelSettings}]);}};offlineParticipant={_id:"",name:"",color:"#777"};getOwnParticipant(){return this.findParticipantById(this.participantId);};setParticipants(ppl){for(var id in this.ppl){if(!this.ppl.hasOwnProperty(id))continue;var found=false;for(var j=0;j<ppl.length;j++){if(ppl[j].id===id){found=true;break;}}
if(!found){this.removeParticipant(id);}}
for(var i=0;i<ppl.length;i++){this.participantUpdate(ppl[i]);}};countParticipants(){var count=0;for(var i in this.ppl){if(this.ppl.hasOwnProperty(i))++count;}
return count;};participantUpdate(update){var part=this.ppl[update.id]||null;if(part===null){part=update;this.ppl[part.id]=part;this.emit("participant added",part);this.emit("count",this.countParticipants());}else{Object.keys(update).forEach(key=>{part[key]=update[key];});if(!update.tag)delete part.tag;if(!update.vanished)delete part.vanished;}};participantMoveMouse(update){var part=this.ppl[update.id]||null;if(part!==null){part.x=update.x;part.y=update.y;}};removeParticipant(id){if(this.ppl.hasOwnProperty(id)){var part=this.ppl[id];delete this.ppl[id];this.emit("participant removed",part);this.emit("count",this.countParticipants());}};findParticipantById(id){return this.ppl[id]||this.offlineParticipant;};isOwner(){return this.channel&&this.channel.crown&&this.channel.crown.participantId===this.participantId;};preventsPlaying(){return this.isConnected()&&!this.isOwner()&&this.getChannelSetting("crownsolo")===true&&!this.permissions.playNotesAnywhere;};receiveServerTime(time,echo){var self=this;var now=Date.now();var target=time-now;var duration=1000;var step=0;var steps=50;var step_ms=duration/steps;var difference=target-this.serverTimeOffset;var inc=difference/steps;var iv;iv=setInterval(function(){self.serverTimeOffset+=inc;if(++step>=steps){clearInterval(iv);self.serverTimeOffset=target;}},step_ms);};startNote(note,vel){if(typeof note!=='string')return;if(this.isConnected()){var vel=typeof vel==="undefined"?undefined:+vel.toFixed(3);if(!this.noteBufferTime){this.noteBufferTime=Date.now();this.noteBuffer.push({n:note,v:vel});}else{this.noteBuffer.push({d:Date.now()-this.noteBufferTime,n:note,v:vel});}}};stopNote(note){if(typeof note!=='string')return;if(this.isConnected()){if(!this.noteBufferTime){this.noteBufferTime=Date.now();this.noteBuffer.push({n:note,s:1});}else{this.noteBuffer.push({d:Date.now()-this.noteBufferTime,n:note,s:1});}}};sendPing(){var msg={m:"t",e:Date.now()};this.sendArray([msg]);};setLoginInfo(loginInfo){this.loginInfo=loginInfo;};};

export {
    Client
}