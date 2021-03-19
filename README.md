# electron-issue-load-url

Related to the issue:
https://github.com/electron/electron/issues/28275

## Init Project
```bash
npm install
```

## To reproduce the issue (Windows required)
```bash
npm run build
```

There are 2 files created in the build folder:
- electron-load-url-issue 1.0.0.exe
- electron-load-url-issue 1.0.0.scr


- The first one is a basic executable and does not cause any problems under Windows.

- The second one is the same file renamed in .scr allowing to use the application as a screensaver.
To activate the screen saver in Windows. (right click on the .scr file then "Install")

All application logs are written to the following file :  
**_%USERPROFILE%\AppData\Roaming\electron-load-url-issue\logs_**


### Summary of the problem:

When the screensaver starts, the application gets stuck.  
The win.loadURL API promise never resolves, and the "ready-to-show event" is never triggered.

Below the execution logs of the application :


First log with the .exe file
```log
[2021-03-19 13:26:55.685] [info]  ===> ARGV [
'C:\\Users\\test\\AppData\\Local\\Temp\\1pyXwBn2dZyrhLMC5PsVCLahtXC\\electron-load-url-issue.exe'
]
[2021-03-19 13:26:55.738] [info]  after whenReady()
[2021-03-19 13:26:55.744] [info]  createWindow() start
[2021-03-19 13:26:55.790] [info]  win.loaUrl(file://C:\Users\test\AppData\Local\Temp\1pyXwBn2dZyrhLMC5PsVCLahtXC\resources\app.asar\app/index.html)
[2021-03-19 13:26:55.962] [info]  win.loaUrl(file://C:\Users\test\AppData\Local\Temp\1pyXwBn2dZyrhLMC5PsVCLahtXC\resources\app.asar\app/index.html) promise has succeeded
[2021-03-19 13:26:55.995] [info]  win.once('ready-to-show') triggered
```

Second log with the .scr file (launched by windows in screen saver)
```log
[2021-03-19 13:31:04.664] [info]  ===> ARGV [
  'C:\\Users\\test\\AppData\\Local\\Temp\\1pyXwBn2dZyrhLMC5PsVCLahtXC\\electron-load-url-issue.exe',
  '/s'
]
[2021-03-19 13:31:04.703] [info]  after whenReady()
[2021-03-19 13:31:04.711] [info]  createWindow() start
[2021-03-19 13:31:04.751] [info]  win.loaUrl(file://C:\Users\test\AppData\Local\Temp\1pyXwBn2dZyrhLMC5PsVCLahtXC\resources\app.asar\app/index.html)
```





