# greg-connector
Exposes a read-only API which shares basic information (name, species, and health) about the plants you've registered in the [Greg](https://greg.app) app.

To use this app, you'll need your *bearer token* from the Greg app. This can be extracted using packet sniffing software, which can read HTTPS requests from your phone and thus extract the bearer token from the request header.

Using this app means your bearer token remains private, yet basic information about your plants is available on the web via a JSON API for all to see!

## Features
The following features are currently supported:

- [x] Exposes a JSON API whilst keeping the bearer token private.
- [x] Provides a boolean value to represent the general health of each plant ('*does it need watering?*').
- [x] Caches the API response for 30 mins in order to reduce the the number of calls made to the Greg Internal API and improve general performance.

The following features are in the works:

- [ ] A SVG 'card' visual, for displaying plant stats on your GitHub profile.
- [ ] The potential to secure the API endpoint using a predefined API key.

## Configuration
This app is configured using environment variables. The following are supported:

| Key              | Mandatory? | Comments                                |
|------------------|------------|-----------------------------------------|
| SERVER_PORT      | No         | By default, server will listen on :3000 |
| SERVER_AUTH_GREG | Yes        | A valid bearer token for the Greg app * |

## An Important Health Warning
Accessing internal APIs may represent a violation of the ToS for the application or service you're using. To make this app, I spoke to the lovely team at Greg who advised and encouraged me to use their internal APIs. I'd encourage you to make your own informed decisions when using this code, and reach out to the team directly for advice!

## Authors

- [@abiddiscombe](https://github.com/abiddiscombe)
