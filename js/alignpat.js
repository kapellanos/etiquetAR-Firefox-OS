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
function AlignmentPattern(e,t,n){this.x=e;this.y=t;this.count=1;this.estimatedModuleSize=n;this.__defineGetter__("EstimatedModuleSize",function(){return this.estimatedModuleSize});this.__defineGetter__("Count",function(){return this.count});this.__defineGetter__("X",function(){return Math.floor(this.x)});this.__defineGetter__("Y",function(){return Math.floor(this.y)});this.incrementCount=function(){this.count++};this.aboutEquals=function(e,t,n){if(Math.abs(t-this.y)<=e&&Math.abs(n-this.x)<=e){var r=Math.abs(e-this.estimatedModuleSize);return r<=1||r/this.estimatedModuleSize<=1}return false}}function AlignmentPatternFinder(e,t,n,r,i,s,o){this.image=e;this.possibleCenters=new Array;this.startX=t;this.startY=n;this.width=r;this.height=i;this.moduleSize=s;this.crossCheckStateCount=new Array(0,0,0);this.resultPointCallback=o;this.centerFromEnd=function(e,t){return t-e[2]-e[1]/2};this.foundPatternCross=function(e){var t=this.moduleSize;var n=t/2;for(var r=0;r<3;r++){if(Math.abs(t-e[r])>=n){return false}}return true};this.crossCheckVertical=function(e,t,n,r){var i=this.image;var s=qrcode.height;var o=this.crossCheckStateCount;o[0]=0;o[1]=0;o[2]=0;var u=e;while(u>=0&&i[t+u*qrcode.width]&&o[1]<=n){o[1]++;u--}if(u<0||o[1]>n){return NaN}while(u>=0&&!i[t+u*qrcode.width]&&o[0]<=n){o[0]++;u--}if(o[0]>n){return NaN}u=e+1;while(u<s&&i[t+u*qrcode.width]&&o[1]<=n){o[1]++;u++}if(u==s||o[1]>n){return NaN}while(u<s&&!i[t+u*qrcode.width]&&o[2]<=n){o[2]++;u++}if(o[2]>n){return NaN}var a=o[0]+o[1]+o[2];if(5*Math.abs(a-r)>=2*r){return NaN}return this.foundPatternCross(o)?this.centerFromEnd(o,u):NaN};this.handlePossibleCenter=function(e,t,n){var r=e[0]+e[1]+e[2];var i=this.centerFromEnd(e,n);var s=this.crossCheckVertical(t,Math.floor(i),2*e[1],r);if(!isNaN(s)){var o=(e[0]+e[1]+e[2])/3;var u=this.possibleCenters.length;for(var a=0;a<u;a++){var f=this.possibleCenters[a];if(f.aboutEquals(o,s,i)){return new AlignmentPattern(i,s,o)}}var l=new AlignmentPattern(i,s,o);this.possibleCenters.push(l);if(this.resultPointCallback!=null){this.resultPointCallback.foundPossibleResultPoint(l)}}return null};this.find=function(){var t=this.startX;var i=this.height;var s=t+r;var o=n+(i>>1);var u=new Array(0,0,0);for(var a=0;a<i;a++){var f=o+((a&1)==0?a+1>>1:-(a+1>>1));u[0]=0;u[1]=0;u[2]=0;var l=t;while(l<s&&!e[l+qrcode.width*f]){l++}var c=0;while(l<s){if(e[l+f*qrcode.width]){if(c==1){u[c]++}else{if(c==2){if(this.foundPatternCross(u)){var h=this.handlePossibleCenter(u,f,l);if(h!=null){return h}}u[0]=u[2];u[1]=1;u[2]=0;c=1}else{u[++c]++}}}else{if(c==1){c++}u[c]++}l++}if(this.foundPatternCross(u)){var h=this.handlePossibleCenter(u,f,s);if(h!=null){return h}}}if(!(this.possibleCenters.length==0)){return this.possibleCenters[0]}throw"Couldn't find enough alignment patterns"}}