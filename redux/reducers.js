import {
    UI_LOADING,
    UI_FAILED,
    CREATE_GAME,
    GET_GAME,
    UPDATE_GAME,
    GET_CARD,
    NEW_ROUND,
    ADD_VIDEO
} from './types';

// initialState
const initialState = {
    isLoading: false,
    isFailed: false,
    errorMsg: null,
    game: null,
    clientIndex: -1,
    card: null,
    videos: null,
    round: 0
};

function applyUiLoading(state) {
    return {
        ...state,
        isLoading: true,
        errorMsg: null
    };
}

function applyCreateGame(state, game) {
    let clientIndex = Math.floor(Math.random() * game.players.length);
    return {
        ...state,
        isLoading: false,
        clientIndex,
        round: 0,
        game: game
    };
}

function applyGetGame(state, game) {
    return {
        ...state,
        game: game
    };
}

function applyUpdateGame(state, game) {
    return {
        ...state,
        game: game
    };
}

function applyUiFailed(state, err) {
    return {
        ...state,
        isLoading: false,
        isFailed: true,
        errorMsg: err
    };
}

function applyGetCard(state, card) {
    return {
        ...state,
        card
    }
}

function generateClientIndex(state) {
    return Math.floor(Math.random() * Math.floor(state.game.players.length));
}

function applyNewRound(state) {
    let clientIndex = generateClientIndex(state);
    
    console.log('clientIndex:', clientIndex);
    let round = state.round + 1;

    return {
        ...state,
        clientIndex,
        round,
        videos: null
    };
}

function applyUploadVideo(state, videos) {

    return {
        ...state,
        videos
    };
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case UI_LOADING:
            return applyUiLoading(state);
        case CREATE_GAME:
            return applyCreateGame(state, action.payload);
        case GET_GAME:
            return applyGetGame(state, action.payload);
        case UPDATE_GAME:
            return applyUpdateGame(state, action.payload);
        case GET_CARD:
            return applyGetCard(state, action.payload);
        case UI_FAILED:
            return applyUiFailed(state);
        case NEW_ROUND:
            return applyNewRound(state);
        case ADD_VIDEO:
            return applyUploadVideo(state, action.payload);
        default:
            return state;
    }
}

export default reducer;
