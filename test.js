const lib = require('./dist/Db');

async function run() {
    try {
        await lib.connectDb();

        await lib.updateHighScores({
            player: 'myh@live.com',
            score: 63
        });
        //await lib.getAllRecords();
    } catch (error) {
        console.error(error);
    }

    console.log('Finish!');
    process.exit(0);
}

run();
