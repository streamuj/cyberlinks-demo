var _0x93bf=["\x64\x6F\x6E\x65","\x61\x70\x69\x2F\x61\x6E\x61\x6C\x79\x74\x69\x63\x73\x2F\x70\x6C\x61\x79","\x31","\x50\x4F\x53\x54","\x6A\x73\x6F\x6E","\x61\x6A\x61\x78","\x61\x70\x69\x2F\x61\x6E\x61\x6C\x79\x74\x69\x63\x73\x2F\x70\x61\x75\x73\x65","\x61\x70\x69\x2F\x61\x6E\x61\x6C\x79\x74\x69\x63\x73\x2F\x70\x6C\x61\x79\x61\x64\x73","\x70\x6F\x73\x74","\x61\x70\x69\x2F\x61\x6E\x61\x6C\x79\x74\x69\x63\x73\x2F\x61\x64\x73\x5F\x63\x6F\x6D\x70\x6C\x65\x74\x65","\x68\x74\x74\x70\x3A\x2F\x2F","\x6D\x75\x6C\x74\x69\x74\x76\x73\x6F\x6C\x75\x74\x69\x6F\x6E\x2E\x63\x6F\x6D\x2F","\x6D\x75\x6C\x74\x69\x74\x76\x66\x69\x6E\x61\x6C\x2F","\x6C\x6F\x67","\x6F\x6E\x41\x64\x43\x6F\x6D\x70\x6C\x65\x74\x65","\x70\x6F\x73\x69\x74\x69\x6F\x6E","\x72\x6F\x75\x6E\x64","\x6F\x6E\x41\x64\x54\x69\x6D\x65","\x6F\x6E\x41\x64\x50\x61\x75\x73\x65","\x74\x61\x67","\x6F\x6E\x41\x64\x50\x6C\x61\x79","\x6F\x6E\x50\x6C\x61\x79","\x67\x65\x74\x50\x6F\x73\x69\x74\x69\x6F\x6E","\x6F\x6E\x50\x61\x75\x73\x65"];function play(){$[_0x93bf[5]]({url:h+bb+f+_0x93bf[1],data:{content_id:content_id,content_provider:content_provider,content_type:type,play:_0x93bf[2]},cache:1,type:_0x93bf[3],dataType:_0x93bf[4]})[_0x93bf[0]](function(_0xbdd4x2){id=_0xbdd4x2})}function pause(_0xbdd4x2){id>0&&$[_0x93bf[5]]({url:h+bb+f+_0x93bf[6],data:{id:id,watched_time:_0xbdd4x2,pause:_0x93bf[2]},cache:1,type:_0x93bf[3]})[_0x93bf[0]](function(){})}function playAds(_0xbdd4x2){$[_0x93bf[5]]({url:h+bb+f+_0x93bf[7],data:{tag:_0xbdd4x2,broadcaster:content_provider,play:_0x93bf[2]},cache:1,type:_0x93bf[8],success:function(_0xbdd4x2){ad_id=_0xbdd4x2}})}function completeAds(_0xbdd4x2){$[_0x93bf[5]]({url:h+bb+f+_0x93bf[9],data:{id:ad_id,watched_time:_0xbdd4x2,complete:_0x93bf[2],pause:0},cache:1,type:_0x93bf[3]})[_0x93bf[0]](function(){})}var id=0,duration,pos=0;h=_0x93bf[10];var ad_duration=0,ad_id=0;bb=_0x93bf[11];var f=_0x93bf[12];jwplayer()[_0x93bf[23]](function(){pos>0?(pos=parseInt(this[_0x93bf[22]]())-pos1,pos1+=pos):(pos=parseInt(this[_0x93bf[22]]()),pos1=pos),pause(pos1)}),jwplayer()[_0x93bf[21]](function(){play()}),jwplayer()[_0x93bf[20]](function(_0xbdd4x2){var _0xbdd4xc=_0xbdd4x2[_0x93bf[19]];playAds(_0xbdd4xc);}),jwplayer()[_0x93bf[18]](function(){pauseAds(ad_duration)}),jwplayer()[_0x93bf[17]](function(_0xbdd4x2){ad_duration=Math[_0x93bf[16]](_0xbdd4x2[_0x93bf[15]])}),jwplayer()[_0x93bf[14]](function(){console[_0x93bf[13]](ad_duration),completeAds(ad_duration)});