# OrVisual Client

The application is a client for **OrVisual** service. This client provides information page and
order form.

## Order creation

Order creation provided by `Order` component, which available on `/order` mapping. User can fill
all Order's attributes and upload additional pictures for order.

## Administration view

An administrator can view all orders and set _order's states_: `new`, `in progress`, `closed` or
`completed`. Administration view available on mapping `/adm`.

## Deploying

The application might deployed as static content, just need to build project from sources:

`$: npm i && npm run-script build`

> NOTE: For OrVisual Client can work, OrVisual API root must mapped on `/api`.

**OrVisual Client** can be deployed from docker image. Image
[asirosh/orvisual-client](https://hub.docker.com/r/asirosh/orvisual-client/) from Docker Hub may be
used.

`$: docker pull asirosh/orvisual-client`

`$: docker run -e SERVICE_URL=http://orvisual-api:8080 --network my-net asirosh/orvisual-client`

`SERVICE_URL` is a URL of OrVisual API service, service and client must be in same
[Docker network](https://docs.docker.com/v17.09/engine/userguide/networking/).
