import Reminder from "../models/Reminder";

export const createReminder = async (req, res) => {
    try {
        const { jobId, userId, reminderDate, notes } = req.body;
        const reminder = await Reminder.create({ jobId, userId, reminderDate, notes });
        res.status(201).json(reminder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reminder' });
    }
};

export const getReminders = async (req, res) => {
    try {
        const { userId } = req.params;
        const reminders = await Reminder.findAll({ where: { userId } });
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reminders' });
    }
};

export const updateReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const { reminderDate, notes } = req.body;
        const reminder = await Reminder.update({ reminderDate, notes }, { where: { id } });
        res.status(200).json({ message: 'Reminder updated', reminder });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reminder' });
    }
};

export const deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;
        await Reminder.destroy({ where: { id } });
        res.status(200).json({ message: 'Reminder deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
};
