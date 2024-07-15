const { Model, DataTypes } = require("sequelize");
const slugify = require("slugify");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        stock: {
          type: DataTypes.INTEGER,
        },
        slug: {
          type: DataTypes.STRING,
          //   allowNull: false,
          //   defaultValue: "",
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "Product",
        hooks: {
          beforeBulkCreate: (products) => {
            for (const product of products) {
              console.log(product.name);
              if (product.name) {
                product.slug = slugify(product.name, {
                  lower: true,
                  strict: true,
                });
              }
            }
          },
          beforeCreate: (product) => {
            if (product.name) {
              product.slug = slugify(product.name, {
                lower: true,
                strict: true,
              });
            }
          },
          beforeUpdate: (product) => {
            if (product.changed("name")) {
              product.slug = slugify(product.name, {
                lower: true,
                strict: true,
              });
            }
          },
        },
      }
    );
    return Product;
  }
}

module.exports = Product;
