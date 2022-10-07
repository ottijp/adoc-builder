const Asciidoctor = require('asciidoctor')
const asciidoctor = Asciidoctor()
const bs = require("browser-sync").create()

const adocFile = process.argv[2]
if (!adocFile) {
	console.error(`Usage: ${process.argv[1]} adoc_file`)
	process.exit(1)
}

const convert = (file) => {
	console.log(`converting file: '${file}'`)
	asciidoctor.convertFile(adocFile, { safe: 'safe' })
}

bs.watch('.', {
  ignoreInitial: true,
  ignored: ['*.html', '.*', '.*/**/*', 'node_modules/**/*'],
}, (event, file) => {
  if (event === 'add' || event === 'change') {
    console.log(`${event} ${file}`)
    convert(adocFile)
    bs.reload()
  }
})

convert(adocFile)

bs.init({
	server: true,
  directory: true,
  startPath: adocFile.replace(".adoc", ".html"),
})
