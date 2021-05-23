const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: "60a277c8b1840e4e44eb0170",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis quisquam soluta inventore dolores suscipit nam? Consectetur unde obcaecati aperiam eius culpa, magnam mollitia vero sit inventore saepe eveniet laudantium tempore?',
            price: Math.floor(Math.random() * 20) + 10,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dwqzjozxt/image/upload/v1621351023/Yelpcamp/teckgw3tcpnd2kq2iwkw.jpg",
                    filename: "Yelpcamp/teckgw3tcpnd2kq2iwkw"
                },
                {
                    url: "https://res.cloudinary.com/dwqzjozxt/image/upload/v1621351024/Yelpcamp/xhbtivfdg2nrb64qximq.jpg",
                    filename: "Yelpcamp/xhbtivfdg2nrb64qximq"
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})