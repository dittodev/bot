import { glob } from 'glob'
import path from 'path'

async function deleteCachedFile (file: string): Promise<void> {
  const filePath = path.resolve(file)
  if (require.cache[filePath] != null) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete require.cache[filePath]
  }
}

export async function loadFiles (dirName: string): Promise<string[]> {
  try {
    const files = await glob(
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      path.join(__dirname, '..', dirName, '**/*.{js,ts}')
    )
    const validFiles = files.filter(
      file => path.extname(file) === '.js' || '.ts'
    )
    await Promise.all(validFiles.map(deleteCachedFile))
    return validFiles
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`error while loading files from ${dirName}: ${err}`)
    throw err
  }
}
