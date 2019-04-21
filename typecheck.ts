import * as ts from 'typescript'

const compilerOptions = {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
}

export const check = (
  fileNames: string[],
  options: ts.CompilerOptions = compilerOptions
) => {
  let program = ts.createProgram(fileNames, options)
  let emitResult = program.emit()
  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)
  console.log('checking files', fileNames)
  const diagnostics = allDiagnostics.filter(diagnostic => diagnostic.file)
  diagnostics.forEach(diagnostic => {
    let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start!
    )
    let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
    console.log(
      `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
    )
  })

  //let exitCode = emitResult.emitSkipped ? 1 : 0
  //console.log(`Process exiting with code '${exitCode}'.`)
  //process.exit(exitCode)
  return diagnostics
}

//check(process.argv.slice(2), {
//  noEmitOnError: true,
//  noImplicitAny: true,
//  target: ts.ScriptTarget.ES5,
//  module: ts.ModuleKind.CommonJS,
//})
