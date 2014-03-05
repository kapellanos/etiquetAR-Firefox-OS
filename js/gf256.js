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
function GF256(e){this.expTable=new Array(256);this.logTable=new Array(256);var t=1;for(var n=0;n<256;n++){this.expTable[n]=t;t<<=1;if(t>=256){t^=e}}for(var n=0;n<255;n++){this.logTable[this.expTable[n]]=n}var r=new Array(1);r[0]=0;this.zero=new GF256Poly(this,new Array(r));var i=new Array(1);i[0]=1;this.one=new GF256Poly(this,new Array(i));this.__defineGetter__("Zero",function(){return this.zero});this.__defineGetter__("One",function(){return this.one});this.buildMonomial=function(e,t){if(e<0){throw"System.ArgumentException"}if(t==0){return zero}var n=new Array(e+1);for(var r=0;r<n.length;r++)n[r]=0;n[0]=t;return new GF256Poly(this,n)};this.exp=function(e){return this.expTable[e]};this.log=function(e){if(e==0){throw"System.ArgumentException"}return this.logTable[e]};this.inverse=function(e){if(e==0){throw"System.ArithmeticException"}return this.expTable[255-this.logTable[e]]};this.multiply=function(e,t){if(e==0||t==0){return 0}if(e==1){return t}if(t==1){return e}return this.expTable[(this.logTable[e]+this.logTable[t])%255]}}GF256.QR_CODE_FIELD=new GF256(285);GF256.DATA_MATRIX_FIELD=new GF256(301);GF256.addOrSubtract=function(e,t){return e^t}