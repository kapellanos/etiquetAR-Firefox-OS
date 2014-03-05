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
Decoder={};Decoder.rsDecoder=new ReedSolomonDecoder(GF256.QR_CODE_FIELD);Decoder.correctErrors=function(e,t){var n=e.length;var r=new Array(n);for(var i=0;i<n;i++){r[i]=e[i]&255}var s=e.length-t;try{Decoder.rsDecoder.decode(r,s)}catch(o){throw o}for(var i=0;i<t;i++){e[i]=r[i]}};Decoder.decode=function(e){var t=new BitMatrixParser(e);var n=t.readVersion();var r=t.readFormatInformation().ErrorCorrectionLevel;var i=t.readCodewords();var s=DataBlock.getDataBlocks(i,n,r);var o=0;for(var u=0;u<s.length;u++){o+=s[u].NumDataCodewords}var a=new Array(o);var f=0;for(var l=0;l<s.length;l++){var c=s[l];var h=c.Codewords;var p=c.NumDataCodewords;Decoder.correctErrors(h,p);for(var u=0;u<p;u++){a[f++]=h[u]}}var d=new QRCodeDataBlockReader(a,n.VersionNumber,r.Bits);return d}