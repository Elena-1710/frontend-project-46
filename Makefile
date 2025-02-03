install:
	npm ci
publish:
	npm publish --dry-run
help:
	node bin/gendiff.js -h
runStylish:
	gendiff './__fixtures__/file1.json' './__fixtures__/file2.json' --format stylish

runPlain:
	gendiff './__fixtures__/file1.json' './__fixtures__/file2.json' --format plain

runJson:
	gendiff './__fixtures__/file1.json' './__fixtures__/file2.json' --format json

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --coverage
test-watch:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --watch
test:
	NODE_OPTIONS=--experimental-vm-modules  npx jest
