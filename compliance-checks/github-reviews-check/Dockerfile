FROM golang:latest AS build-env
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
ENV CGO_ENABLED=0
ENV GOOS=linux
RUN go build -a -installsuffix cgo -o main .  

FROM scratch
COPY --from=build-env /app/main /
CMD ["/main"]
