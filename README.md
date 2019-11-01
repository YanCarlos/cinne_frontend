

## Cinne
Este repositorio contiene el frontend hecho en React para una aplicación de prueba para reserva de peliculas.

El repositorio del proyecto backend lo puede ver en [aqui](https://github.com/YanCarlos/cinne_api)

Puede ver el demo en [aqui](https://yancarlos.github.io/cinne_frontend)


**Corriendo la aplicación**
		
		
	$ yarn install
	$ yarn start

**Nota**
Actualmente tenemos esta configuracion asociada con la url del api y el api key para entorno de desarrollo

```
const API_URL = "http://localhost:3000/api/v1";
const API_KEY = "TRDFerD3SfdVJI4";
```

Si usted esta corriendo la aplicacion en otra url o con otro puerto no olvide cambiar estos datos, tambien es necesario hacerlo en caso de que haya cambiado la variable de entorno API_KEY en el `.env.development` del proyecto rails. Puede hacer este cambio en `src/services/ApiConfig.js`	
   
		
