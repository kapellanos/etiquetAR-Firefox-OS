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
function DataMask000(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){return(e+t&1)==0}}function DataMask001(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){return(e&1)==0}}function DataMask010(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){return t%3==0}}function DataMask011(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){return(e+t)%3==0}}function DataMask100(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){return(URShift(e,1)+t/3&1)==0}}function DataMask101(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){var n=e*t;return(n&1)+n%3==0}}function DataMask110(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){var n=e*t;return((n&1)+n%3&1)==0}}function DataMask111(){this.unmaskBitMatrix=function(e,t){for(var n=0;n<t;n++){for(var r=0;r<t;r++){if(this.isMasked(n,r)){e.flip(r,n)}}}};this.isMasked=function(e,t){return((e+t&1)+e*t%3&1)==0}}DataMask={};DataMask.forReference=function(e){if(e<0||e>7){throw"System.ArgumentException"}return DataMask.DATA_MASKS[e]};DataMask.DATA_MASKS=new Array(new DataMask000,new DataMask001,new DataMask010,new DataMask011,new DataMask100,new DataMask101,new DataMask110,new DataMask111)

