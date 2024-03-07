ARG NODE_VERSION
# if want to upgrade node version, use `pnpm maintenance:upgrade-node` instead
FROM node:${NODE_VERSION}

ARG GROUPID
ARG USERID
# if the group already exists, change it to a different groupid and then continue
RUN if getent group $GROUPID >/dev/null; then groupmod -g 3000 "$(getent group $GROUPID | sed -e 's/:.*//')"; fi
# syncronize the user and group id with the host
RUN groupmod -g $GROUPID node && usermod -u $USERID -g $GROUPID node

WORKDIR /app

RUN corepack enable
