import { createStore } from 'redux';

// Define your initial state and reducer function (changeState)
const initialState = {
  sidebarShow: true,
  theme: 'light',
  user: null,
  authenticated: true,
  isAdmin: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case 'LOGIN':
      return {
        ...state,
        user: {
          userId: rest.userId,
          email: rest.email,
          profileImage: rest.profileImage,
          role:rest.role,
          name:rest.name
        },
        authenticated: true,
        isAdmin: true,
      };
    case 'LOGOUT':
      return { ...state, user: null, authenticated: false, isAdmin: false };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(changeState);

export default store;
