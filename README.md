# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Localization

You need to add text of labels in locales files to use it in pages or components

Files with locales has .json format and have tags with translation of text divided by pages and name of labels
```
{
  "reg": {
      "reg":"Sign up",
      "firstName": "First Name",
  }
   "auth":{
      "auth":"Login",
      "login":"Login",
   }
}
```
---
To use locales files
import i18next and add hook
```React
import '../i18n';
const {t} = useTranslation();
```
---
To save in label text from localisation file use func ```t(str:string)```
```React
const loginLabel = t('auth.login');
```
---
To use props with locales labels use:
```
const requiredLoginLabel = t('str:string', { prop: string });
```
In locale file it looks like:
```
"label": "label with {{prop}}",
```
---
There is ```i18n.ts``` file to configure i18next
```
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import BackEnd from 'i18next-http-backend'

i18n
  .use(BackEnd)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { // for symbols
      escapeValue: false, 
    },
  });

export default i18n;
```
