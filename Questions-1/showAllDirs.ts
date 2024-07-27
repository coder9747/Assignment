import { promises as fs } from 'fs';
import * as path from 'path';
import { MyQueue, Queue } from './queue';
async function showDirAsyncDFS(dirPath: string, level: number) {

  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      console.log("At Level " + level);
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        console.log(`Dir ${filePath}`);
        await showDirAsyncDFS(filePath, level + 1);
      }
      else {
        console.log(`File ${filePath}`);
      }
    }
  } catch (error) {
    console.error("Failed To Show File");
  }
}

async function showDirAsyncBFS(dirPath: string) {
  const q = new MyQueue<string>();
  let level = 0;
  q.push(dirPath);
  while (!q.empty()) {
    console.log(`At Level ${level}`);
    let size = q.size();
    while (size--) {
      const filePath = q.pop();
      if (filePath) {
        try {
          const files = await fs.readdir(filePath);
          for (const file of files) {
            const childFilePath = path.join(filePath, file);
            const stats = await fs.stat(childFilePath);
            if (stats.isDirectory()) {
              console.log(`Path ${childFilePath}`);
              console.log(`Dir : ${file}`);
              q.push(childFilePath);
            }
            else {
              console.log(`Path ${childFilePath}`);
              console.log(`File : ${file}`);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    level++;
  }

}


const directoryPath: string = process.cwd(); //you can give any path here


async function show() {
  console.log('===================DFS==============');
  await showDirAsyncDFS(directoryPath, 0);
  console.log('===================BFS==============');
  await showDirAsyncBFS(directoryPath);
}

show();



