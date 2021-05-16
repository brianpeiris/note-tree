rm -rf public
npm run build

pushd public
rm -rf .git
git init
git checkout -b master
git add .
git commit -m 'deploy'
git remote add origin git@github.com:brianpeiris/note-tree
git push -u origin --force master:gh-pages
popd
