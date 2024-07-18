import Restaurant from '../Database/schema.js';

const GetPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100; // Number of documents per page
    const searchType = req.query.type || 'name';
    const searchQuery = req.query.query || '';

    try {
        let query = {};
        if (searchQuery) {
            if (searchType === 'name') {
                query = { name: new RegExp(searchQuery, 'i') };
            } else if (searchType === 'cost') {
                query = { cost_for_two: parseInt(searchQuery) };
            } else if (searchType === 'cuisines') {
                query = { cuisines: new RegExp(searchQuery, 'i') };
            }
        }

        let items = await Restaurant.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const count = await Restaurant.countDocuments(query);
        items = JSON.parse(JSON.stringify(items));
        res.send({ items, count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default GetPage;