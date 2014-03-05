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


GridSampler={};GridSampler.checkAndNudgePoints=function(e,t){var n=qrcode.width;var r=qrcode.height;var i=true;for(var s=0;s<t.length&&i;s+=2){var o=Math.floor(t[s]);var u=Math.floor(t[s+1]);if(o<-1||o>n||u<-1||u>r){throw"Error.checkAndNudgePoints "}i=false;if(o==-1){t[s]=0;i=true}else if(o==n){t[s]=n-1;i=true}if(u==-1){t[s+1]=0;i=true}else if(u==r){t[s+1]=r-1;i=true}}i=true;for(var s=t.length-2;s>=0&&i;s-=2){var o=Math.floor(t[s]);var u=Math.floor(t[s+1]);if(o<-1||o>n||u<-1||u>r){throw"Error.checkAndNudgePoints "}i=false;if(o==-1){t[s]=0;i=true}else if(o==n){t[s]=n-1;i=true}if(u==-1){t[s+1]=0;i=true}else if(u==r){t[s+1]=r-1;i=true}}};GridSampler.sampleGrid3=function(e,t,n){var r=new BitMatrix(t);var i=new Array(t<<1);for(var s=0;s<t;s++){var o=i.length;var u=s+.5;for(var a=0;a<o;a+=2){i[a]=(a>>1)+.5;i[a+1]=u}n.transformPoints1(i);GridSampler.checkAndNudgePoints(e,i);try{for(var a=0;a<o;a+=2){var f=Math.floor(i[a])*4+Math.floor(i[a+1])*qrcode.width*4;var l=e[Math.floor(i[a])+qrcode.width*Math.floor(i[a+1])];qrcode.imagedata.data[f]=l?255:0;qrcode.imagedata.data[f+1]=l?255:0;qrcode.imagedata.data[f+2]=0;qrcode.imagedata.data[f+3]=255;if(l)r.set_Renamed(a>>1,s)}}catch(c){throw"Error.checkAndNudgePoints"}}return r};GridSampler.sampleGridx=function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g){var y=PerspectiveTransform.quadrilateralToQuadrilateral(n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g);return GridSampler.sampleGrid3(e,t,y)}