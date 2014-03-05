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
function BitMatrixParser(e){var t=e.Dimension;if(t<21||(t&3)!=1){throw"Error BitMatrixParser"}this.bitMatrix=e;this.parsedVersion=null;this.parsedFormatInfo=null;this.copyBit=function(e,t,n){return this.bitMatrix.get_Renamed(e,t)?n<<1|1:n<<1};this.readFormatInformation=function(){if(this.parsedFormatInfo!=null){return this.parsedFormatInfo}var e=0;for(var t=0;t<6;t++){e=this.copyBit(t,8,e)}e=this.copyBit(7,8,e);e=this.copyBit(8,8,e);e=this.copyBit(8,7,e);for(var n=5;n>=0;n--){e=this.copyBit(8,n,e)}this.parsedFormatInfo=FormatInformation.decodeFormatInformation(e);if(this.parsedFormatInfo!=null){return this.parsedFormatInfo}var r=this.bitMatrix.Dimension;e=0;var i=r-8;for(var t=r-1;t>=i;t--){e=this.copyBit(t,8,e)}for(var n=r-7;n<r;n++){e=this.copyBit(8,n,e)}this.parsedFormatInfo=FormatInformation.decodeFormatInformation(e);if(this.parsedFormatInfo!=null){return this.parsedFormatInfo}throw"Error readFormatInformation"};this.readVersion=function(){if(this.parsedVersion!=null){return this.parsedVersion}var e=this.bitMatrix.Dimension;var t=e-17>>2;if(t<=6){return Version.getVersionForNumber(t)}var n=0;var r=e-11;for(var i=5;i>=0;i--){for(var s=e-9;s>=r;s--){n=this.copyBit(s,i,n)}}this.parsedVersion=Version.decodeVersionInformation(n);if(this.parsedVersion!=null&&this.parsedVersion.DimensionForVersion==e){return this.parsedVersion}n=0;for(var s=5;s>=0;s--){for(var i=e-9;i>=r;i--){n=this.copyBit(s,i,n)}}this.parsedVersion=Version.decodeVersionInformation(n);if(this.parsedVersion!=null&&this.parsedVersion.DimensionForVersion==e){return this.parsedVersion}throw"Error readVersion"};this.readCodewords=function(){var e=this.readFormatInformation();var t=this.readVersion();var n=DataMask.forReference(e.DataMask);var r=this.bitMatrix.Dimension;n.unmaskBitMatrix(this.bitMatrix,r);var i=t.buildFunctionPattern();var s=true;var o=new Array(t.TotalCodewords);var u=0;var a=0;var f=0;for(var l=r-1;l>0;l-=2){if(l==6){l--}for(var c=0;c<r;c++){var h=s?r-1-c:c;for(var p=0;p<2;p++){if(!i.get_Renamed(l-p,h)){f++;a<<=1;if(this.bitMatrix.get_Renamed(l-p,h)){a|=1}if(f==8){o[u++]=a;f=0;a=0}}}}s^=true}if(u!=t.TotalCodewords){throw"Error readCodewords"}return o}}