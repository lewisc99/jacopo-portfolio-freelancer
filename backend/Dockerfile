FROM openjdk:11-jre-slim-buster

VOLUME  /tmp
# cd /opt/app
WORKDIR /opt/app
EXPOSE 8080
COPY /target/jacoco.jar app.jar
# java -jar /opt/app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
