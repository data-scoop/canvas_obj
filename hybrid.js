// G1

var m=-1; // Mode.
var t=-1; // Tool.

var pt1=new Array();
pt1[0] = pt1[1] = 0;


// Property Sheet Values (get) ----------

function toggle_prpty_shts_off(){
   document.all.hybrid_div_path.className="prpty_sht_off";
   document.all.hybrid_div_segment.className="prpty_sht_off";
   document.all.hybrid_div_text.className="prpty_sht_off";
   document.all.hybrid_div_imgfile.className="prpty_sht_off";
   return;
}

function toggle_prpty_sht_on(eleId){
   toggle_prpty_shts_off();
   cws = document.getElementById(eleId);
   cws.className="prpty_sht_on";
}


function color_path(){
   uv_color_path =  document.getElementById("hybrid_inp_color_path");
   return uv_color_path.value;
}

function color_segment(){
   uv_color_segment =  document.getElementById("hybrid_inp_color_segment");
   return uv_color_segment.value;
}

function width_path(){
   uv_width_path =  document.getElementById("hybrid_inp_width_path");
   return uv_width_path.value;
}

function width_segment(){
   uv_width_segment =  document.getElementById("hybrid_inp_width_segment");
   return uv_width_segment.value;
}

function fill_point(){
   uv_fill_point = document.getElementById("hybrid_inp_pointfilled");
   return uv_fill_point.checked;
}

function diameter_point(){
   uv_diameter_point = document.getElementById("hybrid_inp_diameter");
   return uv_diameter_point.value;
}

function font_text(){
   uv_font = document.getElementById("hybrid_inp_text_font");
   uv_size = document.getElementById("hybrid_inp_text_size");
   uv_fontstring = uv_size.value+"pt "+uv_font.value;
   return uv_fontstring;
}

function text_text(){
  uv_text = document.getElementById("hybrid_inp_text_text");
  return hybrid_inp_text_text.value;
}

function fill_color_text(){
  uv_fillTextColor = document.getElementById("hybrid_inp_text_fillText_color");
  return fillTextColor.value;
}

function stroke_color_text(){
  uv_strokeTextColor = document.getElementById("hybrid_inp_text_strokeText_color");
  return uv_strokeTextColor.value;
}

// --------------------------------

function toggle(){
   uv_hybrid_inp_pointfilled = document.getElementById("hybrid_inp_pointfilled");
   uv_hybrid_inp_width_path = document.getElementById("hybrid_inp_width_path");

   if(uv_hybrid_inp_pointfilled.checked==true){
     uv_hybrid_inp_width_path.disabled=true;
   } else {
     uv_hybrid_inp_width_path.disabled=false;
   };
   return;
}

function xy(e){
   mX = (e)?e.pageX:event.x;
   mY = (e)?e.pageY:event.y;
   return [mX,mY];
}

function event_manifold(){
  if(t==0 && m==-1){drawPt(xy()); m=0;}
  if(t==1 && m==0){m=1; pt1=xy(); if (document.all.hybrid_inp_point1.checked==true){drawPt(pt1);} return;}
  if(t==1 && m==2){m=0; pt2=xy(); if (document.all.hybrid_inp_point2.checked==true){drawPt(pt2);} drawSeg(pt1,pt2); return;}
  if(t==2 && m==0){drawText(xy()); }
  if(t==3 && m==0){drawImg(xy()); return;}
}

function askimgfile(){
   var imgfile = document.getElementById("hybrid_div_imgfile");
   imgfile.className = "ask_img_file_on";
   return;
}


function dragger(){
  if (t==0 && m==-1){return;}
  if (t==0 && m==0){drawPt(xy()); return;}
}

function tool_off(){
  if(t==0 && m==0){m=-1;}
  if(t==1 && m==1){m=2;}
  if(t==2 && m==0){m=0;}
}

function new_cnvs(){
  t=-1; m=2;
  var canvas = document.getElementById('hybrid_cnvs_0');
  canvas.width=256;
  return;
}

function drawPt(coords){
   var canvas = document.getElementById('hybrid_cnvs_0');
   var ctx = canvas.getContext('2d');
   if (canvas.getContext){
   x = coords[0]-28;
   y = coords[1]-28;

   ctx.beginPath();
  
   ctx.arc(x,y,diameter_point(),0,360,true);
   if (fill_point()==true){
     ctx.fillStyle = color_path();
     ctx.fill();
   } else {
     ctx.lineWidth= width_path();
     ctx.strokeStyle = color_path();
     ctx.stroke();
   }
  } else {alert(msg);}
}

function drawSeg(pt1, pt2){

   var canvas = document.getElementById('hybrid_cnvs_0');
   var ctx = canvas.getContext('2d');
   if (canvas.getContext){

   pt1x = pt1[0]-28;
   pt1y = pt1[1]-28;
   pt2x = pt2[0]-28;
   pt2y = pt2[1]-28;

   ctx.beginPath();

   ctx.moveTo(pt1x,pt1y);
   ctx.lineTo(pt2x,pt2y);
   ctx.lineWidth= width_segment();
   ctx.strokeStyle = color_segment();

   ctx.stroke();

   }
   else {alert(msg);}
}


function drawText(coords){
   var canvas = document.getElementById('hybrid_cnvs_0');
   var ctx = canvas.getContext('2d');

   x = coords[0]-28;
   y = coords[1]-28;
   ctx.beginPath();
   ctx.font=font_text();
   ctx.lineWidth= width_path();
   ctx.strokeText(text_text(), x, y);
   ctx.strokeStyle = stroke_color_text();
   ctx.stroke();
}


function drawImg(coords){

   var I = document.getElementById('hybrid_inp_imgfile').value.replace("fakepath","wamp\\www\\dk_production\\_organic\\img");

   var canvas = document.getElementById('hybrid_cnvs_0');
   var ctx = canvas.getContext('2d');
   var img = new Image();
   img.src = I;

   x = coords[0]-28;
   y = coords[1]-28;

   img.onload = function(){ctx.drawImage(img,x,y);}

}
