# greg-agent 🌱
Exposes a read-only JSON API which lists basic information about the plants you've registered in the [Greg](https://greg.app) app, including:

- Plant Nickname
- Plant Species
- Plant Health (boolean value)
- Thumbnail and Public Sharing URLs

I made this app for fun and to learn more about Express and Docker - I have no connection to the team behind the Greg app, apart from being an app user myself!

## Authentication
To use this app, you'll need your *bearer token* from the Greg app. This can be extracted using packet sniffing software, which can read HTTPS requests from your phone and thus extract the bearer token from the request header. I used [Charles](https://www.charlesproxy.com). Using this app means your bearer token remains private, yet basic information about your plants is available on the web via a JSON API!

> **Important**  
> Accessing internal APIs may represent a violation of the ToS for the service you're using. I spoke to the team at Greg who encouraged me to use their internal APIs for this project. Please make your own informed decisions when using this code, and reach out to the Greg team directly before deploying this server.

## Configuration

This app is configured using environment variables. The following options are supported:

| Key              | Mandatory? | Comments                                 |
|------------------|------------|------------------------------------------|
| SVR_GREG_TOKEN   | Yes        | A valid bearer token for the Greg API    |
| SVR_PORT         | No         | By default, server will listen on `3000` |
| SVR_REFRESH_INT  | No         | Cache refresh interval. The default is set to 1800 seconds (30 mins) |

