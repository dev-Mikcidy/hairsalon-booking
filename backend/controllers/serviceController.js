import Service from "../models/Service.js";

// GET ALL SERVICES
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching services" });
  }
};

// CREATE SERVICE
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// UPDATE SERVICE
export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// DELETE SERVICE
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
