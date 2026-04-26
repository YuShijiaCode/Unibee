const diff = require('diff');
const fs = require('fs');
const colors = require('colors');


// 读取文件内容
const file1Content = fs.readFileSync('tmp.txt', 'utf8').toString();
const file2Content = fs.readFileSync('email.txt', 'utf8').toString();
// 创建diff
const diffOutput = diff.diffLines(file1Content, file2Content);

let differenceContent = '';
diffOutput.forEach(part => {
    const prefix = part.added ? '+' : part.removed ? '-' : '  ';
    process.stdout.write(prefix + part.value.replace(/[^\t\n\r]/g, ' '));

    if (part.added || part.removed) {
        differenceContent += part.value + '\n';
        console.log("differenceContent: "+differenceContent)
    }
});

// 将差异内容写入文件
fs.writeFileSync('difference.txt', differenceContent);

// 打印diff结果
// diffOutput.forEach((part) => {
//     // 判断每一行是否有变化
//     const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
//     process.stderr.write(part.value[color]);
// })


console.log();
