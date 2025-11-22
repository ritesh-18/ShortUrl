const {
    createShortLinkService,
    getAllLinksService,
    getLinkByIdService,
    deleteLinkByIdService
  } = require("../services/links.service");
  
  async function createShortLink(req, res) {
    try {
      const result = await createShortLinkService(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
  
  async function getAllLinks(req, res) {
    try {
      const result = await getAllLinksService();
      console.log("Links retrieved:", result);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
  
  async function getLinkById(req, res) {
    try {
      const result = await getLinkByIdService(req.params.code);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
  
  async function deleteLinkById(req, res) {
    try {
      const result = await deleteLinkByIdService(req.params.code);
      return res.status(200).json({ deleted: true, link: result });
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
  
  module.exports = {
    createShortLink,
    getAllLinks,
    getLinkById,
    deleteLinkById
  };
  