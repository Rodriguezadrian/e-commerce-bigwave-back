const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const fs = require("fs");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

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
          contentType: file.mimetype,
        });
      if (error) {
        throw error;
      }

      req.uploadedFile = data;
      req.fields = fields;
      next();
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = uploadFile;
