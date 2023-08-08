import { createGlobalState } from 'react-hooks-global-state';

// A global state variable for holding the current user data
const {setGlobalState, useGlobalState} = createGlobalState(
        {
        username: `placeholder`,
        email: ``,
        childName: [],
        childDob: [],
        favourites: []
        }
)


  export {setGlobalState, useGlobalState};