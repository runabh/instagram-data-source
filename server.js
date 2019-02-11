const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
app.use(cors());
app.use(express.json());


// MongoClient.connect('mongodb://localhost:27017/instagramDB', (err, client) => {
// if(err){
//     return console.log('Unable to connect to DB');
// }
// console.log('Connected to DB');
// const db = client.db('instagramDB');

// db.collection('feed').find().toArray().then((docs) => {
//     const feed = JSON.stringify(docs, undefined, 2);
// }, (err) => {
//     console.log('Unable to fetch documents', err);
// });

// db.collection('users').find().toArray().then((docs) => {
//     const users = JSON.stringify(docs, undefined, 2);
// }, (err) => {
//     console.log('Unable to fetch documents', err);
// });

// client.close();
// });

// const users = [
//     {userId: 'runabh', userName: 'Arunabh Das', userDesc: 'Some Random Bio', userDPUrl: 'https://via.placeholder.com/600/92c952'},
//     {userId: 'runabh1', userName: 'Arunabh Das1', userDesc: 'Some Random Bio', userDPUrl: 'https://via.placeholder.com/600/92c952'},
//     {userId: 'runabh2', userName: 'Arunabh Das2', userDesc: 'Some Random Bio', userDPUrl: 'https://via.placeholder.com/600/92c952'},
//     {userId: 'runabh3', userName: 'Arunabh Das3', userDesc: 'Some Random Bio', userDPUrl: 'https://via.placeholder.com/600/92c952'},
//     {userId: 'runabh4', userName: 'Arunabh Das4', userDesc: 'Some Random Bio', userDPUrl: 'https://via.placeholder.com/600/92c952'}
// ];
// const feed = [
//     {id: 1, userId: 'runabh', userDPUrl: 'https://via.placeholder.com/600/92c952', 
//     title:'accusamus beatae ad facilis cum similique qui sunt', 
//     url:'https://via.placeholder.com/600/92c952', likes:10, liked: 0, 
//     comments: [
//         {userId: 'runabh', comment: 'Some Random Comment'},
//         {userId: 'runabh1', comment: 'Some Random Comment'},
//         {userId: 'runabh2', comment: 'Some Random Comment'},
// ]
// },
//     {id: 2, userId: 'runabh1', userDPUrl: 'https://via.placeholder.com/600/92c952', 
//     title:'reprehenderit est deserunt velit ipsam', 
//     url:'https://via.placeholder.com/600/771796', likes:10, liked: 1,
//     comments: [
//         {userId: 'runabh', comment: 'Some Random Comment'},
//         {userId: 'runabh1', comment: 'Some Random Comment'},
//         {userId: 'runabh2', comment: 'Some Random Comment'},
// ]},
//     {id: 3, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'officia porro iure quia iusto qui ipsa ut modi', url:'https://via.placeholder.com/600/24f355', likes:10, liked: 1, comments: []},
//     {id: 4, userId: 'runabh1', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'"culpa odio esse rerum omnis laboriosam voluptate repudiandae', url:'https://via.placeholder.com/600/d32776', likes:0, liked: 0, comments: []},
//     {id: 5, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'natus nisi omnis corporis facere molestiae rerum in', url:'https://via.placeholder.com/600/f66b97', likes:9, liked: 1, comments: []},
//     {id: 6, userId: 'runabh1', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'accusamus ea aliquid et amet sequi nemo', url:'https://via.placeholder.com/600/56a8c2', likes:10, liked: 1, comments: []},
//     {id: 7, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'officia delectus consequatur vero aut veniam explicabo molestias', url:'https://via.placeholder.com/600/b0f7cc', likes:100, liked: 1, comments: []},
//     {id: 8, userId: 'runabh1', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'aut porro officiis laborum odit ea laudantium corporis', url:'https://via.placeholder.com/600/54176f', likes:10, liked: 1, comments: []},
//     {id: 9, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'qui eius qui autem sed', url:'https://via.placeholder.com/600/51aa97', likes:10, liked: 1, comments: []},
//     {id: 10, userId: 'runabh3', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'beatae et provident et ut vel', url:'https://via.placeholder.com/600/810b14', likes:10, liked: 1, comments: []},
//     {id: 11, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'nihil at amet non hic quia qui', url:'https://via.placeholder.com/600/1ee8a4', likes:10, liked: 1, comments: []},
//     {id: 12, userId: 'runabh1', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores1', url:'https://via.placeholder.com/600/66b7d2', likes:1000, liked: 1, comments: []},
//     {id: 13, userId: 'runabh3', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'repudiandae iusto deleniti rerum', url:'https://via.placeholder.com/600/197d29', likes:10, liked: 1, comments: []},
//     {id: 14, userId: 'runabh4', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'est necessitatibus architecto ut laborum1', url:'https://via.placeholder.com/600/61a65', likes:10, liked: 1, comments: []},
//     {id: 15, userId: 'runabh3', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'harum dicta similique quis dolore earum ex qui', url:'https://via.placeholder.com/600/f9cee5', likes:10, liked: 1, comments: []},
//     {id: 16, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'iusto sunt nobis quasi veritatis quas expedita voluptatum deserunt', url:'https://via.placeholder.com/600/fdf73e', likes:10, liked: 0, comments: []},
//     {id: 17, userId: 'runabh1', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'natus doloribus necessitatibus ipsa', url:'https://via.placeholder.com/600/9c184f', likes:10, liked: 1, comments: []},
//     {id: 18, userId: 'runabh2', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'laboriosam odit nam necessitatibus et illum dolores reiciendis', url:'https://via.placeholder.com/600/1fe46f', likes:10, liked: 1, comments: []},
//     {id: 19, userId: 'runabh4', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'perferendis nesciunt eveniet et optio a', url:'https://via.placeholder.com/600/56acb2', likes:10, liked: 1, comments: []},
//     {id: 20, userId: 'runabh3', userDPUrl: 'https://via.placeholder.com/600/92c952', title:'assumenda voluptatem laboriosam enim consequatur veniam placeat reiciendis error1', url:'https://via.placeholder.com/600/8985dc', likes:10, liked: 0, comments: []}
// ];

app.get('/api/feed', (req, res) => {
    let feed = [];
    MongoClient.connect('mongodb+srv://arunabh:arunabh123@cluster0-yzbcz.mongodb.net/admin', (err, client) => {
        if(err){
            return console.log('Unable to connect to DB');
        }
        console.log('Connected to DB');
        const db = client.db('instagramDB');

        db.collection('feed').find().toArray().then((docs) => {
            feed = JSON.stringify(docs, undefined, 2);
            
        }, (err) => {
            console.log('Unable to fetch documents', err);
            }).then(() => {
                res.send(feed);
            });
        client.close();
    });
});

app.get('/api/feed/:id', (req, res) => {
    let user = [], pics = [];
    MongoClient.connect('mongodb+srv://arunabh:arunabh123@cluster0-yzbcz.mongodb.net/admin', (err, client) => {
        if(err){
            return console.log('Unable to connect to DB');
        }
        console.log('Connected to DB');
        const db = client.db('instagramDB');

        db.collection('users').find({'userId': req.params.id}).toArray().then((docs) => {
            user = docs;
        }, (err) => {
            console.log('Unable to fetch documents', err);
        }).then(() => {
            db.collection('feed').find({'userId': req.params.id}).toArray().then((docs) => {
                pics = docs;
            }, (err) => {
                console.log('Unable to fetch documents', err);
            }).then(() => {
            res.send(JSON.stringify({user, pics}));
        });
        client.close();
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));