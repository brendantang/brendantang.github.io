build:
	hugo --config config.yml --enableGitInfo --minify --verbose

dev: 
	make -j 2 server browser

server:
	hugo server --config config.yml --disableFastRender --enableGitInfo -D -F -v

browser: 
	open 'http://localhost:1313/'

push:
	# Push changes to github
	git push origin master

	# Deploy to dokku
	touch './public/.static'
	tar c ./public $* | dokku tar:in brendantang

deploy: build push
