// project imports
import config from '../../config';

// action - state management
import * as actionTypes from '../action/index';

export const initialState = {
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
};

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer;
