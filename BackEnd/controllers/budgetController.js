import budgetModal from "../models/budgetModal.js";


// Create a new budget category
export const createCategory = async (req, res,next) => {
  try {
    const category = new budgetModal({
      name: req.body.name,
      eventId: req.body.eventId
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error)
  }
};

// Get all categories for an event
export const getCategories = async (req, res,next) => {
  try {
    const categories = await budgetModal.find({ eventId: req.params.eventId });
    res.status(200).json(categories);
  } catch (error) {
   next(error)
  }
};

export const getACategory = async (req, res, next) => {
  try {
    const category = await budgetModal.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};


export const updateCategory= async (req, res, next) => {
  try {
    const category = await budgetModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export const deleteCategory=async (req, res, next) => {
  try {
    await budgetModal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
}