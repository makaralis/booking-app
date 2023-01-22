import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();

        res.status(200).json(savedHotel);
    }
    catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json(updatedHotel);
    }
    catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedHotel);
    }
    catch (err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const foundHotel = await Hotel.findById(req.params.id);

        res.status(200).json(foundHotel);
    }
    catch (err) {
        next(err);
    } 
}

export const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();

        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
}


export const getCountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');

    try {
        const hotels = {};

        for (const city of cities) {
            const count = await Hotel.countDocuments({ city: city });

            hotels[city] = count;
        }

        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
}


export const getCountByType = async (req, res, next) => {
    const types = req.query.types.split(',');

    try {
        const hotels = await Promise.all(types.map((type) => Hotel.countDocuments({ type: type })));

        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
}