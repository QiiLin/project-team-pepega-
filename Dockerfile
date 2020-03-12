FROM node:13

# Compile and install fresh ffmpeg from sources:
# See: https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg



# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./



# Bundle app source
COPY . .
RUN npm run install-all






EXPOSE 3000 5000
CMD npm run dev