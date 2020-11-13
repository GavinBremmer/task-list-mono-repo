# Task List Mono Repo

## Folders

  - `apps`: Applications that customers will interact with (ie. Website, Mobile App, Downloadable Application)
  - `services`: Supporting Servers and Job Runners
  - `packages`: NPM Packages that our apps and services use internally

## React Web Application @`apps/web-app`

This is the application available through the browser. It accesses the `crud-server` service.

## Task List CRUD Server @`services/crud-server

This service provides a REST API to create tasks, list tasks, update and delete tasks.