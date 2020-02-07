import axios from 'axios';
import {
    UI_LOADING,
    UI_FAILED,
    CREATE_GAME,
    GET_GAME,
    UPDATE_GAME,
    GET_CARD,
    NEW_ROUND,
    ADD_VIDEO,
} from './types';

// const base_url = "http://192.168.1.130:8080/api/";
const base_url = "https://sonofpitch.uptoworld.com/api/";

function uiLoading() {
    return {
        type: UI_LOADING
    };
}

function uiFailed(err) {
    return {
        type: UI_FAILED,
        err
    };
}

function createGame(players, time) {
    return dispatch => {
        axios.post(`${base_url}games/`, {
            players,
            time
        }).then(res => {
            dispatch(createGameSuccess(res.data));
        }).catch(err => {
            console.log(err);
            dispatch(uiFailed(err));
        });
    }
}

function createGameSuccess(response) {
    return {
        type: CREATE_GAME,
        payload: response
    };
}

function getGame(id) {
    return dispatch => {
        axios.get(`${base_url}games/${id}`).then(res => {
            dispatch(getGameSuccess(res.data));
        }).catch(err => {
            console.log(err);
            dispatch(uiFailed(err));
        });
    }
}

function getGameSuccess(response) {
    return {
        type: GET_GAME,
        payload: response
    };
}

function updateGame(game) {
    return dispatch => {
        axios.put(`${base_url}games/${game._id}`, game).then(res => {
            dispatch(updateGameSuccess(res.data));
        }).catch(err => {
            console.log(err);
            dispatch(uiFailed(err));
        });
    }
}

function updateGameSuccess(response) {
    return {
        type: UPDATE_GAME,
        payload: response
    };
}

function getCard() {
    return dispatch => {
        axios.get(`${base_url}type`).then(res => {
            dispatch(getCardSuccess(res.data.message));
        }).catch(err => {
            console.log(err);
            dispatch(uiFailed(err));
        });
    }
}

function getCardSuccess(response) {
    return {
        type: GET_CARD,
        payload: response
    };
}

function addVideo(videos) {
    return {
        type: ADD_VIDEO,
        payload: videos
    };
}

function newRound() {
    return {
        type: NEW_ROUND
    };
}

const actionCreators = {
    uiLoading,
    createGame,
    updateGame,
    getCard,
    newRound,
    addVideo,
    getGame
};

export { actionCreators };
