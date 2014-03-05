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
function DataBlock(e,t){this.numDataCodewords=e;this.codewords=t;this.__defineGetter__("NumDataCodewords",function(){return this.numDataCodewords});this.__defineGetter__("Codewords",function(){return this.codewords})}DataBlock.getDataBlocks=function(e,t,n){if(e.length!=t.TotalCodewords){throw"ArgumentException"}var r=t.getECBlocksForLevel(n);var i=0;var s=r.getECBlocks();for(var o=0;o<s.length;o++){i+=s[o].Count}var u=new Array(i);var a=0;for(var f=0;f<s.length;f++){var l=s[f];for(var o=0;o<l.Count;o++){var c=l.DataCodewords;var h=r.ECCodewordsPerBlock+c;u[a++]=new DataBlock(c,new Array(h))}}var p=u[0].codewords.length;var d=u.length-1;while(d>=0){var v=u[d].codewords.length;if(v==p){break}d--}d++;var m=p-r.ECCodewordsPerBlock;var g=0;for(var o=0;o<m;o++){for(var f=0;f<a;f++){u[f].codewords[o]=e[g++]}}for(var f=d;f<a;f++){u[f].codewords[m]=e[g++]}var y=u[0].codewords.length;for(var o=m;o<y;o++){for(var f=0;f<a;f++){var b=f<d?o:o+1;u[f].codewords[b]=e[g++]}}return u}
