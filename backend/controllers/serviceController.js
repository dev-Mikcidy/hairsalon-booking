import Service from "../models/Service.js";


export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching services" });
  }
};


export const createService = async (req, res) => {
  try {
    
    const name = String(req.body.name || "").trim();
    const description = String(req.body.description || "").trim();
    const price = Number(req.body.price);
    const duration = Number(req.body.duration);

  
    if (!name) return res.status(400).json({ msg: "Service name is required" });
    if (isNaN(price) || price < 1)
      return res.status(400).json({ msg: "Price must be at least 1 DKK" });
    if (isNaN(duration) || duration < 5)
      return res.status(400).json({ msg: "Duration must be at least 5 minutes" });

    const service = await Service.create({
      name,
      description,
      price,
      duration
    });

    res.json(service);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
   
    const name = String(req.body.name || "").trim();
    const description = String(req.body.description || "").trim();
    const price = Number(req.body.price);
    const duration = Number(req.body.duration);


    if (!name) return res.status(400).json({ msg: "Service name is required" });
    if (isNaN(price) || price < 1)
      return res.status(400).json({ msg: "Price must be at least 1 DKK" });
    if (isNaN(duration) || duration < 5)
      return res.status(400).json({ msg: "Duration must be at least 5 minutes" });

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, duration },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Service not found" });
    }

    res.json({ msg: "Service deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting service" });
  }
};
