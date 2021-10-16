import * as ActionType  from "./../constant/ActionType"


export const actDelete = user => {
    return {
      type: ActionType.DELETE,
      user
    };
  };
export const actSubmit = user => {
    return{
        type: ActionType.SUBMIT,
        user
    }
}
export const actEdit =user=> {
    return {
        type: ActionType.EDIT,
        user
    }
}
export const actSearch = user => {
    return{
        type: ActionType.SEARCH,
        user
    }
}