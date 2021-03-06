#!/usr/bin/env node

function range(val) {
    return val.split('..').map(Number);
}

function list(val) {
    return val.split(',');
}

function collect(val, memo) {
    memo.push(val);
    return memo;
}

function increaseVerbosity(v, total) {
    return total + 1;
}

function curPath(value) {
    console.log(path.resolve(value));
}
var program = require('commander');
program
    .version('1.2.3.180505')
    .usage('[options] <file ...>')
    .option('-i, --integer <n>', 'An integer argument', parseInt)
    .option('-f, --float <n>', 'A float argument', parseFloat)
    .option('-r, --range <a>..<b>', 'A range', range)
    .option('-l, --list <items>', 'A list', list)
    .option('-o, --optional [value]', 'An optional value')
    .option('-c, --collect [value]', 'A repeatable value', collect, [])
    .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
    .on('--help', function () {
        console.log('Description:');
        console.log();
        console.log('    @Version: 1.2.3.180505');
        console.log('    @Author: richliu1023');
        console.log('    @Email richliu1023@gmail.com');
        console.log('    @Github https://github.com/RichLiu1023');
        console.log();
    });


var tsx = require('./tool/ImagesConvertTsx.js');
var e2j = require('./tool/ExcelToJson.js');
var path = require('path');
var webServer = require('./tool/webServer.js');
var dir_tree = require('./tool/DirTree.js');
var exml2tsDir = require('./tool/exmlToTsDir.js');
var v2index = require('./tool/v2index.js');
var FileTool = require('./tool/FileTool.js');

program.command('path <path>').action(curPath)
    .description('查看当前命令执行路径，可使用 ./ ../相对路径');
program.command('tsx <path>').action(tsx.setup)
    .description('tsx格式转换工具，path及子目录中png图片转换Tiled支持的tsx文件');
program.command('e2j <type> <path>').action(e2j.setup)
    .description('type（0 object格式，1 array格式），表格文件UTF-8 转换 Json 工具，在当前目录下输出 *.json 文件');
program.command('ws [port]').action(webServer.setup)
    .description('开启一个静态服务器，静态目录为当前命令执行目录，设定端口，默认为 9527');
program.command('dt [path]').action(dir_tree.setup)
    .description('打印目录的文件结构');
program.command('e2ts <path> <outpath> [isMergin] [extendObj] [namespace]').action(exml2tsDir.setup)
    .description('白鹭 EXML 转换为 TS,批量、合并(extendObj为Panel继承的对象,namespace为Panel的域名)');
program.command('v2index <path>').action(v2index.setup)
    .description('版本附加工具，用于生成版本号．解析egret的manifest文件');
program.command('filetool <type> -l xx,xx,xx').action(FileTool.setup)
    .description(' 1 crc32重命名 2 复制文件或目录 3 删除文件或目录 4 创建目录');
program.parse(process.argv);
