const path = require('path')
const { exec, spawn } = require('child_process')

const execAnd = (command_string, callback) => {
  exec(command_string, (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      return
    }
    console.error(stderr)
    callback(stdout)
  })
}

const newDraft = () => {
  let draft_name = process.argv.slice(2).join('_') + '.md'
  let draft_path = path.resolve(__dirname, '../content/posts/', draft_name)
  execAnd(`hugo new ${draft_path}`, console.log)
  devServer()
  execAnd(`hugo list all | grep ${draft_name}`, (data) => {
    let ary = data.split(',')
    let permalink = new URL(ary[ary.length - 1])
    permalink.host = "localhost:1313"
    permalink.protocol = 'http'
    execAnd(`open ${permalink}`, console.log)
  })
}

const devServer = () => { 
  exec('ps', (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      return
    }
    let data = stdout
    if (data.includes('hugo server')) {
      console.log("hugo server already running... assuming it's serving the correct site, lol")
    } else {
      console.log("starting dev server...")
      dev = spawn('yarn', ['dev'])
      dev.stdout.on('data', (data) => {
        console.log(data.toString())
      })
      dev.stderr.on('data', (data) => {
        console.log(data.toString())
      })
      dev.on('exit', (code) => {
        console.log(`exited with code ${code}`)
      }) 
    }
  })
}

newDraft()
