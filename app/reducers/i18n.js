import merge from 'lodash/merge'

export default function i18n(state = {}, action) {
	switch(action.type) {
		case 'i18n':
      return merge({}, state, action.i18n)
		default:
		  return state
	}
}