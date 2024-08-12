#!/bin/sh
if [ -n "$(git status --porcelain)" ]; then
  echo "GIT: there are changes";
else
  yarn build
  git add .
  git commit -m "build"
  git push
  ssh arch@bressani.dev "sudo rm -rf /home/arch/www/astrologie-traditionnelle.net-react && cd /home/arch/www && git clone git@github.com:stephaneworkspace/astrologie-traditionnelle.net-react.git"
  echo "done"
fi