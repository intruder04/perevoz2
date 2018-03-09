export default function (state = null, action) {
    switch (action.type) {
        case "REQ_SELECTED":
            return action.payload;
            break;
        default:
            return state;
    }
}