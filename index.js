var Jimp = require('jimp')
var fs = require('fs')
var path = require('path')
var readline = require('readline')

// A4 format (210x297) in pixels:
// 72pxls/inch: 595x841
// 150pxls/inch: 1240x1754
// 300pxls/inch: 2480x3508

/*process.argv.slice(2).forEach(function (val, index, array) {
	  console.log(index + ': ' + val);
});*/

var target = '.\\target'
if (!fs.existsSync(target)) {
	fs.mkdirSync(target)
}

var wordsPath = '.\\src\\words.txt'

if (!fs.existsSync(wordsPath)) {
	console.error(wordsPath + ' does not exist')
	return
}

var lineReader = readline.createInterface({
	input: fs.createReadStream(wordsPath)
})


var i = 0
var page, pageId, savePath
lineReader.on('line', function(line) {
	if (i % 9 === 0) {
		pageId = Math.floor(i / 9) + 1
		page = createNewPage(pageId)
		savePath = path.join(target, pageId + '.jpg')
		page.write(savePath)
	}

	console.log('Creating card for ' + line)
	i++

})

function createNewPage(pageId) {
	var page = new Jimp(1240, 1754, 0xFFFFFFFF, function(err, image) {
		if (err) {
			console.error(err)
		}
	})

	return page
}
