//--------------- Actinic Javascript for Soapbox from WWW.CODEPATH.CO.UK

var soapboxapp = "http://www.soapbox-reviews.net/cgi-bin/iwsoapbox.dll"; // the url of the application server.  Only change if advised by Codepath.
//Gets the Image Filename from a rating
function soapboxgetimagefilename(nrating){
  return "sbrating" + nrating + ".bmp";
}

// Gets the image file width
function getimagewidth(nfullimagewidth,nrating){
var nwidth = nfullimagewidth;
  return "\"" + nwidth + "\" "
}

function wopen(url, w, h){
  wleft = (screen.width - w) / 2;
  wtop = (screen.height - h) / 2;
  if (wleft < 0) {w = screen.width; wleft = 0;}
  if (wtop < 0)  {h = screen.height;wtop = 0;}
  var optionslist = 'width=' + w + ', height=' + h + ', location=no, menubar=no,status=no, toolbar=no, scrollbars=yes, resizable=yes';
  var win = window.open(url, null, optionslist);
}
function d2h(d) {return d.toString(16);}
function safeurlstring(thestring){
  var srtn = "";
  var charascii = 0;
  for (var i=0;i<=thestring.length-1;i++){
    charascii = thestring.charCodeAt(i);
    if ((charascii>=48 && charascii<=57) ||
       (charascii>=65 && charascii<=90) ||
       (charascii>=97 && charascii<=122))
      {srtn = srtn + thestring.charAt(i);}
    else 
      {srtn=srtn+"%"+d2h(charascii);}
  }
  return srtn;
}
function soapboxgetreviewhtml(srating,sreviewcount,sproductref,sproductname,nrtnmode,nmajorver,internalreadlink){
var soapboxvendorkey = "L1233PF02E";                                     // Your Site identification key.  Only change if advised by Codepath.
var notreviewed = "Not Reviewed";
var writereview = "Write&nbsp;a&nbsp;Review";
var writefirstreview = "Be the first!";
var nfullimagewidth = 76;                      
var splu = "s";                                
var srtn  = "<div align=\"left\"><table border=\"0\" cellspacing = \"0\" cellpadding = \"0\"><tr align = \"left\" >";
var nrating = 0;
var nreviewcount = 0;
if (srating != ""){ nrating = parseInt(srating)};		          	// v7 will pass null for unreviewed products
if (sreviewcount != ""){ nreviewcount = parseInt(sreviewcount)};
if (nmajorver == 7){
  sproductref = sproductref.substring(1); // strip anchor reference
  var excl1 = sproductref.indexOf("!");   // strip duplicate prefix
  var excl2 = sproductref.indexOf("_21");
  if (excl1 >= 0)
    {sproductref = sproductref.substring(excl1+1);}
  else if (excl2 >= 0) 
    {sproductref = sproductref.substring(excl2+3);}
}
sproductref = safeurlstring(sproductref);
sproductname = safeurlstring(sproductname);
if (nreviewcount > 0){
  if (nreviewcount == 1){splu=""}
  srtn = srtn + "<td valign=\"middle\">";
  srtn = srtn + "<img width=" + getimagewidth(nfullimagewidth,nrating) + "alt=\"" + nrating + "/10\" src=\"./" + soapboxgetimagefilename(nrating) + "\">"; 
  srtn = srtn + "&nbsp;&nbsp;<a class=\"soapbox\" href=\"#\" rel=\"nofollow\" onClick=\"javascript:wopen('" + soapboxapp + "?s=" + soapboxvendorkey + "&a=3&i=" + sproductref + "&d=" + sproductname + "&c=" + nreviewcount + "&r=" + nrating + "','570','580'); return false;\">(" + nreviewcount + "&nbsp;review" + splu + ")</a>";
  if (nrtnmode != 2){
    srtn = srtn + "&nbsp;<IMG src=\"./sbBullet.bmp\">&nbsp;<a class=\"soapbox\" href=\"#\" rel=\"nofollow\" onClick=\"javascript:wopen('" + soapboxapp + "?s=" + soapboxvendorkey + "&a=2&i=" + sproductref + "&d=" + sproductname + "&c=" + nreviewcount + "&r=" + nrating + "','570','580'); return false;\">" + writereview + " </a></td>";
  } 
} 
else {
  srtn = srtn + "<td valign=\"middle\">";
  srtn = srtn + "<img src=\"sbratingnone.bmp\">&nbsp;&nbsp;";
  srtn = srtn + notreviewed;
  srtn = srtn + "&nbsp;<IMG src=\"./sbBullet.bmp\">&nbsp;<a class=\"soapbox\" href=\"#\" rel=\"nofollow\" onClick=\"javascript:wopen('" + soapboxapp + "?s=" + soapboxvendorkey + "&a=1&i=" + sproductref + "&d=" + sproductname + "&c=" + nreviewcount + "&r=" + nrating + "','570','580'); return false;\">" + writefirstreview + "</a></td>";
}
srtn = srtn + "</tr></table></div>"
return srtn;
}
