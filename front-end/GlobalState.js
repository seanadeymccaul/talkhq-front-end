import { createGlobalState } from 'react-hooks-global-state';

// A global state variable for holding the fetched resources data
const {setGlobalState, useGlobalState} = createGlobalState(
        {
        type: null,
        title: "hello",
        description: null,
        content: null,
        img: null,
        tags: null,
        admin: null
        }
)

  export {setGlobalState, useGlobalState};