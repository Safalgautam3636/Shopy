import mongoose from "mongoose";


const invokeDB= (dbString:string) => {
    mongoose.connect(dbString).then(() => {
        console.log('Connected to DB...')
    }).catch((err) => {
        console.log(err)
    })
}

export default invokeDB;
