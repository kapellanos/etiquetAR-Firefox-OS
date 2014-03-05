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
function GF256Poly(e,t){if(t==null||t.length==0){throw"System.ArgumentException"}this.field=e;var n=t.length;if(n>1&&t[0]==0){var r=1;while(r<n&&t[r]==0){r++}if(r==n){this.coefficients=e.Zero.coefficients}else{this.coefficients=new Array(n-r);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=0;for(var s=0;s<this.coefficients.length;s++)this.coefficients[s]=t[r+s]}}else{this.coefficients=t}this.__defineGetter__("Zero",function(){return this.coefficients[0]==0});this.__defineGetter__("Degree",function(){return this.coefficients.length-1});this.__defineGetter__("Coefficients",function(){return this.coefficients});this.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]};this.evaluateAt=function(e){if(e==0){return this.getCoefficient(0)}var t=this.coefficients.length;if(e==1){var n=0;for(var r=0;r<t;r++){n=GF256.addOrSubtract(n,this.coefficients[r])}return n}var i=this.coefficients[0];for(var r=1;r<t;r++){i=GF256.addOrSubtract(this.field.multiply(e,i),this.coefficients[r])}return i};this.addOrSubtract=function(t){if(this.field!=t.field){throw"GF256Polys do not have same GF256 field"}if(this.Zero){return t}if(t.Zero){return this}var n=this.coefficients;var r=t.coefficients;if(n.length>r.length){var i=n;n=r;r=i}var s=new Array(r.length);var o=r.length-n.length;for(var u=0;u<o;u++)s[u]=r[u];for(var a=o;a<r.length;a++){s[a]=GF256.addOrSubtract(n[a-o],r[a])}return new GF256Poly(e,s)};this.multiply1=function(e){if(this.field!=e.field){throw"GF256Polys do not have same GF256 field"}if(this.Zero||e.Zero){return this.field.Zero}var t=this.coefficients;var n=t.length;var r=e.coefficients;var i=r.length;var s=new Array(n+i-1);for(var o=0;o<n;o++){var u=t[o];for(var a=0;a<i;a++){s[o+a]=GF256.addOrSubtract(s[o+a],this.field.multiply(u,r[a]))}}return new GF256Poly(this.field,s)};this.multiply2=function(e){if(e==0){return this.field.Zero}if(e==1){return this}var t=this.coefficients.length;var n=new Array(t);for(var r=0;r<t;r++){n[r]=this.field.multiply(this.coefficients[r],e)}return new GF256Poly(this.field,n)};this.multiplyByMonomial=function(e,t){if(e<0){throw"System.ArgumentException"}if(t==0){return this.field.Zero}var n=this.coefficients.length;var r=new Array(n+e);for(var i=0;i<r.length;i++)r[i]=0;for(var i=0;i<n;i++){r[i]=this.field.multiply(this.coefficients[i],t)}return new GF256Poly(this.field,r)};this.divide=function(e){if(this.field!=e.field){throw"GF256Polys do not have same GF256 field"}if(e.Zero){throw"Divide by 0"}var t=this.field.Zero;var n=this;var r=e.getCoefficient(e.Degree);var i=this.field.inverse(r);while(n.Degree>=e.Degree&&!n.Zero){var s=n.Degree-e.Degree;var o=this.field.multiply(n.getCoefficient(n.Degree),i);var u=e.multiplyByMonomial(s,o);var a=this.field.buildMonomial(s,o);t=t.addOrSubtract(a);n=n.addOrSubtract(u)}return new Array(t,n)}}