npm run build

rm -rfd ../simple-wood-working-deploy/_app
rm -rfd ../simple-wood-working-deploy/products
mv ./build/* ../simple-wood-working-deploy/

cd ../simple-wood-working-deploy/
git add --a
git commit -m "deploy"
git push
