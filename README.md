# Taxis pasajero
Aplicación para pasajeros del sistema de gestión de taxis.

##instrucciones para montar ambiente de desarrollo.
1. Instalar Nodejs https://nodejs.org/en/download/
2. Instalar cordova y ionic
  ```
  $ npm install -g cordova ionic
  ```
  
3. clonar el repositorio
  ```
  $ git clone git@github.com:bic-java/taxis-pasajero.git
  ```
  
4. navegar hasta la carpeta del proyecto clonado
  ```
  $ cd taxis-pasajero
  ```
  
5. actualizar lib
  ```
  $ ionic lib update
  ```
  
6. Instalar Crosswalk
  ```
  $ ionic browser add crosswalk
  ```
  
7. Añadir los plugins faltantes
  ```
  $ ionic plugin add PLUGIN_REQUERIDO
  ```
  
  reemplazar PLUGIN_REQUERIDO en el comando anterior por cada uno de los siguientes.

  - cordova-plugin-console
  - cordova-plugin-crosswalk-webview
  - cordova-plugin-device
  - cordova-plugin-splashscreen
  - cordova-plugin-statusbar
  - cordova-plugin-whitelist
  - ionic-plugin-keyboard

8. para ejecutar la aplicacion en el navegador ejecutar
  ```
  $ ionic serve
  ```
  
9. para ejecutar en un emulador o dispositivo conectado, primero añadir la plataforma destino, por ejemplo android
  ```
  $ ionic platform add android
  $ ionic run android
  ```
  
10. Instalación de plugin google maps
  ```
  $> ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCM5GOTQ8a2Pa488mahNfzQaAFjY4YW50E" --variable API_KEY_FOR_IOS="AIzaSyBEQpvYYDpXb5f5E3Yw2w8Sq2fgeJfOXkI"
  ```
