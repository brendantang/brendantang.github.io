build:
	hugo --config config.yml --enableGitInfo --minify --verbose

dev: 
	make -j 2 server browser

server:
	hugo server --bind=0.0.0.0 --baseURL=http://0.0.0.0:1313 --config config.yml --disableFastRender --enableGitInfo -D -F -v

browser: 
	open 'http://localhost:1313/'

push:
	git add public 
	git commit -m "Commit from `make push`" 
	git push

deploy: build push
