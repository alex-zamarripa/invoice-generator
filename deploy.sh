#!/bin/bash

echo "Deploying to GitHub Pages..."
git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote set-url origin "https://${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}"
git fetch
git checkout -b gh-pages origin/gh-pages || git checkout --orphan gh-pages
rm -rf ./*
cp -r ./build/* .
git add -f .
git commit -m "Deploy to GitHub Pages"
git push -f origin gh-pages
echo "Deployment successful!"