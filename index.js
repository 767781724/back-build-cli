#! /usr/bin/env node
const fs = require('fs');
const {program} = require('commander');//解析用户命令
const download = require('download-git-repo');//拉去git文件
const chalk = require('chalk');//改变输出文字颜色
const ora = require('ora');//小图标

const success = chalk.blueBright;
const error = chalk.bold.red;

// 拉取模板的地址
const templateUrl = 'direct:https://github.com/767781724/react-antd-back.git';

const changePackage = () => {
  fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
    if (err) throw err;
    let _data = JSON.parse(data.toString());
    _data.name = program.init;
    _data.version = '1.0.0';
    let str = JSON.stringify(_data, null, 4);
    fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
      if (err) throw err;
    })
  });
};

program.version('0.1.0')
  .option('-i, --init [name]', '初始化backstage项目')
  .parse(process.argv);

if (program.init && typeof program.init === "string") {
  const spinner = ora('正在拉取react-antd-bacck模板...').start();
  download(templateUrl, program.init, { clone: true }, function (err) {
    if (!err) {
      spinner.succeed(success('拉取成功'));
      // 更改 package.json 中的 name 和版本号
      changePackage()
    } else {
      spinner.fail('拉取成功');
    }
  });
} else {
  console.error(error('请在init后输入目录名'));
}