/**
 * Pulse wave modulated light wave
 * Blinks red, green and blue LEDs each in a turn.
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
    intervals[led] = undefined;
    led.reset();
  }
  if(brightness > 0) {
    intervals[led] = setInterval(function() {
      digitalPulse(led, 1, brightness * (1000/frequency));
    }, 1000/frequency);
  }
}

var interval;
/**
* Changes brightness between 0.1 to 1 with 0.1 intervals with determined interval.
*/
function wave(led, time) {
  var brightness = 0.1,
      change = 0.1;
  interval = setInterval(function() {
    brightness = brightness + change;
    if(brightness > 0.9 || brightness < 0.2) {
      change *= -1;
    }
    pwm(led, brightness, 500);


  }, time);
}

var activeLed;
/**
* Starts the waving a LED, waits while a single wave is over. Turns of the led and calls itself recursively activating second LED.
*/
function blink() {
  if((typeof interval) !== "undefined") {
    clearInterval(interval);
  }
  pwm(activeLed, 0, 500);
  if(activeLed == LED1) {
    activeLed = LED2;
  } else if(activeLed == LED2) {
    activeLed = LED3;
  } else {
    activeLed = LED1;
  }
  wave(activeLed, 12.5);
  setTimeout(blink, 200);
 }

blink();