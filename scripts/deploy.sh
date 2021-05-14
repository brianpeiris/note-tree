rm -rf public/build
npm run build

pushd public
rm -rf .git
git init
git add .
git commit -m 'deploy'
git remote add origin https://github.com/brianpeiris/note-tree
git push -u origin --force master:gh-pages
popd

