FROM openjdk:11
WORKDIR usr/src
ADD ./target/multicasting-0.0.1-SNAPSHOT.jar /usr/src/multicasting-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/usr/src/multicasting-0.0.1-SNAPSHOT.jar"]
