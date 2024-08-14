const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});

const paymentController = {
  createPreference: async (req, res) => {
    try {
      const items = req.body.items;

      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ error: "No se han proporcionado artículos para el carrito" });
      }

      const preference = new Preference(client);
      const result = await preference.create({
        body: {
          items: items.map((item) => ({
            title: item.title,
            unit_price: item.unit_price,
            quantity: item.quantity,
          })),
          back_urls: {
            success:
              "https://bigwave-front-ecommerce.vercel.app/order-completed",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
          },
          auto_return: "approved",
        },
      });

      res.json({ id: result.id });
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      res.status(500).json({ error: "Error al crear la preferencia" });
    }
  },
};

module.exports = paymentController;
