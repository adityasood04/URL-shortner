const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 8 });

const URL = require("../models/url.model");

const generateShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ message: "Url is required" });
  }

  try {
    const shortId = randomUUID();
    await URL.create({
      shortId: shortId,
      redirectUrl: url,
      visitCounts: 0,
    });
    res.status(201).json({ id: shortId });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const redirectToUrl = async (req, res) => {
  const id = req.params.id;

  try {
    const url = await URL.findOneAndUpdate(
      { shortId: id },
      { $inc: { visitCounts: 1 } },
      { new: true }
    );
    if (!url) {
      res.status(404).json({ message: "Url not found" });
    }
    res.status(200).redirect(url.redirectUrl);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.id;
  try {
    const url = await URL.findOne({ shortId });
    if (!url) {
      res.status(404).json({ message: "Url not found" });
    }
    res.status(200).json({
      url: url.redirectUrl,
      visitCounts: url.visitCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  generateShortUrl,
  redirectToUrl,
  getAnalytics
};
