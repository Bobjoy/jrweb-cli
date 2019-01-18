const fs = require('fs')
const path = require('path')
const config = require('../.jrweb')

const exists = fs.existsSync

function writeConf(confPath, conf) {
	const json = JSON.stringify(conf||{}, null, 2);
	fs.writeFileSync(confPath, json, (err) => {
		if(err){
			return console.error(err);
		}
		console.log('----------写配置成功-------------');
	});
}

function genConfig(dir, conf) {
	const confPath = path.join(dir, '.jrweb.json');
	if (!exists(confPath)) {
		writeConf(confPath, conf);
	} else {
		fs.readFileSync(confPath, function(err, data){
			if(err){
				return console.error(err);
			}
			writeConf(confPath, conf);
		});
	}
}

function setConfig(key, value) {
	config[key] = value;
	genConfig(config);
}

function getConfig(key) {
	return config[key]
}

module.exports = {
	genConfig,
	getConfig,
	setConfig
};
