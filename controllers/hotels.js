var fs = require('fs');
var Hotel = require('../models/hotels');

const OK = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 500;

const RECORD_NOT_FOUND_MESSAGE = 'Registro no encontrado.';
const RECORD_DELETED_MESSAGE = 'Registro eliminado.'

exports.list = (request, response, next) => {
    Hotel.find({}, 'name stars price image amenities', (error, hotels) => {
        let hotelsRecords = {};
        hotelsRecords = hotels;

        return response.status(OK).json({status: OK, data: hotelsRecords});
    }).catch(() => {
        return response.status(NOT_FOUND).json({status: NOT_FOUND, message: RECORD_NOT_FOUND_MESSAGE});
    });
}

exports.getOne = (request, response, next) => {
    Hotel.find({_id: request.params.id}, 'name stars price image amenities', (error, hotel) => {
        return response.status(OK).json({status: OK, data: hotel});
    }).catch(() => {
        return response.status(NOT_FOUND).json({status: NOT_FOUND, message: RECORD_NOT_FOUND_MESSAGE});
    });
}

exports.create = (request, response, next) => {
    uploadFile(request);

    const HOTEL = new Hotel(request.body);

    HOTEL.save((error) => {
        if (error) {
            return response.status(BAD_REQUEST).send({status: BAD_REQUEST, message: error});
        } else {
            return response.status(200).json({status: OK, data: HOTEL});
        }
    });
}

exports.find = (request, response, next) => {
    Hotel.find(defineFilters(request), 'name stars price image amenities', (error, hotels) => {
        return response.status(OK).json({status: OK, data: hotels});
    }).catch(() => {
        return response.status(NOT_FOUND).json({status: NOT_FOUND, message: RECORD_NOT_FOUND_MESSAGE});
    });
}

/**
 * Set filters to find records
 * 
 * @param {Request} request
 * @returns {Object} params 
 */
function defineFilters(request) {
    let params = {};
    var stars = [];

    params.$and = [{name : {'$regex': request.body.name}}];

    if(!!request.body[0]) {
        for(let i = 1; i <= 5; i++) {
            if(request.body[i] && request.body[i] == 'true') {
                stars.push({'stars': `${i}`});
            }
        }
    }

    if(stars.length > 0) {
        params.$and.push({$or: stars});
    }

    return params;
}

exports.update = (request, response, next) => {
    Hotel.findOne({_id: request.params.id}, (error, hotel) => {
        uploadFile(request);
        
        hotel.name = request.body.name;
        hotel.stars = request.body.stars;
        hotel.price = request.body.price;
        hotel.image = request.body.image;
        hotel.amenities = request.body.amenities;

        if (request.body.image) {
            hotel.image = request.body.image;
        }

        hotel.save(error => {
            if (error) {
                return response.status(BAD_REQUEST).json({status: BAD_REQUEST, message: error});
            } else {
                return response.status(OK).json({status: OK, data: hotel});
            }
        });
    });
}

exports.delete = (request, response, next) => {
    Hotel.find({_id: request.params.id}, 'name', (error, hotel) => {
        if (hotel.length == 1) {
            Hotel.remove({_id: request.params.id})
                .then(() => {
                    return response.status(OK).json({status: OK, data: {message: RECORD_DELETED_MESSAGE}});
                })
                .catch((error) => {
                    return response.status(BAD_REQUEST).json({STATUS: BAD_REQUEST, message: error});
                });
        } else {
            return response.status(NOT_FOUND).json({status: NOT_FOUND, message: RECORD_NOT_FOUND_MESSAGE});
        }
    });
}

/**
 * Upload photo file
 * 
 * @param {Request} request 
 */
function uploadFile(request) {
    if(request.files.length > 0) {
        fs.rename('public/uploads/' + request.files[0].filename, 'public/uploads/' + request.files[0].originalname, function(error) {
            if (error)  {
                console.log('error ' + error);
            }
        });
        
        request.body.image = request.files[0].originalname;
    }
}