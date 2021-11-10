Egg API, Es un proyecto de prueba.

Es necesario bajar el proyecto y hacer un **`npm install`** para instalar todos los paquetes de node_modules

Despues de hacer **`npm install`** sera necesario agregar un archivo **.env** en la raiz del proyecto.

 - En la raiz del proyecto veras un archivo **.env.dev** el cual contiene las variables de entorno que se necesitan.
 
![enter image description here](https://firebasestorage.googleapis.com/v0/b/ontazapp.appspot.com/o/variables.JPG?alt=media&token=29e1e00e-d97b-483b-9c08-addf53f6ebc5)

Las únicas variable requerida es la de **MONGO_CNN** y **SECRETORPRIVATEKEY** para que el proyecto pueda funcionar bien, en caso de no querer crear o usar una conexión de mongodb dejo un sitio de pruebas en donde es un cliente con react.js.
Para correr el proyecto puedes usar `node/dist/app.js`  o en caso de tener nodemon instalado `nodemon dist/app` y en caos de querer detectar algún cambio realizado deberás usar `tsc --watch` para que typescript detecte los cambios y lo compile en dist.

Url del sitio: https://egg-app.netlify.app/