const fs = require('fs')
const path = require('path')
const figlet = require('figlet')
const exists = fs.existsSync

function writeConf(confPath, conf) {
	const json = JSON.stringify(conf||{}, null, 2);
	fs.writeFileSync(confPath, json, (err) => {
		if(err) return logger.fatal(`读取配置失败 ${confPath}`)
		console.success(`写入配置成功 ${confPath}`);
	});
}

module.exports = {
	printLogo: function(done = () => {}) {
		figlet('JRSOFT', function(err, data) {
			if (!err) {
				console.log(data)
				console.log()
			}
			done()
		})
	},
	genConfig: function genConfig(dir, conf) {
		const confPath = path.join(dir, '.jrweb.json');
		if (!exists(confPath)) {
			writeConf(confPath, conf);
		} else {
			fs.readFile(confPath, (err, data) => {
				if(err){
					return console.error(err);
				}
				writeConf(confPath, conf);
			});
		}
	},
	getConfig: function getConfig(dir, done) {
		const confPath = path.join(dir, '.jrweb.json');
		fs.readFile(confPath, (err, data) => {
			done(err, JSON.parse(data))
		});
	}
};
