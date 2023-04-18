# GeoGenius

GeoGenius is a quiz website inspired by [higher-lower](http://www.higherlowergame.com/). The project is configured to use Firebase for user auth, and you can deploy the express API as a cloud function to Firebase [API](https://github.com/davidculemann/GeoGenius-BE).

## Installation

1. Clone the repository:

```
git clone git@github.com:davidculemann/GeoGenius-FE.git
```

2. Install the dependencies using Yarn:

```
cd GeoGenius-FE
yarn
```

## Usage

1. Start the development server:

```
yarn dev
```

2. Open your web browser and navigate to `http://localhost:3000`.

## Deployment

To deploy the application, you need to set up a Firebase project and configure it for hosting. Once you have done that, you can use the following commands to deploy the application:

1. Build the production version of the application:

```
yarn deploy
```

## Credits

Country data from [World Bank](https://data.worldbank.org/).

Country SVGs from [mapsicon](https://github.com/djaiss/mapsicon/tree/master/).

GeoGenius was created by [David Culemann](https://github.com/davidculemann).
