/**
 * @ngdoc Wrapper module for the AngularJS Typewrite directive.
 * 
 * @name angularJsTypewriteApp
 * @description This directive simulates the effect of typing on a text editor - with a blinking cursor.
 * This directive works as an attribute to any HTML element, and it changes the speed/delay of its animation.
 *
 * # angularJsTypewriteApp
 */
'use strict';

angular
  .module('angularTypewrite', []);

/**
 * AngularJS directive that simulates the effect of typing on a text editor - with a blinking cursor.
 * This directive works as an attribute to any HTML element, and it changes the speed/delay of its animation.
 *
 * There's also a simple less file included for basic styling of the dialog, which can be overridden.
 * The config object also lets the user define custom CSS classes for the modal.
 *
 *  How to use:
 *
 *  Just add the desired text to the 'text' attribute of the element and the directive takes care of the rest.
 *  The 'text' attribute can be a single string or an array of string. In case an array is passed, the string
 *  on each index is erased so the next item can be printed. When the last index is reached, that string stays
 *  on the screen. (So if you want to erase the last string, just push an empty string to the end of the array)
 *
 * These are the optional preferences:
 *  - initial delay: set an 'initial-delay' attribute for the element
 *  - type delay: set a 'type-delay' attribute for the element
 *  - erase delay: set a 'erase-delay' attribute for the element
 *  - specify cursor : set a 'cursor' attribute for the element, specifying which cursor to use
 *  - turn off cursor blinking: set the 'blink-cursor' attribute  to "false"
 *  - cursor blinking speed: set a 'blink-delay' attribute for the element
 *  - scope callback: pass the desired scope callback as the 'callback-fn' attribute of the element
 *
 * Note:
 * Each time/delay value should be set either on seconds (1s) or milliseconds (1000)
 *
 * Dependencies:
 * The directive needs the css file provided in order to replicate the cursor blinking effect.
 */


angular
    .module('angularTypewrite').directive('typewrite', ['$timeout', function ($timeout) {
        function linkFunction($scope, $element, $attrs) {
            var timer = null,
                initialDelay = $attrs.initialDelay ? getTypeDelay($attrs.initialDelay) : 200,
                pause = $attrs.pause || 800,
                typeDelay = $attrs.typeDelay || 200,
                eraseDelay = $attrs.eraseDelay || typeDelay / 2,
                blinkDelay = $attrs.blinkDelay ? getAnimationDelay($attrs.blinkDelay) : false,
                cursorChar = $attrs.cursorChar || '|',
                cursor = $attrs.cursor || '<span class="blink">' + cursorChar + '</span>',
                // blinkCursor = typeof $attrs.blinkCursor !== 'undefined' ? $attrs.blinkCursor === 'true' : true,
                currentText,
                textArray;
                // running,

            if ($scope.text) {
                if ($scope.text instanceof Array) {
                    textArray = $scope.text;
                    currentText = textArray[0];
                } else {
                    currentText = $scope.text;
                }
            }
            if (typeof $scope.start === 'undefined' || $scope.start) {
                typewrite();
            }

            function typewrite() {
                timer = $timeout(function () {
                    updateIt($element, 0, 0, currentText);
                }, initialDelay);
            }

            function updateIt(element, charIndex, arrIndex, text) {
                var delay,
                    isPauseChar;

                if (charIndex <= text.length) {

                  element.html(text.substring(0, charIndex) + cursor);

                  charIndex++;

                  isPauseChar = text.charAt(charIndex-2);

                  delay = (isPauseChar === ' ' ||
                           isPauseChar === ',' ||
                           isPauseChar === ';' ||
                           isPauseChar === '.' ||
                           isPauseChar === '-' ||
                           isPauseChar === ':' ||
                           isPauseChar === '!' ||
                           isPauseChar === '?') ? pause : typeDelay;

                  timer = $timeout(function () {
                      updateIt(element, charIndex, arrIndex, text);
                  }, delay);
                  return;
                } else {
                    charIndex--;
                    // check if it's an array
                    if (textArray && arrIndex < textArray.length - 1) {
                        timer = $timeout(function () {
                            cleanAndRestart(element, charIndex, arrIndex, textArray[arrIndex]);
                        }, initialDelay);
                    } else {
                        if ($scope.callbackFn) {
                            $scope.callbackFn();
                        }
                    }
                }
            }

            function cleanAndRestart(element, charIndex, arrIndex, currentText) {
                if (charIndex > 0) {
                    currentText = currentText.slice(0, -1);
                    // element.html(currentText.substring(0, currentText.length - 1) + cursor);
                    element.html(currentText + cursor);
                    charIndex--;
                    timer = $timeout(function () {
                        cleanAndRestart(element, charIndex, arrIndex, currentText);
                    }, eraseDelay);
                    return;
                } else {
                    arrIndex++;
                    currentText = textArray[arrIndex];
                    timer = $timeout(function () {
                        updateIt(element, 0, arrIndex, currentText);
                    }, typeDelay);
                }
            }

            function getTypeDelay(delay) {
                if (typeof delay === 'string') {
                    return delay.charAt(delay.length - 1) === 's' ? parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
                } else {
                    return false;
                }
            }

            function getAnimationDelay(delay) {
                if (typeof delay === 'string') {
                    return delay.charAt(delay.length - 1) === 's' ? delay : parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
                }
            }

            $scope.$on('$destroy', function () {
                if (timer) {
                    $timeout.cancel(timer);
                }
            });

            // $scope.$watch('start', function (newVal) {
            //     if (!running && newVal) {
            //         running = !running;
            //         typewrite();
            //     }
            // });
        }

        return {
            restrict: 'A',
            link: linkFunction,
            scope: {
                text: '=',
                callbackFn: '&',
                start: '='
            }
        };

    }]);