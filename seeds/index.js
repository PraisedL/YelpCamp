const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60eafed602556e18101ddc80',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis enim corporis nemo iusto inventore laboriosam libero aliquam rerum suscipit ipsa magnam nihil autem, voluptates accusantium? Dolore ducimus minus facilis illum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/praised/image/upload/v1626533423/YelpCamp/vg8zjaxismhuqfs5ka0m.jpg',
                    filename: 'YelpCamp/vg8zjaxismhuqfs5ka0m'
                },
                {
                    url: 'https://res.cloudinary.com/praised/image/upload/v1626533424/YelpCamp/aszkfma4wxnrsfzn4eoj.jpg',
                    filename: 'YelpCamp/aszkfma4wxnrsfzn4eoj'
                }
            ],
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});