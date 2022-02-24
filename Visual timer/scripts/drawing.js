"use strict";

const CANVAS_SIZE = 200;
const LINE_WIDTH = 2;
const TIMER_RADIUS = 100;
const LINE_COLOR = "#808080";
const FILL_COLOR = "#D3D3D3";


export function drawTimer(ctx, percentValue) {
  ctx.beginPath();
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.moveTo(CANVAS_SIZE/2, CANVAS_SIZE/2);
  ctx.lineWidth = LINE_WIDTH;
  ctx.lineTo(CANVAS_SIZE/2, 0);

  //if((2*Math.PI/100*(1-percentValue)) < 0) {
  if (percentValue > 0) {
    
    //drawing an arc from 90deg (100%) to 90deg (0%) counter-clockwise
    ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, TIMER_RADIUS, 3*Math.PI/2, ((2*Math.PI/100*(100-percentValue)) + 3*Math.PI/2), true);

    ctx.lineTo(CANVAS_SIZE/2, CANVAS_SIZE/2);
    ctx.fillStyle = FILL_COLOR;
    ctx.fill();
    ctx.strokeStyle = LINE_COLOR;
    ctx.stroke();

    //drawing an outer circle; for some reason, linewidth when drawing lines is thicker by 2 times
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH*2;
    ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, TIMER_RADIUS, 3*Math.PI/2, ((2*Math.PI/100*(100-percentValue)) + 3*Math.PI/2), true);
  }
  
  ctx.strokeStyle = LINE_COLOR;
  ctx.stroke();
}


export function drawCircle(ctx) {
  ctx.beginPath();
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.arc(CANVAS_SIZE/2, CANVAS_SIZE/2, TIMER_RADIUS, 0, 2*Math.PI);
  ctx.lineWidth = LINE_WIDTH*2;
  ctx.strokeStyle = LINE_COLOR;
  ctx.stroke();
}