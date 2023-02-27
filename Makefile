bootstrap-local:
	@echo "==============================Bootstrapping server local==============================" 
	npm i && npm run start:crypto -- -h
