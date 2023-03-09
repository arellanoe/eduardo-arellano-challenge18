const {UsersModel} = require('../models');

const usersController = {
    
    createUser(req, res) {
        UsersModel.create(req.body)
        .then(dbData => res.json(dbData))
        .catch(err => res.status(400).json(err));
    },

    getAllUsers(req, res) {
        UsersModel.find({})
        .populate({path: 'thoughtsList', select: '-__v'})
        .populate({path: 'friendsList', select: '-__v'})
        .select('-__v')
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUserById(req, res) {
        UsersModel.findOne({_id: req.params.id })
        .populate({path: 'thoughtsList', select: '-__v'})
        .populate({path: 'friendsList', select: '-__v'})
        .select('-__v')
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'User not found!'});
                return; 
            }
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUser(req, res) {
        UsersModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'User not found!'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.json(err))
    },

    deleteUser(req, res) {
        UsersModel.findOneAndDelete({_id: req.params.id})
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'User not found!'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend(req, res) {
        UsersModel.findOneAndUpdate({_id: req.params.id}, {$push: { friendsList: req.params.friendId}}, {new: true})
        .populate({path: 'friendsList', select: ('-__v')})
        .select('-__v')
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'User not found!'});
                return;
            }
        res.json(dbData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend(req, res) {
        UsersModel.findOneAndUpdate({_id: req.params.id}, {$pull: { friendsList: req.params.friendId}}, {new: true})
        .populate({path: 'friendsList', select: '-__v'})
        .select('-__v')
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'User not found!'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = usersController; 
