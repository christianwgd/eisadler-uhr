const $ = require('jquery');
$(document).ready(() => {
	setInterval(() => {
		const seconds = new Date().getSeconds();
		const sdegree = (seconds * 6) - 90;
		const srotate = 'rotate(' + sdegree + 'deg)';
		$('#sec').css({'-moz-transform': srotate, '-webkit-transform': srotate});
	}, 1000);

	setInterval(() => {
		const hours = new Date().getHours();
		const mins = new Date().getMinutes();
		const hdegree = (hours * 30) + (mins / 2) - 90;
		const hrotate = 'rotate(' + hdegree + 'deg)';
		$('#hour').css({'-moz-transform': hrotate, '-webkit-transform': hrotate});
	}, 1000);

	setInterval(() => {
		const mins = new Date().getMinutes();
		const mdegree = (mins * 6) - 90;
		const mrotate = 'rotate(' + mdegree + 'deg)';
		$('#min').css({'-moz-transform': mrotate, '-webkit-transform': mrotate});
	}, 1000);
});
