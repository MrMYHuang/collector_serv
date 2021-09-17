import { MongoClient, Db } from 'mongodb';

const uri = "mongodb+srv://Account:Password@Abc.mongodb.net/DbName?&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db: Db;
const dbName = "gameCollector";
const tableName = 'highScores';
const maxHighScoreCount = 10;

export async function connectDb(name: string) {
    return new Promise<void>((ok, err) => {
        client.connect(error => {
            if (error) {
                err("MongoDB failed: " + error);
                return;
            }

            db = client.db(dbName);
            ok();
        });
    });
}

export async function getAllRecords() {
    try {
        const data = (await db.collection(tableName).find({}).sort('score', -1).toArray()) as GameRecord[];
        return data;
    } catch (error) {
        throw (error);
    }
}

export async function updateHighScores(newGameRecord: GameRecord) {
    try {
        let data = await getAllRecords();
        if (data.length < maxHighScoreCount || data.some((gr) => newGameRecord.score > gr.score )) {
            data.push(newGameRecord);
            data.sort((gr0, gr1) => gr1.score - gr0.score);
            if (data.length > maxHighScoreCount) {
                data.splice(maxHighScoreCount);
            }
            await db.collection(tableName).deleteMany({});
            await db.collection(tableName).insertMany(data);
        }
        return data;
    } catch (error) {
        throw (error);
    }
}
