import cityModels from "@/models/cityModels";

exports.addCity = async (req, res) => {
  try {
    const { name, population, country, latitude, longitude } = req.body;

    if (!name || !population || !country || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingCity = await cityModels.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ error: 'City already exists' });
    }

    const newCity = new cityModels({ name, population, country, latitude, longitude });
    await newCity.save();

    res.status(201).json({ message: 'City added successfully', city: newCity });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
