import Customer from "../models/Customer.js";


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error("Fetch customers error:", err);
    res.status(500).json({ msg: "Error fetching customers" });
  }
};


export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const exists = await Customer.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const customer = await Customer.create({ name, email, phone });
    res.json(customer);
  } catch (err) {
    console.error("Create customer error:", err);
    res.status(500).json({ msg: "Error creating customer" });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error("Update customer error:", err);
    res.status(500).json({ msg: "Error updating customer" });
  }
};


export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    await customer.deleteOne();

    res.json({ msg: "Customer deleted" });
  } catch (err) {
    console.error("Delete customer error:", err);
    res.status(500).json({ msg: "Error deleting customer" });
  }
};
