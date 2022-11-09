# Weather App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API
https://openweathermap.org/api

- Click the sign up button to get the API key.
- After you become a member, click on the confirmation button sent to your e-mail address.
- Then go to https://home.openweathermap.org/api_keys and copy your API Key and save it somewhere you will remember. With this Key, you will be able to pull weather data through this free API.
- Create a folder for your project and create your React project in that folder.
- Create a folder for your project and create your React project in that folder.
```
npx create-react-app .
```
The trailing dot is required to set up your project in the folder you are in. The folder where you use this command must be empty.
- Create a file named ``` .env ``` in the main directory of your project and save your Key as ``` REACT_APP_WEATHER_API_KEY ``` in this file.
``` 
REACT_APP_WEATHER_API_KEY=api_key_here 
```
- When you use the environment variable in React projects created with ```Create-React-App```, you must initialize it with the ``` REACT_APP_ ``` prefix.
- Don't forget to add the ```.env``` file you created to your ```.gitignore``` file.


