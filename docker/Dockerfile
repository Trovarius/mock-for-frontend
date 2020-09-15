FROM adoptopenjdk:openj9
USER root
RUN apt-get update \
    && apt-get install -y build-essential curl apt-transport-https libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Install latest NPM and Yarn
RUN npm install -g npm@latest mock-ff
