var RSK = RSK || {};


RSK.Services = RSK.Services || {};
RSK.Services.Entries = RSK.Services.Entries || {};

RSK.Services.Entries.slipsService = function ($resource) {
    return {
        getSlips: function (date) {
            return $resource('/api/slips/').query({startDate: date.toJSON().slice(0, 10)});
        },
        get: function (id) {
            return $resource('/api/slip/:id').get({id: id});
        },
        save: function (slip) {
            var s = $resource('/api/slip/:id',{id: slip.id}, {"update": {method: "PUT"}}).get();
            s.title = slip.title;
            s.$update();
        },
        delete: function (slip) {
            var s = $resource('/api/slip/:id',{id: slip.id}).get();
            s.$delete();
        },
        create: function (slip) {
            var db = $resource("/api/slip/");
            var newSlip = new db(slip);
            newSlip.$save();
        }
    }
};

/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"

// GET

//exports.posts = function (req, res) {
//    var posts = [];
//    data.posts.forEach(function (post, i) {
//        posts.push({
//            id: i,
//            title: post.title,
//            text: post.text.substr(0, 50) + '...'
//        });
//    });
//    res.json({
//        posts: posts
//    });
//};
//
//exports.post = function (req, res) {
//    var id = req.params.id;
//    if (id >= 0 && id < data.posts.length) {
//        res.json({
//            post: data.posts[id]
//        });
//    } else {
//        res.json(false);
//    }
//};
//
//// POST
//
//exports.addPost = function (req, res) {
//    data.posts.push(req.body);
//    res.json(req.body);
//};
//
//// PUT
//
//exports.editPost = function (req, res) {
//    var id = req.params.id;
//
//    if (id >= 0 && id < data.posts.length) {
//        data.posts[id] = req.body;
//        res.json(true);
//    } else {
//        res.json(false);
//    }
//};
//
//// DELETE
//
//exports.deletePost = function (req, res) {
//    var id = req.params.id;
//
//    if (id >= 0 && id < data.posts.length) {
//        data.posts.splice(id, 1);
//        res.json(true);
//    } else {
//        res.json(false);
//    }
//};
