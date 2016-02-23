/*global define*/
'use strict';

define([], function () {
    var opts = {
        lines: 13, length: 20, width: 10, radius: 30,
        corners: 1, rotate: 0, direction: 1,
        color: '#fff', speed: 1, trail: 60,
        shadow: false, hwaccel: false,
        className: 'spinner', zIndex: 2e9,
        top: '50%', left: '50%'
    };
    var spinner = new Spinner(opts);
    var spinDiv = document.getElementById('spinner');
	return {
        showLoading:function(){
            spinDiv.style.display = 'block';
            spinner.spin(spinDiv);
        },
        hideLoading:function(){
            spinDiv.style.display = 'none';
            spinner.stop();
        },
		app: {}, //router for navigate
		// What is the enter key constant?
		ENTER_KEY: 13,
		ESCAPE_KEY: 27
	};
});
