Env = {
    test:{
        BasicSet:{
            url: "https://api.unibee.top"
        },
        headerSet: {
            'Authorization': '',
            'Content-Type': 'application/json'
        }
    }
}

exports.get = function () {
    return Env["test"];
}
