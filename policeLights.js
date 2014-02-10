/**
 * Pulse wave modulated police lights
 * Blinks blue and red lights in opposite phases.
 */
var intervals = [];
/**
 * Pulse Wave Modulation
 * Blinks led faster than the eye can see to adjust brightness of a light
 * Brightness is a float from 0 to 1
 * Recommended frequency over 50
 * 
 */
function pwm(led, brightness, frequency) {
  if ((typeof intervals[led]) !== "undefined") {
    clearInterval(intervals[led]);
    led.reset();
  }
  intervals[led] = setInterval(function() {
    digitalPulse(led, 1, brightness * (1000/frequency));
  }, 1000/frequency);
}

/**
* Changes brightness between 0.1 to 1 with 0.1 intervals with determined interval.
*/
function wave(led, time) {
  var brightness = 0.1,
      change = 0.1;
  setInterval(function() {
    brightness = brightness + change;
    if(brightness > 0.9 || brightness < 0.2) {
      change *= -1;
    }
    pwm(led, brightness, 500);
  
  }, time);
}

//Start blue led to blink increasing intensity every 20ms
wave(LED1, 20);

//Start the red led when the blue led is on the highest intensity
setTimeout(function() {
wave(LED3, 20);
}, 200);