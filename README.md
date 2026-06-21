[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/yxSxf8qT)


# Hovedforloebsprojekth2

This repository contains three separate parts:

- `backend/` - a .NET 10 Web API that uses MongoDB.
- `frontend/` - a standalone Next.js app.
- `data-scheduler/` - a Python scheduler package for data handling.

> Note: The frontend is currently independent from the backend and data scheduler. The scheduler is also not configured to fetch data automatically.

## Repository Structure

- `backend/`
  - ASP.NET Core Web API project
  - MongoDB configuration in `appsettings.json`
  - Swagger/OpenAPI enabled
- `frontend/`
  - Next.js application with its own package and runtime
  - Separate from `backend/` and `data-scheduler/`
- `data-scheduler/`
  - Python package defined by `pyproject.toml`
  - Not currently wired into the Docker compose setup or automated fetch flows
- `docker-compose.yml`
  - Starts `frontend`, `backend`, and `mongo`
  - `scheduler` service is commented out

## Important Notes

- `frontend/` does not depend on `backend/` or `data-scheduler/`.
- `data-scheduler/` is not set up for automatic data fetching at this time.
- If you want the scheduler to run, it must be started manually or integrated separately.

## Running the Project

### With Docker Compose

From the repository root:

```bash
docker compose up --build
```

This will start:

- `frontend` on port `3000`
- `backend` on port `8080`
- `mongo` on port `27017`

### Backend

In `backend/`, the API reads MongoDB settings from `appsettings.json`.

To run locally without Docker:

```bash
cd backend
dotnet run
```

### Frontend

In `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

### Data Scheduler

The scheduler is a Python project and must be run manually.

```bash
cd data-scheduler
python -m pip install -r requirements.txt
# or install from pyproject.toml
python -m pip install python-dotenv[cli] requests rich
```

Then run the scheduler script as needed.

## Docker Compose Notes

The root `docker-compose.yml` currently includes:

- `frontend`
- `backend`
- `mongo`

The scheduler service is currently commented out and not active.

## Development Notes

- Backend: `.NET 10`, `MongoDB.Driver`, `NSwag.AspNetCore`
- Frontend: `Next.js`, `React`, `Prisma`, `Tailwind`, `TypeScript`
- Scheduler: `Python 3.12+`, `python-dotenv`, `requests`, `rich`

## Git Branching Reminder

Use standard branch flow if you want to merge changes:

```bash
git checkout prod
git merge dev
git push origin prod
```

or

```bash
git checkout main
git merge dev
git push origin main
```
