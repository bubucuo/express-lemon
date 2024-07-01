var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
// ! `__dirname`是在Node.js中的一个全局变量，表示当前模块的目录路径。
// ! 它总是指向当前模块的绝对路径，而不受执行Node.js命令的当前工作目录的影响。
// ! 使用`__dirname`可以方便地获取当前模块所在的目录路径，常用于构建文件路径或加载模块。
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// app.set("case sensitive routing", true); //启用后，"/Foo" 和 "/foo" 将被视为不同的路径。

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
