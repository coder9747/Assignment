"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = __importStar(require("path"));
const queue_1 = require("./queue");
function showDirAsyncDFS(dirPath, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs_1.promises.readdir(dirPath);
            for (const file of files) {
                console.log("At Level " + level);
                const filePath = path.join(dirPath, file);
                const stats = yield fs_1.promises.stat(filePath);
                if (stats.isDirectory()) {
                    console.log(`Dir ${filePath}`);
                    yield showDirAsyncDFS(filePath, level + 1);
                }
                else {
                    console.log(`File ${filePath}`);
                }
            }
        }
        catch (error) {
            console.error("Failed To Show File");
        }
    });
}
function showDirAsyncBFS(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const q = new queue_1.MyQueue();
        let level = 0;
        q.push(dirPath);
        while (!q.empty()) {
            console.log(`At Level ${level}`);
            let size = q.size();
            while (size--) {
                const filePath = q.pop();
                if (filePath) {
                    try {
                        const files = yield fs_1.promises.readdir(filePath);
                        for (const file of files) {
                            const childFilePath = path.join(filePath, file);
                            const stats = yield fs_1.promises.stat(childFilePath);
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
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
            level++;
        }
    });
}
const directoryPath = process.cwd(); //you can give any path here
function show() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('===================DFS==============');
        yield showDirAsyncDFS(directoryPath, 0);
        console.log('===================BFS==============');
        yield showDirAsyncBFS(directoryPath);
    });
}
show();
