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
function BitMatrix(e,t){if(!t)t=e;if(e<1||t<1){throw"Both dimensions must be greater than 0"}this.width=e;this.height=t;var n=e>>5;if((e&31)!=0){n++}this.rowSize=n;this.bits=new Array(n*t);for(var r=0;r<this.bits.length;r++)this.bits[r]=0;this.__defineGetter__("Width",function(){return this.width});this.__defineGetter__("Height",function(){return this.height});this.__defineGetter__("Dimension",function(){if(this.width!=this.height){throw"Can't call getDimension() on a non-square matrix"}return this.width});this.get_Renamed=function(e,t){var n=t*this.rowSize+(e>>5);return(URShift(this.bits[n],e&31)&1)!=0};this.set_Renamed=function(e,t){var n=t*this.rowSize+(e>>5);this.bits[n]|=1<<(e&31)};this.flip=function(e,t){var n=t*this.rowSize+(e>>5);this.bits[n]^=1<<(e&31)};this.clear=function(){var e=this.bits.length;for(var t=0;t<e;t++){this.bits[t]=0}};this.setRegion=function(e,t,n,r){if(t<0||e<0){throw"Left and top must be nonnegative"}if(r<1||n<1){throw"Height and width must be at least 1"}var i=e+n;var s=t+r;if(s>this.height||i>this.width){throw"The region must fit inside the matrix"}for(var o=t;o<s;o++){var u=o*this.rowSize;for(var a=e;a<i;a++){this.bits[u+(a>>5)]|=1<<(a&31)}}}}