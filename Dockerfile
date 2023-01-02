FROM node

MAINTAINER advaitgokhale

RUN mkdir -p /usr/src/todolistapp
WORKDIR /usr/src/todolistapp
COPY package.json /usr/src/todolistapp

RUN npm cache verify
RUN npm install

COPY . /usr/src/todolistapp

EXPOSE 3000

CMD ["npm" ,"start"]
