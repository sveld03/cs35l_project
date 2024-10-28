# UCLA Bruin "Gym" Activity Level API

This is an API built on the data provided by [UCLA's Connect2Concepts.com](https://connect2concepts.com/connect2/?type=bar&facility=802&key=73829a91-48cb-4b7b-bd0b-8cf4134c04cd) data that scrapes the HTML content and puts it into JSON format.

Written by Andrew Duong.
Again, the data was retrieved through UCLA and Connect2Concepts directly.

# Run the application
    go run .

# Build
    go build main.go

## Structure
```
├── bruingym-activity-level
│   ├── .env              // Transfercamp Data
│   ├── build.sh         /// Build shell script
│   └── main.go
```

# API
Endpoint: http://localhost:1337

/facility
* 'GET': Get the facility data

`Query`
`facility`

Possible `facility` query inputs
`jwc` `bfit` `krc`

Example
Get the facility data for a specific facility such as the John Wooden Center

`GET /facility`
    curl "http://localhost:1337/facility?facility=jwc

### Response
    Content-Type: application/json
    [{"name":"Cardio Zone","percentage":"25%"},{"name":"Free Weight Zone","percentage":"29%"},{"name":"Functional Training Zone","percentage":"10%"},{"name":"Courtyard","percentage":"16%"},{"name":"Advanced Circuit Zone","percentage":"38%"},{"name":"Novice Circuit Zone","percentage":"15%"},{"name":"Pardee Gym","percentage":"2%"},{"name":"*Collins Court","percentage":"33%"}]