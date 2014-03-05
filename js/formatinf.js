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
function FormatInformation(e){this.errorCorrectionLevel=ErrorCorrectionLevel.forBits(e>>3&3);this.dataMask=e&7;this.__defineGetter__("ErrorCorrectionLevel",function(){return this.errorCorrectionLevel});this.__defineGetter__("DataMask",function(){return this.dataMask});this.GetHashCode=function(){return this.errorCorrectionLevel.ordinal()<<3|dataMask};this.Equals=function(e){var t=e;return this.errorCorrectionLevel==t.errorCorrectionLevel&&this.dataMask==t.dataMask}}var FORMAT_INFO_MASK_QR=21522;var FORMAT_INFO_DECODE_LOOKUP=new Array(new Array(21522,0),new Array(20773,1),new Array(24188,2),new Array(23371,3),new Array(17913,4),new Array(16590,5),new Array(20375,6),new Array(19104,7),new Array(30660,8),new Array(29427,9),new Array(32170,10),new Array(30877,11),new Array(26159,12),new Array(25368,13),new Array(27713,14),new Array(26998,15),new Array(5769,16),new Array(5054,17),new Array(7399,18),new Array(6608,19),new Array(1890,20),new Array(597,21),new Array(3340,22),new Array(2107,23),new Array(13663,24),new Array(12392,25),new Array(16177,26),new Array(14854,27),new Array(9396,28),new Array(8579,29),new Array(11994,30),new Array(11245,31));var BITS_SET_IN_HALF_BYTE=new Array(0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4);FormatInformation.numBitsDiffering=function(e,t){e^=t;return BITS_SET_IN_HALF_BYTE[e&15]+BITS_SET_IN_HALF_BYTE[URShift(e,4)&15]+BITS_SET_IN_HALF_BYTE[URShift(e,8)&15]+BITS_SET_IN_HALF_BYTE[URShift(e,12)&15]+BITS_SET_IN_HALF_BYTE[URShift(e,16)&15]+BITS_SET_IN_HALF_BYTE[URShift(e,20)&15]+BITS_SET_IN_HALF_BYTE[URShift(e,24)&15]+BITS_SET_IN_HALF_BYTE[URShift(e,28)&15]};FormatInformation.decodeFormatInformation=function(e){var t=FormatInformation.doDecodeFormatInformation(e);if(t!=null){return t}return FormatInformation.doDecodeFormatInformation(e^FORMAT_INFO_MASK_QR)};FormatInformation.doDecodeFormatInformation=function(e){var t=4294967295;var n=0;for(var r=0;r<FORMAT_INFO_DECODE_LOOKUP.length;r++){var i=FORMAT_INFO_DECODE_LOOKUP[r];var s=i[0];if(s==e){return new FormatInformation(i[1])}var o=this.numBitsDiffering(e,s);if(o<t){n=i[1];t=o}}if(t<=3){return new FormatInformation(n)}return null}
		