# Install dependencies only when needed
FROM node:16-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "dev"]
