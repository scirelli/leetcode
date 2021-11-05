SHELL:=/usr/bin/env bash

.PHONY: all
all: test

.PHONY: vvtest
vvtest:
	@pipenv run pytest --capture=no -vv

.PHONY: test
test:
	@pipenv run pytest
