This repo is a boilerplate for React-Redux-Thunk project.First version based on https://github.com/ruanyf/react-babel-webpack-boilerplate.
Add a lot of feature.

## Features

- Equip with React 0.15, ES6 & Babel 6
- Support i18next and multi version browser
- Thunk action boilerplate
- Support javascript file hash suffix
- Build with Webpack
- Support [hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html)
- Auto Open a new browser tab when Webpack loads, and reload the page when you modified the code
- Use [Commitizen](https://github.com/commitizen/cz-cli) to produce commit message according to [AngularJS convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
- Support git hook `pre-commit` used to lint and test your code
- Support git hook `commit-msg` used to lint your [commit message](https://github.com/kentcdodds/validate-commit-msg)
- Use [conventional-changelog](https://github.com/ajoslin/conventional-changelog) to generate `CHANGELOG.md`

## Sample
1.i18next initialize

```javascript
switchLanguage(lng) {
  const { dispatch } = this.props

  i18next
    .use(XHR)
    .init({
      "debug": false,
      "lng": lng,
      "keySeparator": false,
      "fallbackLng": "zh",
      "load": "languageOnly",
      "ns": [
        "app",
        "common",
      ],
      "backend": {
        "loadPath": "/locales/{{lng}}/{{ns}}.json"
     }
    }, (err, t) => {
      dispatch({ type: 'i18n', i18n: i18next })
    })
}
```
2.action

```javascript
import { APP } from '../constants/ActionTypes'
import { thunkAction } from '../utils/ActionHelper'

const appFlow = {
  request: () => action(APP.REQUEST),
  success: (response) => action(APP.SUCCESS, {...response}),
  failure: (error) => action(APP.FAILURE, {...error})
}

export function createApp(app) {
  return thunkAction.POST(appFlow, 'apps', {actionType: 'Create', data: app})
}

export function fetchApp(app) {
  return thunkAction.GET(appFlow, 'apps', {actionType: 'Query', data: app})
}

export function updateApp(appId,app) {
  return thunkAction.PUT(appFlow, 'apps/'+ appId, {actionType: 'Update', data: app})
}

export function delApps(id) {
  return thunkAction.DELETE(appFlow, 'apps/'+id, {actionType: 'Delete'})
}
```

3.reducer

```javascript
import { APP } from '../constants/ActionTypes'

const initialState = {
  type: 'app',
  completed: false
}

export default function app(state = initialState, action) {
  switch(action.type) {
    case APP.REQUEST:
      return Object.assign({}, state, initialState);
    case APP.SUCCESS:
      return Object.assign({}, state, { completed: true, actionType: action.actionType, maxResults:action.maxResults});
    case APP.FAILURE:
      return Object.assign({}, state, { completed: true, actionType: action.actionType, error: action.error});
    default:
      return state;
  }
}
```   
