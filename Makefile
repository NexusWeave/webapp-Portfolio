.PHONY: all backend frontend clean test-reports

all: backend frontend

backend:
	$(MAKE) -C backend

frontend:
	$(MAKE) -C frontend

clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean

test-reports:
	$(MAKE) -C backend test-reports
	$(MAKE) -C frontend test-reports
