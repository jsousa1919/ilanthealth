# Ilanthealth Book Repository

## Prerequisites

### System
install latest versions according to your system specs

pip
pipenv
npm

### Environment

```
pipenv install fastapi
pipenv install "uvicorn[standard]"
npm install next@latest react@latest react-dom@latest&__overlay
```

## Execution

### NextJS web application

For development environments:

```
npm run dev
```

For production environments:

```
npm run build
npm run start
```

### FastAPI application

```
pipenv run uvicorn main:app
```


