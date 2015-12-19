FROM adexchangegrp/node

ENV NODE_ENV development

COPY . /src
WORKDIR /src
RUN git remote set-url origin git@github.com:AdExchangeGrp/aeg-sdk.git
RUN npm install