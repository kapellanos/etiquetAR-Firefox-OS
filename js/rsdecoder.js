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
function ReedSolomonDecoder(e){this.field=e;this.decode=function(e,t){var n=new GF256Poly(this.field,e);var r=new Array(t);for(var i=0;i<r.length;i++)r[i]=0;var s=false;var o=true;for(var i=0;i<t;i++){var u=n.evaluateAt(this.field.exp(s?i+1:i));r[r.length-1-i]=u;if(u!=0){o=false}}if(o){return}var a=new GF256Poly(this.field,r);var f=this.runEuclideanAlgorithm(this.field.buildMonomial(t,1),a,t);var l=f[0];var c=f[1];var h=this.findErrorLocations(l);var p=this.findErrorMagnitudes(c,h,s);for(var i=0;i<h.length;i++){var d=e.length-1-this.field.log(h[i]);if(d<0){throw"ReedSolomonException Bad error location"}e[d]=GF256.addOrSubtract(e[d],p[i])}};this.runEuclideanAlgorithm=function(e,t,n){if(e.Degree<t.Degree){var r=e;e=t;t=r}var i=e;var s=t;var o=this.field.One;var u=this.field.Zero;var a=this.field.Zero;var f=this.field.One;while(s.Degree>=Math.floor(n/2)){var l=i;var c=o;var h=a;i=s;o=u;a=f;if(i.Zero){throw"r_{i-1} was zero"}s=l;var p=this.field.Zero;var d=i.getCoefficient(i.Degree);var v=this.field.inverse(d);while(s.Degree>=i.Degree&&!s.Zero){var m=s.Degree-i.Degree;var g=this.field.multiply(s.getCoefficient(s.Degree),v);p=p.addOrSubtract(this.field.buildMonomial(m,g));s=s.addOrSubtract(i.multiplyByMonomial(m,g))}u=p.multiply1(o).addOrSubtract(c);f=p.multiply1(a).addOrSubtract(h)}var y=f.getCoefficient(0);if(y==0){throw"ReedSolomonException sigmaTilde(0) was zero"}var b=this.field.inverse(y);var w=f.multiply2(b);var E=s.multiply2(b);return new Array(w,E)};this.findErrorLocations=function(e){var t=e.Degree;if(t==1){return new Array(e.getCoefficient(1))}var n=new Array(t);var r=0;for(var i=1;i<256&&r<t;i++){if(e.evaluateAt(i)==0){n[r]=this.field.inverse(i);r++}}if(r!=t){throw"Error locator degree does not match number of roots"}return n};this.findErrorMagnitudes=function(e,t,n){var r=t.length;var i=new Array(r);for(var s=0;s<r;s++){var o=this.field.inverse(t[s]);var u=1;for(var a=0;a<r;a++){if(s!=a){u=this.field.multiply(u,GF256.addOrSubtract(1,this.field.multiply(t[a],o)))}}i[s]=this.field.multiply(e.evaluateAt(o),this.field.inverse(u));if(n){i[s]=this.field.multiply(i[s],o)}}return i}}