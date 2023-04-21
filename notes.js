const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.find((i)=>i.title===title)
    
    if(duplicateNotes){
        console.log(chalk.red("Note title taken!"))
    }else{
        notes.push({
        title: title,
        body: body
        }) 
        saveNotes(notes)
        console.log(chalk.green("Notes added!"))
    }
}

const removeNotes = function(title){
    // try{
    //     const notesBuff = fs.readFileSync('notes.json')
    //     const notesStr = notesBuff.toString()
    //     const notesJson = JSON.parse(notesStr)
        
    //     const newNotes = notesJson.filter(i=>i.title!==title)
    //     const newNotesStr = JSON.stringify(newNotes)
    //     fs.writeFileSync('notes.json',newNotesStr)
    //     console.log(`Removed ${title} successfully!`)
    // }catch(e){
    //     console.log("There are no notes to remove! ")
    // }
    const notes = loadNotes()
    const newNotes = notes.filter(i=>i.title!==title)
    // const newNotesStr = JSON.stringify(newNotes)
    // fs.writeFileSync('notes.json',newNotesStr)
    saveNotes(newNotes)
    if(newNotes.length === notes.length){
        console.log(chalk.red("There are no notes to remove!"))
    }else{
        console.log(chalk.green(`Removed ${title} successfully!`))
    }
}

const saveNotes = (notes)=>{
    const notesStr = JSON.stringify(notes)
    fs.writeFileSync('./notes.json',notesStr )
}

const loadNotes = ()=>{
    try{
        const notesBuffer = fs.readFileSync('./notes.json')
        const notesStr = notesBuffer.toString()
        const notes = JSON.parse(notesStr)
        return notes
    }catch(e){
        return []
    }  
}

const listNotes = () =>{
    console.log(chalk.inverse.white("Listing your Notes"))
    const notes = loadNotes()
    notes.forEach((i)=>{
        console.log(chalk.inverse.green(i.title))
    })
}

const readNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((i)=>i.title===title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse("Notes not found"))
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNotes,
    listNote : listNotes,
    readNote: readNote
}