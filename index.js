const lib = require('./dist/Db');

exports.handler = async (event) => {
    await lib.connectDb();

    let response;
    try {

        if (event.body != null && event.body !== '{}') {
            const reqData = JSON.parse(event.body);
            await lib.updateHighScores(reqData);
            response = {
                statusCode: 200,
                body: JSON.stringify('Success!'),
            };
        } else {
            const resData = await lib.getAllRecords();
            response = {
                statusCode: 200,
                body: JSON.stringify(resData),
            };
        }
    } catch (err) {
        response = {
            statusCode: 400,
            body: JSON.stringify(`Error! ${err}`),
        };
    }
    return response;
};
