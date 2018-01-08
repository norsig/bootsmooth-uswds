// Main Javascipt Source
// Example class and DOMContentLoaded listener

import uswds from "../node_modules/uswds/src/js/start";

window.uswds = uswds;

class App {
	
	constructor(opts = {}) {
		console.log('Hello World!');
	}
	
};

// create new App object
let $bs = new App();
window.$bs = $bs;
