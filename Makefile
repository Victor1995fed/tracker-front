.PHONY:install
install:
		npm i && npm audit fix;

.PHONY:run
run:install
		npm run dev

.PHONY:dev
dev:
		npm run dev

.PHONY:build
build:
		npm run build

