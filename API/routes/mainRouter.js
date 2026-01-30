var express = require("express");
var router = express.Router();

const {
  BASE_ROUTE,
  USERS_ROUTE,
  ID_ROUTE,
} = require("../IMPORTANTE/variablesGlobales");

const MainService = require("../services/mainService");

router.get(BASE_ROUTE, async (req, res) => {
  try {
    res.json(await MainService.get());
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get(USERS_ROUTE, async (req, res) => {
  try {
    res.json(await MainService.getUsers());
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get(ID_ROUTE, async (req, res) => {
  try {
    const result = await MainService.getId(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post(BASE_ROUTE, async (req, res) => {
  try {
    const { title, year } = req.body;
    if (!title || !year) {
      return res.status(400).json({
        error: "Campos requeridos: title y year son obligatorios",
      });
    }

    res.json(
      await MainService.post(
        req.body.title,
        req.body.year,
        req.body.genre,
        req.body.rating,
        req.body.platform,
        req.body.imageUrl,
        req.body.watched,
      ),
    );
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post(USERS_ROUTE, async (req, res) => {
  try {
    res.json(await MainService.post(req.body.nombre, req.body.password));
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.put(ID_ROUTE, async (req, res) => {
  try {
    const { title, year } = req.body;
    if (!title || !year) {
      return res.status(400).json({
        error: "Campos requeridos: title y year son obligatorios",
      });
    }

    const result = await MainService.put(
      req.params.id,
      req.body.title,
      req.body.year,
      req.body.genre,
      req.body.rating,
      req.body.platform,
      req.body.imageUrl,
      req.body.watched,
    );

    if (!result) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.delete(ID_ROUTE, async (req, res) => {
  try {
    const result = await MainService.delete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Recurso no encontrado" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;