const mongoose = require("mongoose");
const Product = require("./models/product");
const Thread = require("./models/thread")

function seedDB() {
    // remove products
    Product.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("removed products")
        }
    })
    // add products
    seedData.forEach(function (seed) {
        Product.create(seed, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("added product");
            }
        })
    })
    threadData.forEach(function (thread) {
        Thread.create(thread, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("added thread")
            }
        })
    })
}



const seedData =
    [
        {
            title: "Rode racefiets",
            category: "Fietsen",
            price: 299,
            minprice: 200,
            municipality: "Groningen",
            body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
            images: [
                "auto1.jpg", "auto2.jpg", "auto3.jpg", "auto4.jpg"
            ],
            location: {
                coordinates: [53.218734715241844, 6.567541658878327]
            },
            threads: ["5de641b83e284d31f8e016fb"],
            bids: [
                { "_id": "5de770dd72b7d42bbc15d30e", "amount": 250, "createdAt": "2019-12-04T08:39:57.155Z", "author": { "username": "Mathijs" } },
                { "_id": "5de7710672b7d42bbc15d311", "amount": 260, "createdAt": "2019-12-04T08:40:38.500Z", "author": { "username": "Kees" } },
                { "_id": "5de7711272b7d42bbc15d312", "amount": 280, "createdAt": "2019-12-04T08:40:50.334Z", "author": { "username": "Mathijs" } }
            ],
            author: {
                _id: "5de61e8e4fd6ae1c5c7d918e",
                username: "Robert"
            },

        },
        {
            title: "Blauwe racefiets",
            category: "Fietsen",
            price: 299,
            minprice: 200,
            municipality: "Groningen",
            body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
            images: [
                "auto1.jpg", "auto2.jpg", "auto3.jpg", "auto4.jpg"
            ],
            location: {
                coordinates: [53.218734715241844, 6.567541658878327]
            },
            threads: [],
            bids: [
                { "_id": "5de65246a476e9185c286167", "amount": 200, "createdAt": "2019-12-03T12:17:10.743Z", "author": { "username": "Mathijs" } },
                { "_id": "5de65255a476e9185c286169", "amount": 210, "createdAt": "2019-12-03T12:17:25.566Z", "author": { "username": "Robert" } },
                { "_id": "5de6526aa476e9185c28616a", "amount": 220, "createdAt": "2019-12-03T12:17:46.274Z", "author": { "username": "Mathijs" } }
            ],
            author: {
                _id: "5de639363211ea2948bc05a7",
                username: "Piet"
            }
        },
        {
            title: "Gele racefiets",
            category: "Fietsen",
            price: 299,
            minprice: 200,
            municipality: "Groningen",
            body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
            images: [
                "auto1.jpg", "auto2.jpg", "auto3.jpg", "auto4.jpg"
            ],
            location: {
                coordinates: [53.218734715241844, 6.567541658878327]
            },
            threads: [],
            bids: [],
            author: {
                _id: "5de61e8e4fd6ae1c5c7d918e",
                username: "Robert"
            },

        },
        {
            title: "Banaan",
            category: "Fruit",
            price: 299,
            minprice: 200,
            municipality: "Groningen",
            body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
            images: [
                "auto1.jpg", "auto2.jpg", "auto3.jpg", "auto4.jpg"
            ],
            location: {
                coordinates: [53.218734715241844, 6.567541658878327]
            },
            threads: [],
            bids: [],
            author: {
                _id: "5de639363211ea2948bc05a7",
                username: "Piet"
            }
        },
        {
            title: "Aardbei",
            category: "Fruit",
            price: 299,
            minprice: 200,
            municipality: "Groningen",
            body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
            images: [
                "auto1.jpg", "auto2.jpg", "auto3.jpg", "auto4.jpg"
            ],
            location: {
                coordinates: [53.218734715241844, 6.567541658878327]
            },
            threads: [],
            bids: [],
            author: {
                _id: "5de61e8e4fd6ae1c5c7d918e",
                username: "Robert"
            },

        },
        {
            title: "Bosbes",
            category: "Fruit",
            price: 299,
            minprice: 200,
            municipality: "Groningen",
            body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
            images: [
                "auto1.jpg", "auto2.jpg", "auto3.jpg", "auto4.jpg"
            ],
            location: {
                coordinates: [53.218734715241844, 6.567541658878327]
            },
            threads: [],
            bids: [],
            author: {
                _id: "5de639363211ea2948bc05a7",
                username: "Piet"
            }
        }
    ];

const threadData = [
    {
        "_id": "5de641b83e284d31f8e016fb",
        "users": [
            { "_id": "5de61ea14fd6ae1c5c7d918f", "username": "Mathijs" },
            { "_id": "5de61e8e4fd6ae1c5c7d918e", "username": "Robert" }
        ],
        "messages": [
            {
                "_id": "5de641b83e284d31f8e016fc",
                "content": "        Beste Mathijs,\r\n  \r\nIk heb een vraag over 'Product Mathijs 1'\r\n  \r\n  hoi mathijs\r\n  \r\nMet vriendelijke groet,\r\n  \r\nRobert\r\n  ",
                "createdAt": "2019-12-03T11:06:32.875Z"
            },
            {
                "_id": "5de641e73e284d31f8e016fd",
                "content": "        Beste Mathijs,\r\n  \r\nIk heb een vraag over 'Product Mathijs 1'\r\n  \r\n  nog een keer hoi mathijs\r\n  \r\nMet vriendelijke groet,\r\n  \r\nRobert\r\n  ",
                "createdAt": "2019-12-03T11:07:19.887Z"
            },
            {
                "_id": "5de642327d53ed376c3450a5",
                "content": "        Beste Mathijs,\r\n  \r\nIk heb een vraag over 'Product Mathijs 1'\r\n  \r\n  bericht 3\r\n  \r\nMet vriendelijke groet,\r\n  \r\nRobert\r\n  ",
                "createdAt": "2019-12-03T11:08:34.088Z"
            }], "__v": 3,
        "product": { "_id": "5de61eb74fd6ae1c5c7d9190" }
    }
]

module.exports = seedDB