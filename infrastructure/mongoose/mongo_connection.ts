import mongoose from "mongoose";

const UserDB = process.env.DB_USERNAME;
const PasswordDB = process.env.DB_PASSWORD;
const NameDB = process.env.DB_NAME
const HostDb = process.env.DB_HOST

export function startMongo() {
    //@ts-ignore
    mongoose.connect(HostDb, {
        user: UserDB,
        pass: PasswordDB,
        dbName: NameDB,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

