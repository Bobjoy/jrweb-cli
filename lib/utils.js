const fs = require('fs')
const path = require('path')
const exists = fs.existsSync

function writeConf(confPath, conf) {
	const json = JSON.stringify(conf||{}, null, 2);
	fs.writeFileSync(confPath, json, (err) => {
		if(err) return logger.fatal(`读取配置失败 ${confPath}`)
		console.log('----------写配置成功-------------');
	});
}

module.exports = {
	genConfig: function genConfig(dir, conf) {
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
	},
	getConfig: function getConfig(dir, done) {
		const confPath = path.join(dir, '.jrweb.json');
		fs.readFileSync(confPath, function(err, data){
			done(err, JSON.parse(data))
		});
	}
};
