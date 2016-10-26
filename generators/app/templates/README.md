### 1, 安装

检出项目后，你需要首先[安装node.js]

然后进行一下步骤的安装以完成编译环境的安装:

1, 安装SASS, Compass
如果你没有Ruby运行时环境，去这里下载[安装ruby].
```sh
$ gem install sass compass
```
2, 安装Grunt & Bower
```sh
$ npm install -g grunt grunt-cli bower
```
3, 安装项目依赖
```sh
npm install && bower install
```

### 2, 运行
运行以下命令会自动启动node.js并且在默认浏览器中打开首页，并且自动监听源文件的任何修改，然后自动编译并刷新页面(依赖于[livereload]):
```sh
grunt serve
```

### 3, 打包
```sh
npm install
bower --allow-root install
grunt build -f -v
```