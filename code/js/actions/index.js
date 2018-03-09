export const selectReq = (req) => {
    alert("Now req is " + req.desc);
    return {
        type: "REQ_SELECTED",
        payload: req
    }
} 