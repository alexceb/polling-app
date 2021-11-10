## Getting Started

** For development **
If you want to add a connection to your existing database, create `.env.development` file and add this:

```yaml
# .env.development
MONGO_DB_URI="mongodb+srv://admin:<password>@<Database path>?retryWrites=true&w=majority"
```

Install dependecies:

```bash
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Docker registry

First of all build your docker image

```yaml
docker build . -t <docker_user>/<app_name> --build-arg ARG_MONGO_DB_URI="YOUR_MONGO_DB_URI"
```

Then run your image to check if it's working properly

```yaml
docker run -p 3000:3000 <docker_user>/<app_name>
```

Push your tag to the registry

```yaml
docker push alexceb/polling-app:latest
```
