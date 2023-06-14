FROM node:18-alpine AS builder
WORKDIR /var/bot

COPY .yarn/ ./.yarn/
COPY .pnp.cjs .yarnrc.yml package.json yarn.lock ./
ARG NODE_ENV=production
RUN yarn set version stable
RUN yarn install --frozen-lockfile
RUN yarn cache clean
RUN yarn rebuild

COPY . .

RUN yarn build

# RUNNER
FROM node:18-alpine AS runner
WORKDIR /var/bot

COPY --from=builder /var/bot/dist/ ./dist
COPY --from=builder /var/bot/.pnp.cjs /var/bot/.yarnrc.yml /var/bot/package.json /var/bot/yarn.lock ./
COPY --from=builder .yarn/ ./.yarn/
RUN adduser -S bot
USER bot

ENTRYPOINT [ "yarn", "start:prod" ]
