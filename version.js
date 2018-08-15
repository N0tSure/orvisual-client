const package = require('./package.json');

if (package['version']) {
	console.log(package.version);
} else {
	throw Error('package.json must contain version');
}
