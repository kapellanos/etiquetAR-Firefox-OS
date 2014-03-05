/*
  Ported to JavaScript by Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function QRCodeDataBlockReader(e,t,n){this.blockPointer=0;this.bitPointer=7;this.dataLength=0;this.blocks=e;this.numErrorCorrectionCode=n;if(t<=9)this.dataLengthMode=0;else if(t>=10&&t<=26)this.dataLengthMode=1;else if(t>=27&&t<=40)this.dataLengthMode=2;this.getNextBits=function(e){var t=0;if(e<this.bitPointer+1){var n=0;for(var r=0;r<e;r++){n+=1<<r}n<<=this.bitPointer-e+1;t=(this.blocks[this.blockPointer]&n)>>this.bitPointer-e+1;this.bitPointer-=e;return t}else if(e<this.bitPointer+1+8){var i=0;for(var r=0;r<this.bitPointer+1;r++){i+=1<<r}t=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1);this.blockPointer++;t+=this.blocks[this.blockPointer]>>8-(e-(this.bitPointer+1));this.bitPointer=this.bitPointer-e%8;if(this.bitPointer<0){this.bitPointer=8+this.bitPointer}return t}else if(e<this.bitPointer+1+16){var i=0;var s=0;for(var r=0;r<this.bitPointer+1;r++){i+=1<<r}var o=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1);this.blockPointer++;var u=this.blocks[this.blockPointer]<<e-(this.bitPointer+1+8);this.blockPointer++;for(var r=0;r<e-(this.bitPointer+1+8);r++){s+=1<<r}s<<=8-(e-(this.bitPointer+1+8));var a=(this.blocks[this.blockPointer]&s)>>8-(e-(this.bitPointer+1+8));t=o+u+a;this.bitPointer=this.bitPointer-(e-8)%8;if(this.bitPointer<0){this.bitPointer=8+this.bitPointer}return t}else{return 0}};this.NextMode=function(){if(this.blockPointer>this.blocks.length-this.numErrorCorrectionCode-2)return 0;else return this.getNextBits(4)};this.getDataLength=function(e){var t=0;while(true){if(e>>t==1)break;t++}return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][t])};this.getRomanAndFigureString=function(e){var t=e;var n=0;var r="";var i=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":");do{if(t>1){n=this.getNextBits(11);var s=Math.floor(n/45);var o=n%45;r+=i[s];r+=i[o];t-=2}else if(t==1){n=this.getNextBits(6);r+=i[n];t-=1}}while(t>0);return r};this.getFigureString=function(e){var t=e;var n=0;var r="";do{if(t>=3){n=this.getNextBits(10);if(n<100)r+="0";if(n<10)r+="0";t-=3}else if(t==2){n=this.getNextBits(7);if(n<10)r+="0";t-=2}else if(t==1){n=this.getNextBits(4);t-=1}r+=n}while(t>0);return r};this.get8bitByteArray=function(e){var t=e;var n=0;var r=new Array;do{n=this.getNextBits(8);r.push(n);t--}while(t>0);return r};this.getKanjiString=function(e){var t=e;var n=0;var r="";do{n=getNextBits(13);var i=n%192;var s=n/192;var o=(s<<8)+i;var u=0;if(o+33088<=40956){u=o+33088}else{u=o+49472}r+=String.fromCharCode(u);t--}while(t>0);return r};this.__defineGetter__("DataByte",function(){var e=new Array;var t=1;var n=2;var r=4;var i=8;do{var s=this.NextMode();if(s==0){if(e.length>0)break;else throw"Empty data block"}if(s!=t&&s!=n&&s!=r&&s!=i){throw"Invalid mode: "+s+" in (block:"+this.blockPointer+" bit:"+this.bitPointer+")"}dataLength=this.getDataLength(s);if(dataLength<1)throw"Invalid data length: "+dataLength;switch(s){case t:var o=this.getFigureString(dataLength);var u=new Array(o.length);for(var a=0;a<o.length;a++)u[a]=o.charCodeAt(a);e.push(u);break;case n:var o=this.getRomanAndFigureString(dataLength);var u=new Array(o.length);for(var a=0;a<o.length;a++)u[a]=o.charCodeAt(a);e.push(u);break;case r:var f=this.get8bitByteArray(dataLength);e.push(f);break;case i:var o=this.getKanjiString(dataLength);e.push(o);break}}while(true);return e})}
