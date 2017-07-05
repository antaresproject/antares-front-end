/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Global
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/


// $(function() {
//     'use strict';

//     APP.modal.init({

//         element: '.test-modal',
//         title: 'Test Title',
//         buttons: {
//             Confirm: {
//                 type: 'primary',
//                 action: function() {
//                     alert('action1');
//                     $.modal.close();
//                 }
//             },
//             Cancel: {
//                 type: 'default',
//                 action: function() {
//                     $.modal.close();
//                 }
//             },
//             Abort: {
//                 type: 'red',
//                 action: function() {
//                     $.modal.close();
//                 }
//             }
//         }
//     });

//     //forms demo
//     setTimeout(function() {
//         // $('[data-init="true"]').trigger('click');
//         // $('[data-init="true"]').find('.selectivity-input').trigger('click');

//         $('.inline-forms .form-block .icheckbox_billevo:last-of-type').addClass('hover');
//         $('.inline-forms .form-block .iradio_billevo:last-of-type').addClass('hover');
//         $('.mod [data-slider] .ui-slider-handle').css('left', '40%');
//     }, 500);


// });


function animeAnimation() {

    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    var ff = navigator.userAgent.indexOf('Firefox') > 0;
    var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
    if (iOS) document.body.classList.add('iOS');

    var fireworks = (function() {

        var getFontSize = function() {
            return parseFloat(getComputedStyle(document.documentElement).fontSize);
        }

        var canvas = document.querySelector('.billevo-experiments');
        var ctx = canvas.getContext('2d');
        var numberOfParticules = 34;
        var distance = 350;
        var x = 0;
        var y = 0;
        var animations = [];

        var setCanvasSize = function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        var updateCoords = function(e) {
            x = e.clientX || e.touches[0].clientX;
            y = e.clientY || e.touches[0].clientY;
        }

        var colors = ['#02a8f3', '#30343d', '#fff9c4', '#00d24c'];

        var createCircle = function(x, y) {
            var p = {};
            p.x = x;
            p.y = y;
            p.color = colors[anime.random(0, colors.length - 1)];
            p.color = '#FFF';
            p.radius = 0;
            p.alpha = 1;
            p.lineWidth = 6;
            p.draw = function() {
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                ctx.lineWidth = p.lineWidth;
                ctx.strokeStyle = p.color;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
            return p;
        }

        var createParticule = function(x, y) {
            var p = {};
            p.x = x;
            p.y = y;
            p.color = colors[anime.random(0, colors.length - 1)];
            p.radius = anime.random(getFontSize(), getFontSize() * 2);
            p.draw = function() {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            return p;
        }

        var createParticles = function(x, y) {
            var particules = [];
            for (var i = 0; i < numberOfParticules; i++) {
                var p = createParticule(x, y);
                particules.push(p);
            }
            return particules;
        }

        var removeAnimation = function(animation) {
            var index = animations.indexOf(animation);
            if (index > -1) animations.splice(index, 1);
        }

        var animateParticules = function(x, y) {
            setCanvasSize();
            var particules = createParticles(x, y);
            var circle = createCircle(x, y);
            var particulesAnimation = anime({
                targets: particules,
                x: function(p) {
                    return p.x + anime.random(-distance, distance); },
                y: function(p) {
                    return p.y + anime.random(-distance, distance); },
                radius: 0,
                duration: function() {
                    return anime.random(1200, 1800); },
                easing: 'easeOutExpo',
                complete: removeAnimation
            });
            var circleAnimation = anime({
                targets: circle,
                radius: function() {
                    return anime.random(getFontSize() * 8.75, getFontSize() * 11.25); },
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: function() {
                        return anime.random(400, 600); }
                },
                duration: function() {
                    return anime.random(1200, 1800); },
                easing: 'easeOutExpo',
                complete: removeAnimation
            });
            animations.push(particulesAnimation);
            animations.push(circleAnimation);
        }

        var mainLoop = anime({
            duration: Infinity,
            update: function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                animations.forEach(function(anim) {
                    anim.animatables.forEach(function(animatable) {
                        animatable.target.draw();
                    });
                });
            }
        });

        document.addEventListener(tap, function(e) {
            updateCoords(e);
            animateParticules(x, y);
        }, false);

        window.addEventListener('resize', setCanvasSize, false);

        return {
            boom: animateParticules
        }

    })();


};



if ($('.page-demo').length) {
    animeAnimation();
}
