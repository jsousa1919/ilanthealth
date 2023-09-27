# Ilanthealth Book Repository

## Prerequisites

### System
install latest versions according to your system specs

pip
pipenv
npm

### Environment

Install FastAPI requirements

```
pipenv install
```

Or specifically:

```
pipenv install fastapi
pipenv install "uvicorn[standard]"
pipenv install requests
```

Install NPM packages
```
npm install
```

Or specifically install NextJS and Tailwind requirements

```
npm install next@latest react@latest react-dom@latest&__overlay react-redux redux-thunk axios
npm install -D tailwindcss
```

## Execution

### Tailwind css

Build with:

```
tailwindcss -i ./style/input.css -o ./public/ilanhealth.css
```

Optionally for dev environments, watch css/nextjs files:

```
npm run watchtw
```

### NextJS web application

For dev environments, watch python files:

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


