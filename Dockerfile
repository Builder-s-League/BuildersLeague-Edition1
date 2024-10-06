ARG NODE_VERSION="20"
ARG ALPINE_VERSION="3.20"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build-stage

# Set the working directory for all build
WORKDIR /usr/src/app

# Copy dep
COPY package*.json ./

# install dependencies in CI mode (production deps install)
RUN npm i

# Copy the rest of the application code to the working directory
#COPY . .

# build the next app
RUN npm run build

# remove dev dependencies
#RUN npm prune --production

# New Stage to build prod
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /src/dist/ .
CMD ["node", "app.js"]
