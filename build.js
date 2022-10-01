const Asciidoctor = require('asciidoctor')
const asciidoctor = Asciidoctor()

const adocFile = process.argv[2]
if (!adocFile) {
	console.error(`Usage: ${process.argv[1]} adoc_file`)
	process.exit(1)
}

console.log(`converting file: '${adocFile}'`)
asciidoctor.convertFile(adocFile, { safe: 'safe' })
