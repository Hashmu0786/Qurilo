const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb+srv://hasmuddin97175:tO2KakfGUO8kx2cg@cluster0.roydvdk.mongodb.net/your-database-name?retryWrites=true&w=majority');
        console.log("Database is connected");
    } catch (error) {
        console.log(error);   
    }
}
