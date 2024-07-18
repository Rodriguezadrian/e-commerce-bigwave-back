const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const fs = require("fs");

const supabaseUrl = "https://wztvrfnbajbjaglagabq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dHZyZm5iYWpiamFnbGFnYWJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDE4MzI3OCwiZXhwIjoyMDM1NzU5Mjc4fQ.IBTY2Gknlc0rwuR5TJA1kb1KshvHcqyJWXsyP7bWqKU";
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFile = async (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing the files" });
    }
   
    const file = files.image;
    const filePath = file.filepath;

    const fileName = file.originalFilename;

    try {
      const buffer = fs.readFileSync(filePath);

      const { data, error } = await supabase.storage
        .from("images")
        .upload(`/Products/${fileName}`, buffer, {
          cacheControl: "3600",
          upsert: false,
          //   duplex: "half",
        });

      if (error) {
        throw error;
      }

      req.uploadedFile = data; // Guardar los datos de la imagen subida en req para usarlos en el controlador

      next(); // Pasar al siguiente middleware/controlador
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = uploadFile;
