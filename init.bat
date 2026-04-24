npx -y create-next-app@latest temp-app --js --eslint --tailwind --src-dir=false --app --import-alias="@/*" --yes
xcopy temp-app\* . /E /H /C /I /Y
rmdir temp-app /S /Q
