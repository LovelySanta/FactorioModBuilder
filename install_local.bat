
@echo off
if not "%1" == "max" start /MAX cmd /c %0 max & exit/b

cd %CD%
echo.

echo == Deleting old install (if existing) ==
del /Q "package-lock.json" >nul 2>&1
rmdir /s /q "%CD%\node_modules\" >nul 2>&1
echo.

echo == Installing gulp-clean ==
cmd /c npm install --save-dev "gulp-clean"
echo.
echo == Installing gulp-debug ==
cmd /c npm install --save-dev "gulp-debug"
echo.
echo == Installing gulp-zip ==
cmd /c npm install --save-dev "gulp-zip"
echo.
echo == Installing gulp ==
cmd /c npm install -g "gulp"
cmd /c npm install --save-dev "gulp"
echo.

pause
