import Company from "../models/Company.js";


export const createCompany = async (req, res) => {
  try {
    const { name, contactDetails, industry, companySize, notes, userId } = req.body;
    console.log(userId)
    const company = await Company.create({ name, contactDetails, industry, companySize, notes, UserId : userId });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create company' });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const id = req.user;
    const companies = await Company.findAll({ where: { UserId:id } });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactDetails, industry, companySize, notes } = req.body;
    const company = await Company.update({ name, contactDetails, industry, companySize, notes }, { where: { id } });
    res.status(200).json({ message: 'Company updated', company });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update company' });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.destroy({ where: { id } });
    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
};
