const chalk = require('chalk')
const { argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder:{
        title:{
            description: "The title of your notes",
            demandOption: true,
            type: 'string'
        },
        body:{
            description: 'Body of your notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    description: 'Removes notes from file',
    builder:{
        title:{
            description:'Title of the note',
            demandOption: true,
            type: 'String'
        },
        body:{
            description:'Body of the note',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    description: 'List out all the files',
    handler(){
        notes.listNote( )
    }
})

yargs.command({
    command: 'read',
    description: 'reading your notes',
    builder:{
        title:{
            description:'read files titles',
            demandOption: true,
            type: 'string'
        },
        body:{
            description: 'this is the body file',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})



yargs.parse()