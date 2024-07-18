import Restaurant from '../Database/schema.js';
const GetByID = async (req, res) => {
    const id  = req.params.id;
    try {
        const oneRestaurants = await Restaurant.findOne({id:id});
        res.status(200).json(oneRestaurants);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default GetByID;